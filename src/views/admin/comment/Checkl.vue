<template>
    <div data-title="Lyu博客后台 | 审核评论">
        <div>
            <el-form :inline="true" ref="queryForm" :model="queryForm" label-width="80px">
                <el-form-item>
                    <el-button icon="el-icon-back" @click="$router.back()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table
                :data="tableData"
                style="width: 100%">
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
                    <el-button @click="update(scope.row)"  size="small" type="success" >通过</el-button>
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
    import {query,del,getStatusComment,getupdateStatus,getPageCommentId} from "@/api/comment";

    export default {
        name: "Check",
        components:{
        },
        data() {
            return {
                queryForm:{

                },
                tableData: [],
                total: 0,
                pageNo: 1,
                pages: '',
                number:''
            }
        },
        mounted(){
            this.list(this.pageNo)
        },
        methods:{
            handleCurrentChange(val){
                let  param =this.tableData
                this.pageNo=val
                param.page=this.pageNo
                this.list(this.pageNo)
            },
            list(param){
                getPageCommentId(param).then(data=>{
                    this.tableData=data.list
                    this.total=data.total

                    console.log(this.tableData)
                }).catch(error=>{
                    this.$message.error(error)
                })
            },
            del(row){
                this.$confirm('确定要删除'+row.content+' 评论吗？','提示').then(()=>{
                    del (row.id).then(data=>{

                        this.list(this.pageNo)
                    }).catch(error=>{

                        this.$message.error(error)
                    })
                }).catch(error=>{

                })
            },

            update(row){
                this.$confirm('确定通过此条评论吗？','提示').then(()=>{
                    getupdateStatus (row.id).then(data=>{
                        // let param= this.queryForm
                        // param.page =this.pageNo
                        // this.list(param)
                        this.$message.success(data.message)
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