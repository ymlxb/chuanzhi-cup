<template>
  <div class="community-container">
    <!-- 论坛头部 -->
    <header class="community-header">
      <div class="header-content">
        <h1 class="title">绿色生活社区</h1>
        <p class="subtitle">分享可持续生活经验，共建美好家园</p>
        <el-button
          type="success"
          round
          @click="handleNewPost"
          class="post-button"
        >
          <el-icon><EditPen /></el-icon> 发布新话题
        </el-button>
      </div>
    </header>

    <!-- 主要内容区 -->
    <main class="community-main">
      <!-- 分类导航 -->
      <section class="category-nav">
        <el-tabs v-model="activeCategory" @tab-change="handleCategoryChange">
          <el-tab-pane
            v-for="category in categories"
            :key="category.id"
            :label="category.name"
            :name="category.id"
          >
            <template #label>
              <span class="custom-tab">
                <el-icon :size="18" class="tab-icon">
                  <component :is="category.icon" />
                </el-icon>
                {{ category.name }}
              </span>
            </template>
          </el-tab-pane>
        </el-tabs>
      </section>

      <!-- 帖子列表 -->
      <section class="post-list">
        <div v-for="post in filteredPosts" :key="post.id" class="post-item" 
        @mouseenter="showDelete = post.id"
        @mouseleave="showDelete = null"
        >
          <transition name="el-fade-in">
            <el-button 
              v-show="showDelete === post.id"
              class="delete-btn"
              type="danger" 
              icon="el-icon-delete" 
              circle
              @click.stop="handleDelete(post.id)"
            ></el-button>
          </transition>
          <div class="post-avatar">
            <el-avatar :src="post.headImage" :size="50" />
          </div>
          <div class="post-content">
            <h3 class="post-title">
              <el-tag type="success" size="small" class="category-tag">
                {{ post.type.name }}
              </el-tag>
              <router-link :to="`/post/${post.id}`">{{
                post.title
              }}</router-link>
            </h3>
            <div class="post-meta">
              <span class="author">{{ post.nickname }}</span>
              <el-divider direction="vertical" />
              <span class="time">{{ post.createDate }}</span>
              <el-divider direction="vertical" />
              <span class="stat">
                <el-icon><View /></el-icon> {{ post.views }}
              </span>
              <el-divider direction="vertical" />
              <span class="stat">
                <el-icon><ChatLineRound /></el-icon> {{ post.comments }}
              </span>
            </div>
            <p class="post-excerpt">{{ post.excerpt }}</p>
          </div>
        </div>
      </section>

      <!-- 分页 -->
      <!-- <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="100"
          :page-size="10"
          @current-change="handlePageChange"
        />
      </div> -->
    </main>

    <!-- 发帖对话框 -->
    <el-dialog v-model="showDialog" title="发布新话题" width="600px">
      <el-form :model="newPost" label-width="80px">
        <el-form-item label="标题" required>
          <el-input
            v-model="newPost.title"
            placeholder="请输入标题（最多50字）"
          />
        </el-form-item>
        <el-form-item label="分类" required>
          <el-select v-model="newPost.category" placeholder="请选择分类">
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="内容" required>
          <el-input
            v-model="newPost.text"
            type="textarea"
            :rows="5"
            placeholder="请输入详细内容（支持Markdown语法）"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="handleSubmitPost">立即发布</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { ElMessageBox, ElMessage } from 'element-plus'
import {
  Menu,
  RefreshRight,
  Delete,
  MagicStick,
  Sunny,
  Flag,
} from "@element-plus/icons-vue";
import {
  getTopics,
  addPost,
  getPosts,
  getPostDetail,
  deletePost,
} from "@/api/api";

onMounted(() => {
  getPostsData();
});

const categories = ref([
  { id: 1, name: "全部话题", icon: Menu },
  { id: 2, name: "环保技巧", icon: RefreshRight },
  { id: 3, name: "零废弃生活", icon: Delete },
  { id: 4, name: "绿色科技", icon: MagicStick },
  { id: 5, name: "气候行动", icon: Sunny },
  { id: 6, name: "活动召集", icon: Flag },
]);

