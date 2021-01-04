<template>
    <el-aside width="200px">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo"
                 :unique-opened="true"
                 router
                 @open="handleOpen"
                 @close="handleClose"

        >
            <template v-for="(menu,index) in menus" >
                <el-submenu  :index="menu.children[0].router" :key="index">
                    <template slot="title">
                        <i :class="menu.icon"></i>
                        <span slot="title">{{menu.name}}</span>
                    </template>

                    <template v-for="(child,i) in menu.children">
                        <el-menu-item
                                :index="child.router" :key="index+'-'+i">
                            <i :class="child.icon"></i>
                            {{child.name}}
                        </el-menu-item>
                    </template>
                </el-submenu>
            </template>
        </el-menu>
    </el-aside>
</template>

<script>
    import menus from  '../../api/menu'
    export default {
        name: "Left",
        data() {
            return {
                menus:menus
            };
        },
        methods:{
            handleOpen(key, keyPath) {
            },
            handleClose(key, keyPath) {
            }
        }
    }

</script>

<style scoped>

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .el-aside{
        background-color: #ffffff;
        position: absolute;
        left: 0px;
        bottom: 0px;
        top: 60px;
        border-right: 1px solid #e6e6e6;
        box-shadow: 5px 0px 10px -2px #e0e0e0;
    }


</style>