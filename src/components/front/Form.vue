<template>
    <div class="guoshun-form">
        <el-row :gutter="15">
            <el-form ref="formData" :model="formData" :rules="rules" size="medium" label-width="100px">
                <el-col :span="24">
                    <el-form-item prop="content">
                        <el-input type="textarea" :rows="8" v-model="formData.content" height=130px></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="13">
                    <el-form-item  prop="author">
                        <el-input v-model="formData.author" placeholder="请输入昵称" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>

                    <el-form-item  prop="email">
                        <el-input v-model="formData.email" placeholder="请输入邮箱" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="15">
                    <el-form-item>
                        <el-button type="primary" style="width:379px; height: 43px;margin-bottom:20px;font-size: 17px" :loading="loading" @click="submitForm">立即评论</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </div>
</template>

<script>
    import {create} from "../../api/comment";

    export default {
        name: "Form",
        data() {
            return{
                formData: {
                    author: '',
                    email: '',
                    content: '',
                    articleId: ''
                },
                loading: false,
                rules: {
                    author: [{required: true, message: '请输入昵称', trigger: 'blur'}],
                    content: [{required: true, message: '请输入评论内容', trigger: 'blur'}],
                    email: [ { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
                }
            }
        },

        created(){
            this.formData.articleId=this.$route.params.id
        },
        methods: {
            submitForm(){
                this.$refs['formData'].validate((valid) => {
                    if (valid) {
                        create(this.formData).then(data=>{
                            this.$message.info(data.message)
                            this.$refs['formData'].resetFields()
                        }).catch(error=>{
                            this.$message.error(error)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

    .guoshun-form{
        margin-left: -80px;
        margin-top: 20px;
    }

</style>