const posts = ref([
  // {
  //   id: 1,
  //   title: '分享我的家庭堆肥经验，让厨余变黄金！',
  //   category: 2,
  //   categoryName: '环保技巧',
  //   categoryStyle: 'success',
  //   author: '绿色达人',
  //   time: '2024-03-15',
  //   views: 245,
  //   comments: 38,
  //   excerpt: '经过半年的实践，总结出一套适合城市家庭的堆肥方案...',
  //   avatar: 'https://picsum.photos/50/50?1'
  // },
]);

const showDelete = ref(null);
const activeCategory = ref(1);
const showDialog = ref(false);
const newPost = ref({
  title: "",
  category: "",
  text: "",
});

const filteredPosts = computed(() => {
  return activeCategory.value === 1
    ? posts.value
    : posts.value.filter((p) => {
      return activeCategory.value === p.category;
      });
});

// 获取所有帖子
const getPostsData = async () => {
  await getPosts(newPost.value.title).then((res) => {
    console.log(res.data);
    posts.value = res.data;
    console.log(posts.value);
    // if(){}
  });
};

const handleCategoryChange = (val) => {
  console.log("切换分类:", val);
  
  activeCategory.value = val;
  getPostsData();
};

const handleNewPost = () => {
  showDialog.value = true;
  getPostsData()
};

const handleSubmitPost = async () => {
  await addPost(newPost.value).then((res) => {
    console.log(res);
  });
  console.log("提交新帖子:", newPost.value);
  showDialog.value = false;
};

// const formatTime = (createDate) => {
//   return new Date(createDate).toLocaleDateString();
// };

// const handlePageChange = (page) => {
//   console.log("切换页码:", page);
// };

// 删除帖子


const handleDelete = async (postId) => {
  try {
    await ElMessageBox.confirm('确定要删除该帖子吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    
    const res = await deletePost(postId)
    if (res.code === 0) {
      ElMessage.success('删除成功')
      getPostsData()
    }
  } catch (error) {
    ElMessage.info('已取消删除')
  }
};

</script>

<style lang="less" scoped>
@primary-green: #67c23a;
@secondary-green: #85ce61;
@background-light: #f8fff6;

.community-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.community-header {
  background: linear-gradient(
    135deg,
    @primary-green 0%,
    darken(@primary-green, 10%) 100%
  );
  border-radius: 12px;
  padding: 40px 0;
  margin-bottom: 30px;
  color: white;
  text-align: center;

  .header-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .title {
    font-size: 2.5rem;
    margin-bottom: 15px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .subtitle {
    font-size: 1.2rem;
    margin-bottom: 25px;
    opacity: 0.9;
  }

  .post-button {
    padding: 12px 30px;
    font-size: 1.1rem;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
    }
  }
}

.category-nav {
  margin-bottom: 30px;

  :deep(.el-tabs__item) {
    font-size: 1rem;
    padding: 0 25px;
  }

  .custom-tab {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .tab-icon {
    margin-right: 5px;
  }
}

.post-list {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.post-item {
  display: flex;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid #eee;
  transition: all 0.2s ease;

  &:hover {
    background: @background-light;
    transform: translateX(10px);
  }

  .post-avatar {
    flex-shrink: 0;
  }

  .post-content {
    flex-grow: 1;

    .post-title {
      margin: 0 0 10px;
      font-size: 1.2rem;

      a {
        color: #333;
        text-decoration: none;

        &:hover {
          color: @primary-green;
        }
      }
    }

    .category-tag {
      margin-right: 10px;
      vertical-align: middle;
    }

    .post-meta {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 8px;

      .el-divider {
        background-color: #ddd;
      }
    }

    .post-excerpt {
      color: #666;
      line-height: 1.6;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}

.pagination {
  margin-top: 30px;
  text-align: center;
}

.post-item {
  position: relative;
  padding: 15px;
  transition: all 0.3s;
  cursor: pointer;
}

.post-item:hover {
  background: #f5f7fa;
  transform: translateX(5px);
}

.delete-btn {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.delete-btn:hover {
  transform: translateY(-50%) scale(1.1);
}
</style>
