<template>

    <div>
        <div class="ad whitebg imgscale">
            <ul>
                <a href="/"><img src="http://shunxinblog.oss-cn-hangzhou.aliyuncs.com/2021/01/03/b156d96ce7264322a6179e2f614ca205.jpg"></a>
            </ul>
        </div>

        <div class="links whitebg">
            <h2 class="htitle"><span class="sqlink"></span>友情链接</h2>
            <ul>
                <li v-for="(item,index) in friendLink" :key="index">
                    <a :href="item.url" target="_blank">{{item.title}}</a></li>

            </ul>
        </div>
    </div>
</template>

<script>
    import {getListLink} from "@/api/friendLink";
    export default {
        name: "FriendLink",
        data(){
            return{
                friendLink: []
            }
        },
        created() {
            getListLink().then(data=>{
                this.friendLink=data.data
            })
        }
    }
</script>

<style scoped>

</style>