<template>
    <el-container class="container">
        <el-header class="header">
            <Header></Header>
        </el-header>

        <el-container>
           <Left></Left>
            <el-main>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                </el-breadcrumb>

                <el-card style="margin-top: 20px">
                    <router-view></router-view>
                </el-card>
            </el-main>
        </el-container>
    </el-container>


</template>

<script>
    import Header from '../../components/admin/Header'
    import Left from "../../components/admin/Left";
    export default {
        name: "Index",
        components: {Left, Header},
        comments:{
            Header,
            Left
        },
        data() {
            return {

            };
        },

        methods:{

        }
    }
</script>

<style scoped>

    .header{
        background-color: #008b8b;
        width: 100%;
    }

    .container{
        background-color: #f2f2f2;
        position: absolute;

        bottom: 0px;
        top: 0px;
        left: 0px;
        right: 0px;
    }

    .el-main{
        position: absolute;
        left: 200px;
        bottom: 0px;
        top: 60px;
        right: 10px;
        margin: 0px;
    }

    .breadcrumb{
        height: 45px;
        line-height: 45px;
        padding: 0px;
        margin: 0px;

    }
</style>