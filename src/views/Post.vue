<template>
  <div class="post-detail-container">
    <!-- 返回导航 -->
    <div class="nav-back">
      <el-button type="info" plain @click="$router.go(-1)">
        <el-icon><ArrowLeft /></el-icon> 返回列表
      </el-button>
    </div>

    <!-- 主内容区 -->
    <div v-loading="loading" class="main-content">
      <!-- 帖子头部 -->
      <header class="post-header">
        <h1 class="post-title">{{ postData.title }}</h1>
        <div class="post-meta">
          <div class="author-info">
            <el-avatar :src="postData.baseUser.headUrl" :size="40" />
            <div class="meta-text">
              <span class="author-name">{{ postData.baseUser.name }}</span>
              <span class="post-time">{{ postData.createDate }}</span>
            </div>
          </div>
          <el-tag :type="success" effect="plain">
            {{ postData.type.name }}
          </el-tag>
        </div>
      </header>

      <!-- 帖子内容 -->
      <article class="post-content">
        <div class="content-html">{{ postData.text }}</div>

        <!-- 互动统计 -->
        <!-- <div class="action-stats">
          <span class="stat-item">
            <el-icon><View /></el-icon> {{ postData.views }} 浏览
          </span>
          <span class="stat-item">
            <el-icon><ChatLineRound /></el-icon>
            {{ postData.commentCount }} 评论
          </span>
          <span class="stat-item">
            <el-icon><Star /></el-icon> {{ postData.likes }} 点赞
          </span>
        </div> -->
      </article>

      <!-- 评论列表 -->
      <section class="comment-section">
        <h3 class="section-title">全部评论（{{ comments.length }}）</h3>

        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <div class="comment-left">
            <el-avatar :src="comment.headUrl" :size="40" />
            <div class="comment-user-info">
              <div class="user-meta">
                <span class="username">{{ comment.nickname }}</span>
                <el-tag size="small" effect="plain" class="user-role">环保达人</el-tag>
              </div>
              <div class="user-stats">
                <!-- <span class="stat-item">
                  <el-icon><ChatLineRound /></el-icon> 
                  {{ comment.commentCount || 0 }}
                </span>
                <span class="stat-item">
                  <el-icon><Star /></el-icon> 
                  {{ comment.likeCount || 0 }}
                </span> -->
                <span class="floor">帖子楼层数:{{ comment.levelNumber -1 }}</span>
              </div>
            </div>
          </div>
          
          <div class="comment-content">
            <div class="comment-header">
              <div class="comment-meta">
                <span class="comment-time">
                  <el-icon><Clock /></el-icon> 
                  {{ comment.createDate }}
                </span>
                <span class="comment-ip" v-if="comment.ip">
                  <el-icon><Location /></el-icon> 
                  来自 {{ comment.ip }}
                </span>
              </div>
              <div class="comment-actions">
                <el-button
                  text
                  type="danger"
                  size="small"
                  v-if="comment.author"
                  @click="deleteCom(comment.id)"
                >
                  <el-icon><Delete /></el-icon> 删除
                </el-button>
              </div>
            </div>
            
            <div class="comment-text">{{ comment.text }}</div>
            
            <div class="comment-footer">
              <div class="comment-tags" v-if="comment.tags && comment.tags.length">
                <el-tag 
                  v-for="tag in comment.tags" 
                  :key="tag"
                  size="small"
                  effect="plain"
                  class="tag-item"
                >
                  {{ tag }}
                </el-tag>
              </div>
              
              <div class="comment-images" v-if="comment.images && comment.images.length">
                <el-image
                  v-for="(img, index) in comment.images"
                  :key="index"
                  :src="img"
                  :preview-src-list="comment.images"
                  fit="cover"
                  class="comment-image"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <!-- <el-pagination
          background
          layout="prev, pager, next"
          :total="totalComments"
          :page-size="10"
          @current-change="handlePageChange"
        /> -->
      </section>

      <!-- 发表评论 -->
      <section class="comment-editor">
        <h3 class="section-title">发表你的评论</h3>
        <el-input
        ref="commentInput"
          v-model="replyData.text"
          type="textarea"
          :rows="4"
          placeholder="请输入评论内容"
          maxlength="500"
          show-word-limit
        />
        <div class="editor-actions">
          <el-button type="primary" @click="submitComment">
            <el-icon><Promotion /></el-icon> 提交评论
          </el-button>
        </div>
      </section>
    </div>
  </div>

   <!-- 回复对话框 -->
   <!-- <el-dialog
    v-model="dialogVisible"
    title="回复评论"
    width="500px"
    :close-on-click-modal="false"
  >
    <div class="reply-dialog-content">
      <div class="original-comment" v-if="currentComment">
        <div class="comment-info">
          <el-avatar :src="currentComment.headUrl" :size="30" />
          <span class="username">{{ currentComment.nickname }}</span>
        </div>
        <div class="comment-text">{{ currentComment.text }}</div>
      </div>
      <el-input
        v-model="replyContent"
        type="textarea"
        :rows="4"
        placeholder="请输入回复内容"
        maxlength="500"
        show-word-limit
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitReply">
          提交回复
        </el-button>
      </span>
    </template>
  </el-dialog> -->
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import {
  getPostDetail,
  getPostReply,
  getReplyReply,
  addReply,
  deleteReply,
  getPostComment,
  getReplyComment,
  addComment,
  deleteComment,
} from "@/api/api";
// import DOMPurify from "dompurify";
import {
  ArrowLeft,
  View,
  ChatLineRound,
  Star,
  ChatDotRound,
  Delete,
  Promotion,
} from "@element-plus/icons-vue";
import axios from "axios";
import { filter } from "lodash";

