<template>
    <div>

        <!--top begin-->
        <header id="header">
            <div class="navbox">
                <h2 id="mnavh" ><span class="navicon"></span></h2>
                <div class="logo"><a href="/">Lyu个人博客</a></div>
                <nav>
                    <ul id="starlist">
                        <li><a href="/">首页</a></li>
                        <li  v-for="(item,index) in channels " :key="index" :class="{menu: item.children}">
                            <router-link v-if="item.single"  :to='"/channel_detail/"+item.id'>{{item.name}}</router-link>
                            <router-link v-else :to='"/list/"+item.id'>{{item.name}}</router-link>

                            <ul class="sub" v-if="item.children">
                                <li v-for="(sub,sindex) in item.children" :key="sindex">
                                    <router-link v-if="sub.single" :to='"/channel_detail/"+sub.id'>{{sub.name}}</router-link>
                                    <router-link v-else :to='"/list/"+sub.id'>{{sub.name}}</router-link></li>
                            </ul>
                        </li>
                        <li ><router-link to="/user" target="_blank">后台管理</router-link></li>
                    </ul>
                </nav>
                <div class="searchico"></div>
            </div>
        </header>
        <div class="searchbox">
            <div class="search">
                <div>
                    <el-form :inline="true" ref="queryForm" :model="queryForm" label-width="80px">
                        <el-form-item>
                            <el-input v-model="queryForm.title" style="width: 330px" placeholder="按标题查询"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <a href="#content"  name="search">
                                <el-button icon="el-icon-search" @click="search" type="primary" >查询</el-button>
                            </a>
                        </el-form-item>
                    </el-form>
                </div>

                <!--</form>-->
            </div>
            <div class="searchclose"></div>
        </div>
    </div>
    <!--top end-->
</template>

<script>
    import {queryByPos,search} from '@/api/front'
    import $ from 'jquery'


    export default {
        name: "Header",

        data(){
            return{
                channels: [],
                queryForm:{
                    name:'',
                    userName: ''
                },
                articles:[],
                pageNo :1,
            }
        },
        mounted() {
            queryByPos('a').then(data=>{
                this.channels=data.data
            }).catch(error=>{

            })
            $("#mnavh").click(function() {
                $("#starlist").toggle();
                $("#mnavh").toggleClass("open");
            });

            //search
            $(".searchico").click(function() {
                $(".search").toggleClass("open");
            });
            //searchclose
            $(".searchclose").click(function() {
                $(".search").removeClass("open");
            });
        },
        methods:{
            search(){
                let  param =this.queryForm
                this.pageNo =1
                param.page=this.pageNo
                this.list(param)
            },
            list(param){
                search(param).then(data=>{
                    this.articles=data
                    this.$emit('child-even',this.articles)
                    this.$emit('child-evenTitle',this.queryForm.title)
                    this.total=data.total
                }).catch(error=>{
                    this.$message.error(error)
                })
            },
        }

    }
</script>

<style scoped>

</style>