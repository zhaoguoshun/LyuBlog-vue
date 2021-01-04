<template>
    <div class="whitebg lanmu">
        <img v-if="channel.channelImg==null ||channel.channelImg=='' " width="130px" height="100px" src="http://shunxinblog.oss-cn-hangzhou.aliyuncs.com/2021/01/03/3258a01370a94c7c88d00db7483f6557.jpg">
        <img v-else :src="channel.channelImg">
        <h1>{{channel.name}}</h1>
        <p>{{channel.summary}}</p>
    </div>
</template>

<script>

    export default {
        name: "ChannelInfo",
        props:['channel'],
        data(){
            return{}
        }
    }
</script>

<style scoped>

</style>