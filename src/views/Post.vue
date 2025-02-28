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
        <!-- <div class="content-html" v-html="sanitizedContent"></div> -->

        <!-- 互动统计 -->
        <div class="action-stats">
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
        </div>
      </article>

      <!-- 评论列表 -->
      <section class="comment-section">
        <h3 class="section-title">全部评论（{{ comments.length }}）</h3>

        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <el-avatar :src="comment.headUrl" :size="36" />
          <div class="comment-content">
            <div class="comment-header">
              <span class="username">{{ comment.nickname }}</span>
              <span class="comment-time">{{ comment.createDate }}</span>
            </div>
            <div class="comment-text">{{ comment.text }}</div>
            <div class="comment-actions">
              <el-button text type="primary" size="small" @click="reply()">
                <!-- <el-icon><ChatDotRound /></el-icon> 回复 -->
              </el-button>
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
          placeholder="请输入评论内容（支持Markdown语法）"
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

const route = useRoute();
const postId = route.params.id;

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
const replyData = ref({
  text: "",
  grade: 0,
  postingId: postId,
});
// 内容消毒
// const sanitizedContent = computed(() => {
//   return DOMPurify.sanitize(postData.value.content);
// });

// const formatTime = (timeStr) => {
//   return new Date(timeStr).toLocaleString();
// };
// 回复评论的回复
const reply = async () => {
  secondReply.value = true;
  replyData.value.grade = 3;
  const res = await addComment(replyData.value);
  console.log(res);

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

  // if(secondReply){
  //   replyData.value.grade = 3;
  //   const res = await getReplyComment(replyId);
  //   console.log(res);
  // }
  replyData.value.grade = 2;
  addCommentData();
  replyData.value.text = "";
  ElMessage.success("评论发表成功");
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
    comments.value = res.data;
    
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

  .section-title {
    font-size: 1.3rem;
    color: @text-color;
    margin-bottom: 20px;
  }

  .comment-item {
    display: flex;
    gap: 15px;
    padding: 15px 0;
    border-bottom: 1px solid @border-color;

    .comment-content {
      flex: 1;

      .comment-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;

        .username {
          font-weight: 500;
          color: @text-color;
        }

        .comment-time {
          color: #666;
          font-size: 0.9em;
        }
      }

      .comment-text {
        color: #444;
        line-height: 1.6;
      }

      .comment-actions {
        margin-top: 10px;
      }
    }
  }

  :deep(.el-pagination) {
    margin-top: 20px;
    justify-content: center;
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
</style>
