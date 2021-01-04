<template>
    <div class="whitebg wenzi">
        <h2 class="htitle">猜你喜欢</h2>
        <ul>
            <li v-for="(item,index) in articles" :key="index">
                <router-link  :to='"/detail/"+item.id' target="_blank">{{item.title}}</router-link ></li>
        </ul>
    </div>
</template>

<script>

    import {getLikeArticle} from "../../api/front";
    export default {
        name: "Like",
        data(){
            return{
                articles: []
            }
        },
        mounted() {
            getLikeArticle(this.$route.params.id).then(data=>{
                this.articles=data.data.articleVo
             })
        },
        methods(){

        },
        beforeRouteUpdate(to,from ,next){
            getLikeArticle(to.$route.params.id).then(data=>{
                this.articles=data.data.articleVo
            })
            this.xx = false;
            this.$nextTick(() => {
                this.xx = true
            })
            next()
        },
    }
</script>

<style scoped>

</style>