<template>
    <div v-title data-title="Lyu博客后台 | 标签编辑">
        <el-row :gutter="15">
            <el-form ref="formData" :model="formData" :rules="rules" size="medium" label-width="100px">
                <el-col >
                    <el-form-item label="账号" prop="tagName">
                        <el-input v-model="formData.tagName"  placeholder="请输入账号" clearable :style="{width: '100%'}"></el-input>
                    </el-form-item>
                </el-col>

                <el-col >
                    <el-form-item>
                        <el-button @click="close">取消</el-button>
                        <el-button type="primary" :loading="loading" @click="submitForm">保存</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </div>
</template>

<script>
    import {update} from "@/api/tag";

    export default {
        name: "Edit",
        props:['data'],
        data(){
            return{
                formData: {
                    id: '',
                    tagName: '',

                },
                loading: false,
                rules: {
                    tagName: [{required: true, message: '请输入标签名称', trigger: 'blur'}],

                }
            }
        },
        created(){
           this.formData = JSON.parse(JSON.stringify(this.data))
        },
        methods:{
            submitForm(){
                this.$refs['formData'].validate(valid=>{
                    if (valid) {
                        this.loading=true
                        update(this.formData).then(data=>{
                            this.loading=false
                            this.$refs['formData'].resetFields()
                            this.$emit("after")
                            this.$emit("hideDialog")
                        }).catch(error=>{
                            this.loading=true
                            this.$message.error(error)
                        })
                    }
                })
            },
            close(){
                this.$emit("hideDialog")
            }
        }
    }
</script>

<style scoped>

</style>