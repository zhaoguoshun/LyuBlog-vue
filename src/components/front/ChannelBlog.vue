<template>
    <div class="whitebg bloglist">
        <h2 class="htitle">最新博文</h2>
        <ul>

            <li v-for="(item,index) in articleTops" :key="index.id">
                <h3 class="blogtitle"><router-link :to='"/detail/"+item.id'  arget="_blank"><b>【置顶】</b>{{item.title}}</router-link></h3>
                <span class="blogpic imgscale"><i><router-link :to='"/detail/"+item.id'>{{item.channel.name}}</router-link></i>
                    <router-link :to='"/detail/"+item.id'>
                        <img v-if="item.titleImg==null ||item.titleImg=='' " width="130px" height="120px" src="@/assets/images/flower.jpg" alt="">
                        <img v-else  :src="item.titleImg"  height="120px" alt="">
                    </router-link>
                </span>
                <p class="blogtext">{{item.summary}} </p>
                <p class="bloginfo">
                    <i class="avatar"><img :src="item.user.avatar"></i>
                    <span>{{item.user.nickName}}</span><span>{{item.createDate}}</span></p>
                <router-link :to='"/detail/"+item.id'  class="viewmore"> 阅读更多</router-link >
            </li>

            <!--单图-->
            <li v-for="(item,index) in articles" :key="index">
                <h3 class="blogtitle"><router-link :to='"/detail/"+item.id' target="_blank">{{item.title}}</router-link></h3>
                <span class="blogpic imgscale"><i><router-link :to='"/detail/"+item.id'>{{item.channel.name}}</router-link></i>
                    <router-link :to='"/detail/"+item.id'>
                        <img v-if="item.titleImg==null ||item.titleImg=='' " width="130px" height="120px" src="@/assets/images/flower.jpg" alt="">
                        <img v-else  :src="item.titleImg"  height="120px" alt="">
                    </router-link>
                </span>
                <p class="blogtext">{{item.summary}} </p>
                <p class="bloginfo">
                    <i class="avatar"><img :src="item.user.avatar"></i>
                    <span>{{item.user.nickName}}</span><span>{{item.createDate}}</span></p>
                <router-link :to='"/detail/"+item.id'  class="viewmore"> 阅读更多</router-link >
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
    import {getChannelArticle} from "@/api/front";
    import {getNewBlogTop} from "@/api/front";
    export default {

        name: "ChannelBlog",
        data(){
            return{
                articles: [],
                article:{
                    channelId : this.$route.params.id,
                    page: ''
                },
                articleTops: [],
                page: '',
                pageNo: 1,
                pages: '',
                total: 0,
            }
        },

        created(){
            this.article.page = this.pageNo
            this.list(this.article)

            getNewBlogTop().then(data=>{
                this.articleTops =data.data
            })
        },
        methods:{
            handleCurrentChange(val){
                let  param =this.article
                this.pageNo=val
                param.page=this.pageNo
                this.list(param)
            },
            list(parms){
                getChannelArticle(parms).then(data=>{
                    this.articles=data.list
                    this.total=data.total
                }).catch(error=>{
                    this.$message.error(error)
                })
            },
            beforeRouteUpdate(to,from ,next){
                // this.channelId= to.params.id
                this.list(this.article)
                next()
            },

        }
    }
</script>

<style scoped>




</style>