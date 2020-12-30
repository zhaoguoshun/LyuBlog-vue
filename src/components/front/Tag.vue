<template>
    <div class="whitebg cloud">
        <h2 class="htitle">标签云</h2>
        <ul>
           <router-link  v-for=" (item,index) in tags" :key="index" :to='"/tag_list/"+item.id' target="_blank" >{{item.tagName}}</router-link>
        </ul>
    </div>
</template>

<script>
    import {del,all} from "@/api/tag";
    export default {
        name: "Tag",
        data(){
          return{
              tags: [],
              page: '',
              pageNo: 1,
              pages: '',
              total: 0,
          }
        },
        mounted(){
            all().then(data=>{
                this.tags=data.data
            }).catch(error=>{
                this.$message.error(error)
            })
        },
        methods:{

        }

    }
</script>

<style scoped>

</style>