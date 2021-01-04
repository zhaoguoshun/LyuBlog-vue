<template >
    <div v-title data-title="栏目">
        <Header></Header>
        <article>
            <div class="lbox">
                <div class="content_box whitebg">
                    <h2 class="htitle">{{channel.name}}</h2>

                    <p class="con_info" v-if="channel.summary">{{channel.summary}}</p>
                    <div class="con_text" style="min-height: 1000px">
                        <v-md-preview :text="channel.content"></v-md-preview>
                    </div>
                </div>
            </div>
            <div class="rbox">
                <Order></Order>
                <Like></Like>
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
    import Like from  '../../components/front/Like'
    import Tag from "../../components/front/Tag";
    import  {get} from "@/api/front";
    export default {
        name: "Detail",
        components: {
            Tag, Footer, FriendLink, Order , Header, Like
        },
        data(){
            return{
                channel: {}
            }
        },
        mounted(){
            this.getChannel(this.$route.params.id)
        },
        beforeRouteUpdate(to,from ,next){
            console.log(to.params)
            this.getChannel(to.params.id)
            next()
        },
        methods:{
            getChannel(id){
                get(id).then(data=>{
                    this.channel=data.data
                })
            }
        }
    }
</script>

<style scoped>

</style>