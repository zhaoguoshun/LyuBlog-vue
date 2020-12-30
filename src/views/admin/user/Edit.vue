<template>
    <div v-title data-title="Lyu博客后台 | 用户编辑">
        <el-row :gutter="15">
            <el-form ref="formData" :model="formData" :rules="rules" size="medium" label-width="100px">
                <el-col :span="12">
                    <el-form-item label="账号" prop="userName">
                        <el-input v-model="formData.userName"  placeholder="请输入账号" clearable :style="{width: '100%'}"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="用户名" prop="nickName">
                        <el-input v-model="formData.nickName" placeholder="请输入用户名" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="formData.email" placeholder="请输入邮箱" clearable :style="{width: '100%'}">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="状态" prop="status">
                        <el-select v-model="formData.status" placeholder="请选择状态" clearable :style="{width: '100%'}">
                            <el-option v-for="item in this.utils.status"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="15">
                    <el-form-item>
                        <el-button @click="close">取消</el-button>
                        <el-button type="primary" :loading="loading" @click="submitForm">保存</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </div>
</template>

<script>
    import {update} from "@/api/user";

    export default {
        name: "Edit",
        props:['data'],
        data(){
            return{
                formData: {
                    id: '',
                    userName: '',
                    password: '',
                    nickName: '',
                    email: '',
                    status: 'T'
                },
                loading: false,
                rules: {
                    userName: [{required: true, message: '请输入账号', trigger: 'blur'}],
                    nickName: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                    email: [ { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
                    // status: [{required: true, message: '请选择状态', trigger: 'change'}],
                }
            }
        },
        created(){
           this.formData =JSON.parse(JSON.stringify(this.data))
        },
        methods:{
            submitForm(){
                this.$refs['formData'].validate(valid=>{
                    if (valid) {
                        this.loading=true
                        update(this.formData).then(data=>{
                            this.loading=false
                            this.$refs['formData'].resetFields()
                            this.$emit("after")
                            this.$emit("hideDialog")
                        }).catch(error=>{
                            this.loading=true
                            this.$message.error(error)
                        })
                    }
                })
            },
            close(){
                this.$emit("hideDialog")
            }
        }
    }
</script>

<style scoped>

</style>