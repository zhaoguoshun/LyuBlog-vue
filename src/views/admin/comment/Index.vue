<template>
    <div data-title="Lyu博客后台 | 评论管理">
        <div>
            <el-form :inline="true" ref="queryForm" :model="queryForm" label-width="80px">
                <el-form-item>
                    <el-input v-model="queryForm.content" placeholder="按关键字查询"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="search" type="primary" >查询</el-button>
                    <el-button  @click="check" type="error" >待审核评论<span style="color: #ff180e;font-size: 15px"> {{number}} </span><span></span></el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="Id"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="author"
                    label="评论者"
                    >
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="内容"
            >
            </el-table-column>



            <el-table-column
                    prop="statusName"
                    label="状态"
            >
            </el-table-column>

            <el-table-column
                    prop="email"
                    label="邮箱"
            >
            </el-table-column>

            <el-table-column
                    prop="createDate"
                    label="评论时间"
            >
            </el-table-column>

            <el-table-column
                   align="center"
                   width="150"
                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="del(scope.row)"  size="small" type="danger" icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination
                background
                layout="total,prev, pager, next,jumper"
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                :page-size="7"
                :total="total">
        </el-pagination>

    </div>
</template>

<script>
    import {query,del,getStatusComment} from "@/api/comment";

    export default {
        name: "Index",
        components:{
        },
        data() {
            return {
                queryForm:{
                    content: ''
                },
                tableData: [],
                total: 0,
                pageNo: 1,
                pages: '',
                number:''
            }
        },
        mounted(){
            this.list({"page":this.pageNo})
            getStatusComment().then(data=>{
                this.number=data.total
            })
        },
        methods:{
            handleCurrentChange(val){
                let  param =this.queryForm
                this.pageNo=val
                param.page=this.pageNo
                this.list(param)
            },
            search(){
                let  param =this.queryForm
                this.pageNo =1
                param.page=this.pageNo
                this.list(param)
            },
            list(param){
                query(param).then(data=>{
                    console.log(data)
                    this.tableData=data.list
                    this.total=data.total
                }).catch(error=>{
                    this.$message.error(error)
                })
            },
            check(){
                this.$router.push('/comment_check')
            },
            del(row){
                this.$confirm('确定要删除'+row.content+' 评论吗？','提示').then(()=>{
                    del (row.id).then(data=>{
                        let param= this.queryForm
                        param.page =this.pageNo
                        this.list(param)
                    }).catch(error=>{

                        this.$message.error(error)
                    })
                }).catch(error=>{

                })
            }
        }
    }
</script>

<style scoped>

</style>