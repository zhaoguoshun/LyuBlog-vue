<template>
    <div>
        <Header></Header>
        <article>
            <div class="lbox">
                <TagBlog></TagBlog>
            </div>
            <div class="rbox">
                <Order></Order>
                <!--<Like></Like>-->
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
    import TagBlog from "../../components/front/TagBlog";
    import Order from "../../components/front/Order";
    import FriendLink from "../../components/front/FriendLink";
    import Footer from "../../components/front/Footer";
    import Tag from "../../components/front/Tag";

    export default {
        name: "List",
        components: {
            Tag, Footer, FriendLink, Order,  TagBlog , Header
        },
        data(){
            return{
            }
        },

        beforeRouteUpdate(to,from ,next){
            console.log(to.params)
            next()
        }
    }
</script>

<style scoped>

</style>