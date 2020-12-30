<template>
    <div v-title data-title="Lyu后台 | 文章编辑">
        <el-row :gutter="15">
            <el-form ref="formData" :model="formData" :rules="rules" size="medium" label-width="100px">
                <el-col :span="12">
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="formData.title"  placeholder="输入标题" clearable :style="{width: '100%'}"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="栏目" prop="channelId">
                        <treeselect v-model="formData.channelId" :multiple="false" :options="treeDate" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="栏目图" prop="channelImg">
                        <el-upload
                                class="avatar-uploader"
                                action="string"
                                :show-file-list="false"
                                :http-request="uploadImg"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="formData.titleImg" :src="formData.titleImg" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="摘要" prop="summary">
                        <el-input v-model="formData.summary" placeholder="输入摘要内容" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                </el-col>


                <el-col :span="8">

                    <el-col :span="8">
                        <el-form-item label="允许评论" prop="commentStatus">
                            <el-switch
                                    v-model="formData.commentStatus"
                                    active-color="#13ce66"
                                    inactive-color="#999999">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="置顶" prop="top">
                            <el-switch
                                    v-model="formData.top"
                                    active-color="#13ce66"
                                    inactive-color="#999999">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="外链" prop="url">
                        <el-input v-model="formData.url" placeholder="输入链接" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="附件" prop="attachmentList">
                        <el-upload
                                class="upload-demo"
                                action="string"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="3"
                                :http-request="uploadImg2"
                                :on-exceed="handleExceed"
                                :file-list="formData.articleAttachments">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>

                </el-col>

                <el-col :span="24">
                    <el-form-item label="正文" prop="content">
                        <v-md-editor v-model="formData.content" height="400px"></v-md-editor>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="标签" prop="tagList">
                        <el-checkbox-group v-model="formData.selectTagList">
                            <el-checkbox  v-for="(item,index) in tagList" :key="index" :label="item.id">{{item.tagName}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>


                <el-col :span="20">
                    <el-form-item>
                        <el-button @click="$router.back()">取消</el-button>
                        <el-button type="primary" :loading="loading" @click="submitForm">保存</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </div>
</template>

<script>
    import {update,upload,detail} from "@/api/article";
    import {tree} from "@/api/channel";
    import {all} from "@/api/tag";
    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    import token from '@/store/token'
    export default {
        name: "Add",
        components: { Treeselect },
        data(){
            return{
                formData: {
                    id: '',
                    channelId: null,
                    title: null,
                    titleImg: '',
                    summary: '',
                    url: '',
                    content: '',
                    commentStatus: true,
                    rotation: false,
                    top:false,
                    articleAttachments:[],
                    selectTagList: [],
                    createUser: token.getUser().id
                },
                tagList:[],
                treeDate:[],
                loading: false,
                rules: {
                    title: [{required: true, message: '请输入标题', trigger: 'blur'}],
                    channelId: [{required: true, message: '请输入栏目', trigger: 'blur'}],
                    content: [{required: true, message: '请输入内容', trigger: 'blur'}],
                }
            }
        },
        created(){

            let  id=this.$route.query.id
            detail(id).then(data=>{
                this.formData=data.data

                console.log(data.data)
                if (!this.formData.articleAttachments) {
                    this.formData.articleAttachments=[]
                }
                if (!this.formData.selectTagList) {
                    this.formData.selectTagList=[]
                }
                if (!data.data.content){
                    this.formData.content=''
                }

                if(this.formData.commentStatus != 1){
                    this.formData.commentStatus= true
                }
                if(this.formData.rotation == 1){
                    this.formData.rotation= true
                }
                if(this.formData.top == 1){
                    this.formData.top= true
                }
            }).catch(error=>{
                this.$message.error(error)
            })

            tree().then(data=>{
                this.treeDate=data.data
            }).catch(error=>{
                this.$message.error(error)
            })

            all().then(data=>{
                this.tagList=data.data

            }).catch(error=>{
                this.$message.error(error)
            })

        },
        methods:{
            submitForm(form){
                this.$refs['formData'].validate(valid=>{
                    if (valid) {
                        this.loading=true
                        console.log(this.formData)
                        if (this.formData.commentStatus){
                            this.formData.commentStatus =0
                        }else {
                            this.formData.commentStatus= 1
                        }

                        if (this.formData.rotation) {
                            this.formData.rotation=1
                        }else {
                            this.formData.rotation=0
                        }

                        if (this.formData.top){
                            this.formData.top=1
                        } else {
                            this.formData.top=0
                        }
                        update(this.formData).then(data=>{
                            this.loading=false
                            this.$message.success(data.message)
                            this.$refs['formData'].resetFields()
                            this.$router.push('/article')
                        }).catch(error=>{
                            this.loading=true
                            this.$message.error('操作失败')
                        })
                    }
                })
            },
            close(){
                this.$emit("hideDialog")
            },
            uploadImg(param){
                const  formData = new FormData();
                formData.append("file",param.file)
                upload(formData).then(data=>{
                    this.formData.titleImg = data.data
                }).catch(error=>{
                    this.$message.error(error)
                })
            },
            uploadImg2(param){
                const  formData = new FormData();
                formData.append("file",param.file)
                upload(formData).then(data=>{
                    this.formData.articleAttachments.push({name:param.file.name,url:data.data})
                }).catch(error=>{
                    this.$message.error(error)
                })
            },
            //上传之前的验证
            beforeAvatarUpload(file){
                const isIMAGE = (file.type === 'image/jpeg') ||  (file.type === 'image/jpg') || (file.type ==='image/png')
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isIMAGE) {
                    this.$message.error('上传文件只能是图片格式!')
                }
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 2MB!')
                }
                return isIMAGE && isLt2M
            },
            handleExceed(files,articleAttachments){
                this.$message.warning(`当前限制选择3个文件，本次选择了${files.length+articleAttachments.length} 个文件`)
            },
            beforeRemove(file,articleAttachments){

                articleAttachments.forEach((item,index)=>{
                    if (file.name == item.name){
                        this.formData.articleAttachments.splice(index,1)
                    }
                })
            }
        }
    }
</script>

<style scoped>

    .avatar-uploader{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        width:80px;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 24px;
        color: #8c939d;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }
    .avatar {
        width: 80px;
        height: 80px;
        display: block;
    }

</style>