const route = useRoute();
const postId = route.params.id;
const dialogVisible = ref(false); 
const currentComment = ref(null); 
const replyContent = ref('');
const postData = ref({
  id: postId,
  title: "如何在家实现零废弃生活？",
  text: "这里放帖子内容，支持**Markdown**格式...",
  baseUser: {
    id: 1,
    name: "环保达人",
    headUrl: "https://picsum.photos/40/40?user=1",
  },
  type: {
    id: 3,
    name: "零废弃生活",
    color: "success",
  },
  createTime: "2024-03-20T14:30:00",
  views: 245,
  likes: 89,
  commentCount: 15,
});

const comments = ref([
  {
    id: 1,
    text: "非常实用的经验分享！",
    type: {
      id: 2,
      name: "绿色生活家",
      avatar: "https://picsum.photos/40/40?user=2",
    },
    createTime: "2024-03-20T15:00:00",
    isAuthor: false,
  },
]);

const loading = ref(true);
// const text = ref("");
const totalComments = ref(15);
// const grade = ref();
const secondReply = ref(false);
const commentInput = ref(null);
const replyData = ref({
  text: "",
  grade: 0,
  postingId: postId,
});
// 内容消毒
// const sanitizedContent = computed(() => {
//   return DOMPurify.sanitize(postData.value.text);
// });

// const formatTime = (timeStr) => {
//   return new Date(timeStr).toLocaleString();
// };
// 回复评论的回复
const reply = async (comment) => {
  currentComment.value = comment;
  dialogVisible.value = true;
  replyContent.value = '';
  secondReply.value = true;
  replyData.value.grade = 3;
  // const res = await addComment(replyData.value);
  // console.log(res);

//   if (res.code === 0) {
//     comments.value[index].children.unshift({
//       id: Date.now(),
//       text: text.value,
//       user: {
//         id: 3,
//         name: "当前用户",
//         avatar: "https://picsum.photos/40/40?user=3",
//       },
//       createDate: new Date().toISO
// });
//   }}
}
const submitComment = () => {
  if (!replyData.value.text.trim()) {
    ElMessage.warning("评论内容不能为空");
    return;
  }

  
    replyData.value.grade = 2;
    addCommentData();
    replyData.value.text = "";
    ElMessage.success("评论发表成功");
    getPostDetailData();

  
};

// const handlePageChange = (page) => {
//   console.log("加载第", page, "页评论");
// };

// 帖子详情信息
const getPostDetailData = async () => {
  const res = await getPostDetail(postId);
  console.log(res);

  if (res.code === 0) {
    postData.value = res.data;
  }
};

// 帖子评论信息
const getPostCommentData = async () => {
  const res = await getPostReply(postId);
  console.log(res);

  if (res.code === 0) {
    comments.value = res.data.filter((item) => {
      return item.grade === 2;
    });
    
  }
};


// 添加回复
const addCommentData = async () => {
  const res = await addReply(replyData.value);
  console.log(res);

  if (res.code === 0) {
    comments.value.unshift({
      id: Date.now(),
      text: text.value,
      user: {
        id: 3,
        name: "当前用户",
        avatar: "https://picsum.photos/40/40?user=3",
      },
      createDate: new Date().toISOString(),
      isAuthor: true,
    });

    text.value = "";
    ElMessage.success("评论发表成功");
  }
};

// 删除评论
const deleteCom = async (replyId) => {
  const res = await deleteComment(replyId);
  console.log(res);

  if (res.code === 0) {
    comments.value = comments.value.filter((item) => item.id !== replyId);
    ElMessage.success("评论删除成功");
  }
};

