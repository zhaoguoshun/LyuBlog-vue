<template>

    <div class="login-page" v-title data-title="Lyu博客后台 | 登录">
        <div class="login-page-bg">
            <h2 style="opacity: 1;font-weight: 300">Lyu博客后台登录</h2>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
               <el-form-item prop="userName">
                     <el-input placeholder="请输入用户名" v-model="form.userName"></el-input>
                </el-form-item>

                <el-form-item  prop="password">
                    <el-input placeholder="请输入登录密码" type="password" v-model="form.password"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button style="width: 100%" type="primary" :loading="loading" @click="submit()">立即登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                form:{
                    userName:'',
                    password:''
                },
                loading :false,
                rules:{
                    userName:[{required:true,message:'请输入用户名'}],
                    password:[{required:true,message:'请输入登录密码'}],
                }
            }
        },
        methods:{
            submit(){
                this.$refs['form'].validate(valid=>{
                    if (valid){
                       this.loading= true
                        this.$store.dispatch('login',this.form).then(()=>{
                            this.$router.push('/user')
                        }).catch(error=>{
                            this.loading=false
                            this.$message.error(error)
                        })

                    }
                })
            }
        }
    }
</script>

<style scoped>

    .login-page{
        height: 100%;
        background: url("../../assets/image/login-bg.jpg")no-repeat;
        background-size: cover ;
    }
    .login-page-bg{
        position: absolute;
        top: 30%;
        left: 30%;
        right: 30%;
        bottom: 25%;

        height: 300px;
        /*background-color: #ffffff;*/
        background-color: rgba(0,0,0,0.4);
        border-radius:5px;
        padding-top: 20px;
        color: white;
        text-align: center;
        padding-right: 50px;
        box-shadow: #666 0px 0px 10px;
        -webkit-box-shadow: #666 0px 0px 10px;
        -moz-box-shadow: #666 0px 0px 10px;

    }

    .login-page-bg h2{
        margin-bottom: 30px;
    }
</style>