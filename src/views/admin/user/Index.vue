<template>
    <div v-title data-title="Lyu博客后台 | 用户管理">
        <div>
            <el-form :inline="true" ref="queryForm" :model="queryForm" label-width="80px">
                <el-form-item>
                    <el-input v-model="queryForm.userName" placeholder="按用户名查询"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="queryForm.nickName" placeholder="按名称查询"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click="search" type="primary" >查询</el-button>
                    <el-button icon="el-icon-plus" @click="add" type="success" >新增</el-button>
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
                    prop="userName"
                    label="用戶名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="nickName"
                    label="昵称">
            </el-table-column>

            <el-table-column
                    prop="email"
                    label="邮箱">
            </el-table-column>
            <el-table-column
                    prop="createDate"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态" >
            </el-table-column>


            <el-table-column
                   align="center"
                   width="150"
                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" size="small" type="primary" icon="el-icon-edit"></el-button>
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

        <el-dialog :visible.sync="addVisble" v-if="addVisble" :close-on-click-modal="false">
            <Add @after="addseach" @hideDialog="hidden"></Add>
        </el-dialog>

        <el-dialog :visible.sync="editVisble" v-if="editVisble" :close-on-click-modal="false">
            <Edit @after="search" :data="formData" @hideDialog="hidden"></Edit>
        </el-dialog>
    </div>
</template>

<script>
    import {query,del} from "../../../api/user";
    import Add from './Add'
    import Edit from './Edit'

    export default {
        name: "Index",
        components:{
          Add,Edit
        },
        data() {
            return {
                queryForm:{
                    userName:'',
                    nickName:''
                },
                tableData: [],
                total: 0,
                pageNo: 1,
                pages: '',
                formData: {},
                addVisble: false,
                editVisble: false
            }
        },
        mounted(){
            this.list({"page":this.pageNo})
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
                    this.tableData=data.list
                    this.total=data.total

                }).catch(error=>{
                    this.$message.error(error)
                })
            },
            del(row){
                this.$confirm('确定要删除'+row.userName+'用户吗？','提示').then(()=>{
                    del (row.id).then(data=>{
                        let param= this.queryForm
                        param.page =this.pageNo
                        this.list(param)
                    }).catch(error=>{

                        this.$message.error(error)
                    })
                }).catch(error=>{

                })
            },
            add(){
                this.addVisble=true
            },
            edit(row){
                this.editVisble=true
                this.formData=row
            },
            addseach(){
                let  param =this.queryForm
                param.page=this.pageNo
                this.list(param)
                query(param).then(data=>{
                    this.pages=data.pages
                    this.handleCurrentChange(this.pages)
                }).catch(error=>{
                    this.$message.error(error)
                })
            },
            hidden(){
                this.addVisble=false
                this.editVisble=false
            }
        }
    }
</script>

<style scoped>

</style>