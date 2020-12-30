<template>
    <div v-title data-title="Lyu博客后台 | 修改友情链接">
        <el-row :gutter="15">
            <el-form ref="formData" :model="formData" :rules="rules" size="medium" label-width="100px">
                <el-col :span="15">
                    <el-form-item label="名称" prop="title">
                        <el-input v-model="formData.title"  placeholder="输入名称" clearable :style="{width: '100%'}"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="15">
                    <el-form-item label="链接" prop="url">
                        <el-input v-model="formData.url" placeholder="请输入链接" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                </el-col>


                <el-col :span="15">
                    <el-form-item label="打开方式" prop="url">
                        <el-radio v-model="formData.target" label="_blank">新窗口</el-radio>
                        <el-radio v-model="formData.target" label="_self">当前窗口</el-radio>

                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="图片" prop="channelImg">
                        <el-upload
                                class="avatar-uploader"
                                action="string"
                                :show-file-list="false"
                                :http-request="uploadImg"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="formData.path" :src="formData.path" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>

                <el-col :span="15">
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
    import {update,upload,detail} from "@/api/friendLink";
    export default {
        name: "Add",
        components: {  },
        data(){
            return{
                formData: {
                    title: '',
                    path: '',
                    url: '',
                    target: '_blank'
                },
                loading: false,
                rules: {
                    title: [{required: true, message: '请输入标题', trigger: 'blur'}],
                    url: [{required: true, message: '请输入链接', trigger: 'blur'}],
                }
            }
        },
        created(){
            let  id=this.$route.query.id
            detail(id).then(data=>{
                this.formData=data.data
            }).catch(error=>{
                this.$message.error(error)
            })

        },
        methods:{
            submitForm(form){
                this.$refs['formData'].validate(valid=>{
                    if (valid) {
                        this.loading=true

                        update(this.formData).then(data=>{
                            this.loading=false
                            this.$message.success(data.message)
                            this.$refs['formData'].resetFields()
                            this.$router.push('/friend')
                        }).catch(error=>{
                            this.loading=true
                            this.$message.error(error)
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
                    this.formData.path = data.data
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