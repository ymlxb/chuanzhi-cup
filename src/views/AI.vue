<template>
  <div class="ai-chat-container">
    <div class="chat-header">
      <h2>AI环保助手</h2>
      <el-tag type="success" effect="dark">在线</el-tag>
    </div>

    <div class="chat-content" ref="chatContent">
      <div v-for="(message, index) in chatMessages" 
           :key="index" 
           class="message-item"
           :class="{ 'user-message': message.isUser }">
        <div class="avatar">
          <el-avatar 
            :size="40"
            :src="message.isUser ? userAvatar : aiAvatar"
          />
        </div>
        <div class="message-content">
          <div class="message-bubble" >{{ message.content }}</div>
          <div class="message-time">{{ formatTime(message.time) }}</div>
        </div>
      </div>

      <div v-if="loading" class="loading-message">
        <el-icon class="rotating"><Loading /></el-icon>
        AI正在思考中...
      </div>
    </div>

    <div class="chat-input">
      <el-input
        v-model="inputMessage"
        type="textarea"
        :rows="3"
        placeholder="请输入您的问题（例如：如何进行垃圾分类？）"
        :disabled="loading"
        @keyup.enter.ctrl="handleSend"
      >
        <template #append>
          <el-button 
            type="primary" 
            :loading="loading"
            @click="handleSend"
          >
            发送
          </el-button>
        </template>
      </el-input>
      <div class="input-tips">
        提示：按 Ctrl + Enter 快捷发送
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
import { getAIChat,getUserInfo } from '@/api/api'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import aiAvatarImg from '../assets/images/Logo.png'

// 状态管理
const chatMessages = ref([])
const inputMessage = ref('')
const loading = ref(false)
const chatContent = ref(null)
const userAvatar = ref('')
const aiAvatar = ref(aiAvatarImg)

// 初始欢迎消息
onMounted(async () => {
  const res = await getUserInfo();
  userAvatar.value = res.data.headImage || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  addMessage({
    content: '你好！我是你的AI环保助手。我可以帮你解答环保相关的问题，比如垃圾分类、节能减排、可持续生活方式等。请随时向我提问！',
    isUser: false,
    time: new Date()
  })
})

// 发送消息
const handleSend = async () => {
  const message = inputMessage.value.trim()
  console.log(message);
  
  if (!message) {
    ElMessage.warning('请输入内容')
    return
  }
  if (loading.value) return

  // 添加用户消息
  addMessage({
    content: message,
    isUser: true,
    time: new Date()
  })
  
  inputMessage.value = ''
  loading.value = true

  try {
    const response = await getAIChat(message)
    console.log(response);
    
    if (response) {
      addMessage({
        content: response,
        isUser: false,
        time: new Date()
      })
    } else {
      throw new Error('获取回答失败')
    }
  } catch (error) {
    console.error('AI响应错误:', error)
    ElMessage.error('抱歉，AI助手暂时无法回答，请稍后再试')
    addMessage({
      content: '抱歉，我现在无法回答您的问题。请稍后再试。',
      isUser: false,
      time: new Date()
    })
  } finally {
    loading.value = false
  }
}

// 添加消息到列表
const addMessage = (message) => {
  chatMessages.value.push(message)
  console.log(chatMessages.value);
  
  scrollToBottom()
}

// 滚动到底部
const scrollToBottom = async () => {
  await nextTick()
  const container = chatContent.value
  if (container) {
    container.scrollTop = container.scrollHeight
  }
}

// 格式化消息内容（支持Markdown）
const formatMessage = (content) => {
  const html = marked(content)
  return DOMPurify.sanitize(html)
}

// 格式化时间
const formatTime = (time) => {
  return new Date(time).toLocaleTimeString()
}
</script>

<style lang="less" scoped>
.ai-chat-container {
  width: 80%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 8rem); 
  background: #f5f7fa;
  border-radius: 1.2rem; 
  overflow: hidden;
  box-shadow: 0 4px 2rem rgba(0, 0, 0, 0.1); 
  margin:0 auto; 

  .chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2.4rem 3rem; 
    background: #fff;
    border-bottom: 1px solid #e4e7ed;

    h2 {
      margin: 0;
      color: #303133;
      font-size: 2.4rem; 
      font-weight: 600;
    }

    .el-tag {
      padding: 6px 12px; 
      font-size: 1.4rem;
    }
  }

  .chat-content {
    flex: 1;
    padding: 3rem;
    overflow-y: auto;

    .message-item {
      display: flex;
      margin-bottom: 3rem; 
      
      .avatar {
        .el-avatar {
          width: 45px; 
          height: 45px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
      }

      &.user-message {
        flex-direction: row-reverse;
        
        .message-bubble {
          background: #95de64;
          margin-left: auto;
          margin-right: 15px;
          
          &::before {
            right: -8px;
            border-left-color: #95de64;
          }
        }
      }

      .message-content {
        max-width: 75%;
        
        .message-bubble {
          position: relative;
          padding: 16px 2rem; 
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          margin-left: 15px;
          font-size: 16px; 
          line-height: 1.6;
          
          &::before {
            content: '';
            position: absolute;
            top: 15px;
            left: -8px;
            border: 8px solid transparent;
            border-right-color: #fff;
          }
        }
        
        .message-time {
          margin-top: 8px;
          font-size: 13px;
          color: #909399;
          padding: 0 12px;
        }
      }
    }

    .loading-message {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #909399;
      font-size: 16px;
      padding: 2rem;
      
      .rotating {
        font-size: 2rem;
        animation: rotate 1s linear infinite;
      }
    }
  }

  .chat-input {
    padding: 25px 3rem; 
    background: #fff;
    border-top: 1px solid #e4e7ed;

    :deep(.el-textarea__inner) {
      font-size: 16px; 
      line-height: 1.6;
      padding: 12px 15px;
      min-height: 8rem !important;
    }

    :deep(.el-button) {
      padding: 12px 2.4rem;
      font-size: 16px;
      height: auto;
    }

    .input-tips {
      margin-top: 1rem;
      font-size: 13px;
      color: #909399;
      text-align: right;
    }
  }
}

// 自定义滚动条样式
.chat-content {
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(144, 147, 153, 0.3);
    border-radius: 4px;
    
    &:hover {
      background-color: rgba(144, 147, 153, 0.5);
    }
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>