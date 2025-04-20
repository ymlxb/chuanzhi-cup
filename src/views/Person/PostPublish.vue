<template>
  <div class="post-publish-container">
    
      <div class="header">
        <div class="card-header">
          <span class="title">发帖记录</span>
          <el-input
            v-model="searchKeyword"
            placeholder="搜索帖子标题"
            class="search-input"
            clearable
            @clear="handleSearch"
            @keyup.enter="handleSearch"
          >
            <template #suffix>
              <el-icon style="cursor: pointer;" @click="handleSearch">
                <Search />
              </el-icon>
            </template>
          </el-input>
        </div>
      </div>

      <el-table
        v-loading="loading"
        :data="postList"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column prop="title" label="标题" min-width="200">
          <template #default="{ row }">
            <router-link 
              :to="{ name: 'post', params: { id: row.id }}"
              class="post-title"
            >
              {{ row.title }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="type.name" label="分类" width="120" />
        <el-table-column prop="createDate" label="发布时间" width="180">
          
        </el-table-column>
        <el-table-column prop="totalLevelNumber" label="评论数" width="100" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <!-- <el-button 
              link 
              type="primary" 
              size="small" 
              @click="handleEdit(row)"
            >
              编辑
            </el-button> -->
            <el-button 
              link 
              type="danger" 
              size="small" 
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 50]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
   
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { getPost, deletePost } from '@/api/api'

const router = useRouter()
const loading = ref(false)
const postList = ref([])
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 获取帖子列表
const getPostList = async () => {
  try {
    loading.value = true
    const params = {
      currentPage: currentPage.value,
      pageSize: pageSize.value,
      title: searchKeyword.value
    };
    const res = await getPost(params)
    console.log(res);
    
    if (res.code === 0) {
      postList.value = res.data
      total.value = res.data.total
    }
  } catch (error) {
    console.error('获取帖子列表失败:', error)
    ElMessage.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  currentPage.value = 1
  getPostList()
}

// 编辑帖子
// const handleEdit = (row) => {
//   router.push({
//     name: 'post',
//     params: { id: row.id }
//   })
// }

// 删除帖子
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      '确定要删除该帖子吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    const res = await deletePost(row.id)
    if (res.code === 0) {
      ElMessage.success('删除成功')
      getPostList()
    }
  } catch (error) {
    if (error === 'cancel') return
    console.error('删除帖子失败:', error)
    ElMessage.error('删除失败')
  }
}

// 分页相关
const handleSizeChange = (val) => {
  pageSize.value = val
  getPostList()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  getPostList()
}

onMounted(() => {
  getPostList()
})
</script>

<style lang="less" scoped>
.post-publish-container {
  padding: 20px;
 
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ebeef5;
    
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    .title {
      font-size: 18px;
      font-weight: bold;
      color: #303133;
    }
    
    .search-input {
      width: 300px;
    }
  }
  
  .post-title {
    color: #409eff;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

 
}
</style>