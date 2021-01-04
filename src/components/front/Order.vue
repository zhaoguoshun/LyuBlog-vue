<template>
    <div class="whitebg paihang">
        <h2 class="htitle">点击排行</h2>
        <section class="topnews imgscale"><router-link :to='"/detail/"+article.id' target="_blank">
            <img src="http://shunxinblog.oss-cn-hangzhou.aliyuncs.com/2021/01/03/043a9cdba949490d9f57239da84cb3c2.jpg"><span>{{article.title}}</span>
        </router-link></section>
        <ul>
            <li v-for="(item,index) in articles.slice(0,8)" :key="index">
                <i></i>
                <router-link :to='"/detail/"+item.id' target="_blank">{{item.title}}</router-link >
            </li>
        </ul>
    </div>
</template>

<script>
    import {getOlderByArticle} from "../../api/front";
    export default {
        name: "Order",
        data(){
            return{
                articles: [],
                article: ''
            }
        },
        mounted() {
            getOlderByArticle().then(data=>{
                this.articles=data.data
                this.article=this.articles[0]
            }).catch(error=>{

            })
        }
    }
</script>

<style scoped>

</style>