// const submitReply = async () => {
//   if (!replyContent.value.trim()) {
//     ElMessage.warning("回复内容不能为空");
//     return;
//   }

//   if (!currentComment.value) {
//     ElMessage.error("回复对象不存在");
//     return;
//   }

//   try {
//     const replyData = {
//       text: replyContent.value,
//       grade: 3,
//       postingId: postId,
//       replyId: currentComment.value.id
//     };

//     const res = await addComment(replyData);
    
//     if (res.code === 0) {
//       ElMessage.success("回复成功");
//       dialogVisible.value = false;
//       // 刷新评论列表
//       await getPostCommentData();
//     }
//   } catch (error) {
//     console.error('回复失败:', error);
//     ElMessage.error("回复失败，请重试");
//   }
// };

onMounted(() => {
  getPostDetailData();
  getPostCommentData();
  setTimeout(() => {
    loading.value = false;
  }, 800);
});
</script>

<style lang="less" scoped>
@primary-green: #67c23a;
@text-color: #2c3e50;
@border-color: #eaeaea;

.post-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px;

  .nav-back {
    margin-bottom: 30px;
  }

  .main-content {
    background: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  }
}

.post-header {
  margin-bottom: 30px;
  border-bottom: 1px solid @border-color;
  padding-bottom: 20px;

  .post-title {
    font-size: 2rem;
    color: @text-color;
    margin-bottom: 15px;
  }

  .post-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .author-info {
      display: flex;
      align-items: center;
      gap: 12px;

      .meta-text {
        display: flex;
        flex-direction: column;

        .author-name {
          font-weight: 500;
          color: @text-color;
        }

        .post-time {
          font-size: 0.9em;
          color: #666;
        }
      }
    }
  }
}

.post-content {
  margin: 30px 0;
  line-height: 1.8;

  :deep(.content-html) {
    h2,
    h3 {
      color: @primary-green;
      margin: 1.2em 0 0.8em;
    }

    img {
      max-width: 100%;
      border-radius: 8px;
      margin: 15px 0;
    }

    code {
      background: #f5f7fa;
      padding: 2px 6px;
      border-radius: 4px;
    }

    pre {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      overflow-x: auto;
    }
  }

  .action-stats {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid @border-color;
    display: flex;
    gap: 25px;
    color: #666;

    .stat-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }
}

.comment-section {
  margin-top: 40px;
  background: #fff;
  border-radius: 8px;
  padding: 20px;

  .section-title {
    font-size: 1.6rem;
    color: @text-color;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid @border-color;
  }

  .comment-item {
  display: flex;
  gap: 20px;
  padding: 20px;
  margin-bottom: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f2f5;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .comment-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    
    .comment-user-info {
      text-align: center;
      
      .user-meta {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        
        .username {
          font-weight: 500;
          color: @text-color;
        }
        
        .user-role {
          font-size: 0.8rem;
        }
      }
      
      .user-stats {
        margin-top: 8px;
        display: flex;
        gap: 8px;
        font-size: 0.9rem;
        color: #666;
        
        .stat-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }
  }

  .comment-content {
    flex: 1;

    .comment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;

      .comment-meta {
        display: flex;
        gap: 15px;
        color: #8c8c8c;
        font-size: 0.9rem;

        .comment-time, .comment-ip {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }

    .comment-text {
      font-size: 1.4rem;
      line-height: 1.8;
      color: #333;
      margin-bottom: 15px;
      word-break: break-word;
    }

    .comment-footer {
      margin-top: 15px;

      .comment-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 12px;

        .tag-item {
          font-size: 0.9rem;
        }
      }

      .comment-images {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 8px;
        margin-top: 12px;

        .comment-image {
          width: 100px;
          height: 100px;
          border-radius: 8px;
          object-fit: cover;
          cursor: pointer;
          transition: transform 0.3s ease;

          &:hover {
            transform: scale(1.05);
          }
        }
      }
    }
  }
}
}

:deep(.el-button--text.el-button--danger) {
  padding: 6px 12px;
  border-radius: 4px;

  &:hover {
    background: rgba(245, 108, 108, 0.1);
  }

  .el-icon {
    margin-right: 4px;
  }
}

.comment-editor {
  margin-top: 40px;

  .section-title {
    font-size: 1.3rem;
    color: @text-color;
    margin-bottom: 15px;
  }

  .editor-actions {
    margin-top: 15px;
    text-align: right;
  }
}

.reply-dialog-content {
  .original-comment {
    background: #f5f7fa;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;

    .comment-info {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;

      .username {
        font-weight: 500;
        color: @text-color;
      }
    }

    .comment-text {
      color: #666;
      font-size: 14px;
      line-height: 1.6;
    }
  }
}

:deep(.el-dialog__body) {
  padding: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
