<template>
        <el-row>
            <el-col :span="20">
                <table  class="logo">
                    <tr>
                        <td>
                            Lyu博客
                        </td>
                    </tr>
                </table>
            </el-col>

            <el-col :span="4" align="right">
                <el-dropdown trigger="click" @command="handleCommand" style="margin-top: 20px">
                      <el-link class="user" :underline="false">
                          <table>
                              <tr>
                                  <td valign="top">{{nickName}}</td>
                                  <td valign="top">
                                      <el-icon class="el-icon-caret-bottom"></el-icon>
                                  </td>
                                  <td></td>
                                  <td valign="middle"><img :src="avatar"  alt=""></td>
                              </tr>
                          </table>

                      </el-link>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="index">首页</el-dropdown-item>
                        <el-dropdown-item command="info">个人信息</el-dropdown-item>
                        <el-dropdown-item command="password">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </el-col>
        </el-row>
</template>

<script>
    import token from '../../store/token'
    export default {
        name: "Header",
        data(){
            return {
                userName :token.getUser().userName,
                nickName: token.getUser().nickName,
                avatar: token.getUser().avatar
            }
        },
        created(){
            if(!token.get()){
                this.$router.push('/login')
            }
          if (token.getUser().avatar == null) {
              this.avatar='http://shunxinblog.oss-cn-hangzhou.aliyuncs.com/2020/12/30/c1d5fb12c96c48f0b10d1b5764b73ecd.jpg'
          }
        },
        methods:{
            handleCommand(command){
                if (command== 'info'){
                    this.$router.push("/info")
                }

                if (command== 'index'){
                    this.$router.push("/")
                }
                if (command== 'logout'){
                    this.$store.commit('logout')
                    this.$router.push("/login");
                }
                if (command== 'password'){
                    this.$router.push("/password")
                }
            }
        }

    }
</script>

<style scoped>

    .logo{
        height: 60px;
        color: #ffffff;
        font-size: 20px;
        font-weight: bold;
    }
    .logo img{
        width: 40px;
        height: 40px;
    }
    .user{
        color: #ffffff !important;
    }
    .user img{
        width: 30px;
        height: 30px;
        border-radius: 15px;
    }
</style>