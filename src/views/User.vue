<script setup>
import { ref,getCurrentInstance, onMounted } from 'vue'
import axios from 'axios';
const handleClick = () => {
  console.log('click')
}

const tableData = ref([
  
  ])
const {proxy} = getCurrentInstance()
const getTableData =async ()=>{
  let data =await proxy.$api.getTableData()
  tableData.value = data

}
onMounted(()=>{
 getTableData()
})


</script>

<template>
  <div class="user-header">
    <el-button type="primary">新增</el-button>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="请输入">
        <el-input  placeholder="请输入用户名"  />
      </el-form-item>
      <el-form-item >
        <el-button type="primary">搜索</el-button>
      </el-form-item>
    </el-form>

  </div>

  <div class="table">
    <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="date" label="Date"  />
    <el-table-column prop="name" label="Name"  />
    <el-table-column prop="state" label="State"  />
    <el-table-column prop="city" label="City"  />
    <el-table-column prop="address" label="Address"  />
    <el-table-column prop="zip" label="Zip"  />
    <el-table-column fixed="right" label="Operations" min->
      <template #default>
        <el-button type="primary" size="small" @click="handleClick">
          编辑
        </el-button>
        <el-button type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<style scoped lang="less">
 .user-header{
  display: flex;
  justify-content: space-between;
 }
</style>