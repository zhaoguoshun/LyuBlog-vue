<template>
    <div v-title data-title="">
        <Header></Header>
        <article>
            <div class="lbox">
                <ChannelInfo :channel="channel"></ChannelInfo>
                <ChannelBlog v-if="xx"></ChannelBlog>
            </div>
            <div class="rbox">
                <Order></Order>
                <Tag></Tag>
                <FriendLink></FriendLink>
            </div>
        </article>
        <Footer></Footer>
    </div>
</template>

<script>
    import  '@/assets/css/base.css'
    import  '@/assets/css/m.css'
    import Header from "../../components/front/Header";
    import Order from "../../components/front/Order";
    import FriendLink from "../../components/front/FriendLink";
    import Footer from "../../components/front/Footer";
    import ChannelInfo from '../../components/front/ChannelInfo'
    import Tag from "../../components/front/Tag";
    import  {get} from "@/api/front";
    import ChannelBlog from "../../components/front/ChannelBlog";
    export default {
        name: "List",
        data(){
          return{
              channelId: 0,
              channel: {},
              xx:true,
          }
        },
        components: {
            ChannelBlog, Tag, Footer, FriendLink, Order , Header,ChannelInfo
        },
        created(){
         this.getChannel(this.$route.params.id)
        },
        beforeRouteUpdate(to,from ,next){
            this.channelId= to.params.id
            this.getChannel(to.params.id)
            this.xx = false;
            this.$nextTick(() => {
                this.xx = true
            })
            next()
        },
        methods:{
            getChannel(id){
                get(id).then(data=>{
                    this.channel=data.data
                })
            },
        }
    }
</script>

<style scoped>

</style>