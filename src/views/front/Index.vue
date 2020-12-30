<template>
    <div v-title data-title="Lyu博客">
        <Header @child-even="parentEven" @child-evenTitle="parentEvenTitle"></Header>
        <article>
            <div class="lbox">
              <Swiper></Swiper>
                <HeaderLine></HeaderLine>
                <Table v-if="xx"></Table>
                <NewBlog v-if="xx" :search="newData" :childevenTitle="title"></NewBlog>

            </div>
            <div class="rbox">
              <AboutMe></AboutMe>
                <Notice></Notice>
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
    import Swiper from "../../components/front/Swiper";
    import HeaderLine from "../../components/front/HeaderLine";
    import AboutMe from "../../components/front/AboutMe";
    import Table from "../../components/front/Table";
    import NewBlog from "../../components/front/NewBlog";
    import Notice from "../../components/front/Notice";
    import Order from "../../components/front/Order";
    import FriendLink from "../../components/front/FriendLink";
    import Footer from "../../components/front/Footer";
    import Tag from  '../../components/front/Tag'

    export default {
        name: "Index",
        components: {Footer,
            FriendLink, Order, Notice, NewBlog, Table, AboutMe, Swiper, Header, HeaderLine, Tag},

        data(){
            return{
                articles: [],
                pages: '',
                total: 0,
                pageNo: '',
                xx: true,
                newData: '',
                title:''
            }
        },
        beforeRouteUpdate(to,from ,next){
            this.xx = false;
            this.$nextTick(() => {
                this.xx = true
            })
            next()
        },
        methods:{
            parentEven(data) {
                console.log(data)
                console.log(data)
                console.log('aaaa')
                this.newData = data;
            },
            parentEvenTitle(data){
                this.title=data
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>