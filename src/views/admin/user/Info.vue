<template>
    <div class="guoshun-info" v-title data-title="Lyu博客后台 | 个人信息">
            <el-row :gutter="15">
                <el-form ref="defForm" :model="defForm" :rules="rules"  label-width="100px">
                    <el-col :span="24">
                        <!-- 用户头像 -->
                        <el-form-item label="用户头像">
                            <!-- 头衔缩略图 -->
                            <pan-thumb :image="image"/>
                            <!-- 文件上传按钮 -->
                            <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
                            </el-button>
                            <!--
                              v-show：是否显示上传组件
                              :key：类似于id，如果一个页面多个图片上传控件，可以做区分
                              :url：后台上传的url地址
                              @close：关闭上传组件
                              @crop-upload-success：上传成功后的回调 -->
                            <image-cropper
                                    v-show="imagecropperShow"
                                    :width="300"
                                    :height="300"
                                    :key="imagecropperKey"
                                    :url="'user/upload'"
                                    field="file"
                                    @close="closeImage"
                                    @crop-upload-success="cropSuccess"
                            />
                            <!--@crop-upload-success="cropSuccess"-->

                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户名"  prop="userName">
                            <el-input v-model="defForm.userName"  placeholder="请输入用户名" :disabled="true" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="昵称" prop="nickName">
                            <el-input v-model="defForm.nickName" placeholder="请输入昵称" clearable :style="{width: '100%'}">
                            </el-input>
                        </el-form-item>

                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="defForm.email" placeholder="请输入邮箱" clearable :style="{width: '100%'}">
                            </el-input>

                        </el-form-item>

                    </el-col>
                    <el-col :span="15">
                        <el-form-item >
                            <el-button type="primary" :loading="loading" @click="submitForm">保存</el-button>
                            <el-button @click="close">取消</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
    </div>
</template>

<script>
    import ImageCropper from '../../../components/ImageCropper'
    import token from '@/store/token'
    import {update} from "../../../api/user";
    import PanThumb from '@/components/PanThumb/index'
    export default {
        name: "Info",
        components: {PanThumb,ImageCropper},
        data() {
            return {
                defForm: {
                    id: '',
                    userName:'',
                    nickName: '',
                    avatar: '',
                    email: ''
                },

                loading: false,
                // 控制弹出框显示隐藏
                showDialog:false,
                imagecropperShow: false, // 是否显示上传组件
                imagecropperKey: 0, // 上传组件id
                image: 'http://localhost:8081/cms/upload/3bb6badb-7235-492b-8aa1-700eaa4e0771.png',
                //https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191
                rules: {
                    nickname: [{required: true, message: '请输入昵称', trigger: 'blur'}],
                    email: [{required: true, message: '请输入邮箱', trigger: 'blur'}],
                },
                field101Action: 'https://jsonplaceholder.typicode.com/posts/',
            }
        },
        created(){
            this.defForm=token.getUser()
            this.image=this.defForm.avatar
            if (this.defForm.avatar==null){
                this.image='https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
            }
        },
        methods:{
            onClose() {
                this.$refs['elForm'].resetFields()
                this.$emit('changeShow', 'false')
            },
            close() {
                this.$emit('changeShow', 'false')
            },
            submitForm(){
                this.$refs['defForm'].validate(valid=>{
                    if (valid) {
                        this.loading=true
                        update(this.defForm).then(data=>{
                            this.loading=false
                            this.$message.success(data.message)
                            //将用户的最新消息写入到localStorage
                            token.setUser(data.data)
                            this.defForm=data.data
                        }).catch(error=>{
                            this.loading=true
                            this.$message.error(error)
                        })
                    }
                })
            },
            // 上传成功后的回调函数
            cropSuccess(data) {
                //使用该属性，保存上传之前的头像
                this.imagecropperShow = false
                this.defForm.avatar=this.image = data;
                // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
                this.imagecropperKey = this.imagecropperKey + 1
            },
            // 关闭上传组件
            closeImage() {
                this.imagecropperShow = false
                // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
                this.imagecropperKey = this.imagecropperKey + 1
            }
        }
    }
</script>

<style scoped>

    .guoshun-info{
        margin-left: 250px;
        margin-top: 30px;
        height: 550px;
    }

</style>