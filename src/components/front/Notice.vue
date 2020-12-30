<template>
    <div class="whitebg notice">
        <h2 class="htitle">{{channels.name}}</h2>
        <ul>
            <li v-for="(item,index) in articles" :key="index">
                <router-link :to='"/detail/"+item.id' target="_blank">{{item.title}}</router-link></li>
        </ul>
    </div>
</template>

<script>

    import {queryByPos,getNotice} from '@/api/front'
    export default {
        name: "Notice",
        data(){
            return{
                articles:[],
                channels: {}
            }
        },
        mounted() {
            queryByPos('c').then(data=>{
                let  arr =data.data
                this.channels=arr[0]
                getNotice(this.channels.id).then(data=>{
                    this.articles=data.data
                })

            }).catch(error=>{

            })
        }
    }
</script>

<style scoped>

</style>