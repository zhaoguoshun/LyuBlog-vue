<template>
    <div class="whitebg bloglist" >

        <h2 class="htitle" >最新博文</h2>
        <ul>
            <li v-for="(item,index) in articleTops" :key="index.id">
                <h3 class="blogtitle"><router-link :to='"/detail/"+item.id'  arget="_blank"><b>【置顶】</b>{{item.title}}</router-link></h3>
                <span class="blogpic imgscale"><i><router-link :to='"/detail/"+item.id'>{{item.channel.name}}</router-link></i>
                    <router-link :to='"/detail/"+item.id' target="_blank">
                        <img v-if="item.titleImg==null ||item.titleImg=='' " width="130px" height="120px" src="http://shunxinblog.oss-cn-hangzhou.aliyuncs.com/2021/01/03/c188ca3b0ca94de7b0eaa6b2589659c2.jpg" alt="">
                        <img v-else  width="130px" height="130px"  :src="item.titleImg" alt="">
                    </router-link>
                </span>
                <p class="blogtext">{{item.summary}} </p>
                <p class="bloginfo">
                    <i class="avatar"><img :src="item.user.avatar"></i>
                    <span>{{item.user.nickName}}</span><span>{{item.createDate}}</span></p>
                <router-link :to='"/detail/"+item.id' target="_blank"  class="viewmore"> 阅读更多</router-link >
            </li>


            <!--单图-->
            <li v-for="(item,index) in articles" :key="index">
                <a href="#search" name="content"></a>
                <h3 class="blogtitle"><router-link :to='"/detail/"+item.id' target="_blank">{{item.title}}</router-link></h3>
                <span class="blogpic imgscale"><i><router-link :to='"/detail/"+item.id'>{{item.channel.name}}</router-link></i>
                    <router-link :to='"/detail/"+item.id' target="_blank">
                        <img v-if="item.titleImg==null ||item.titleImg=='' " width="130px" height="120px" src="http://shunxinblog.oss-cn-hangzhou.aliyuncs.com/2021/01/03/c188ca3b0ca94de7b0eaa6b2589659c2.jpg" alt="">
                        <img v-else width="130px" height="130px"  :src="item.titleImg" alt="">
                    </router-link>
                </span>
                <p class="blogtext">{{item.summary}} </p>
                <p class="bloginfo">
                    <i class="avatar"><img :src="item.user.avatar"></i>
                    <span>{{item.user.nickName}}</span><span>{{item.createDate}}</span></p>
                <router-link :to='"/detail/"+item.id' target="_blank" class="viewmore"> 阅读更多</router-link >
            </li>
        </ul>

        <div>
            <el-pagination
                    background
                    layout="total,prev, pager, next,jumper"
                    @current-change="handleCurrentChange"
                    :current-page="pageNo"
                    :page-size="7"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {getPageList,getNewBlogTop,search} from "@/api/front";
    import evenBus from  '@/utils/evenBus'
    export default {
        name: "NewBlog",
        props:['search','childevenTitle'],
        watch: {
            search: function(newVal,oldVal){
                this.articles=newVal.list
                this.total=newVal.total
                this.truth=true
            },
            childevenTitle: function(newVal,oldVal){
               this.queryForm.title=newVal
            },

        },
        data(){
            return{
                articles: [],
                articleTops: [],
                searchs:[],
                truth:false,
                page: '',
                pageNo: 1,
                pages: '',
                total: 0,
                enven:'',
                queryForm:{
                    name:'',
                    userName: ''
                },
            }
        },
        mounted(){
            this.getEvenData()
            this.list(this.pageNo)
            getNewBlogTop().then(data=>{
                this.articleTops =data.data
            })
        },
        methods:{
            handleCurrentChange(val){
                this.pageNo=val
                if (this.truth) {
                    this.getSearchPage(val)
                }else {
                    this.list(this.pageNo)
                }
            },
            list(param){
                getPageList(param).then(data=>{
                    this.articles=data.list
                    this.total=data.total
                }).catch(error=>{
                    this.$message.error(error)
                })
            },
            searchPage(param){
                search(param).then(data=>{
                    this.articles=data.list
                    this.total=data.total
                }).catch(error=>{
                    this.$message.error(error)
                })
            },
            getSearchPage(val){
                console.log('向父组件传值')
                let  param =this.queryForm
                this.pageNo =val
                param.page=this.pageNo
                this.searchPage(param)
                console.log('传参数的里面')
                console.log(this.articles)
            },
            getEvenData(){
                evenBus.$on('a',function (val) {
                    this.enven=val
                })
            }
        }
    }
</script>

<style scoped>




</style>