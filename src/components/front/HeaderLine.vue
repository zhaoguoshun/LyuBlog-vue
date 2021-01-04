<template>

    <div class="headline">
        <ul>
            <li><router-link :to='"/detail/"+title1.id'  :title="title1.title">
                <img src="http://shunxinblog.oss-cn-hangzhou.aliyuncs.com/2020/12/27/93f4a58fe89d443babc592ed86b78731.jpg" alt="为什么说10月24日是程序员的节日？">
                <span>{{title1.title}}</span>
            </router-link></li>
            <li><router-link :to='"/detail/"+title2.id' :title="title2.title">
                <img src="http://shunxinblog.oss-cn-hangzhou.aliyuncs.com/2020/12/27/05efce18bfe745658704b9db2e0e1564.jpg" alt="个人网站做好了，百度不收录怎么办？来，看看他们怎么做的。">
                <span>{{title2.title}}</span>
            </router-link></li>
        </ul>
    </div>
</template>

<script>

    import {getRandomArticle} from '@/api/front'
    export default {
        name: "HeaderLine",
        data(){
            return{
                articles:[],
                title1: [],
                title2: []
            }
        },
        created() {
            getRandomArticle().then(data=>{
                this.articles=data.data
                this.title1=this.articles[0]
                this.title2=this.articles[1]
            })
        },

    }
</script>

<style scoped>

</style>