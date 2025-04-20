<template>
  <div class="taobao-chat">
    <!-- 商品信息卡片 -->
    <div v-if="currentProduct" class="product-card">
      <el-card shadow="hover">
        <div class="product-info">
          <img :src="currentProduct.imageUrls[0]" class="product-image" />
          <div class="product-detail">
            <div class="product-name">{{ currentProduct.name }}</div>
            <div class="product-price">¥{{ currentProduct.price }}</div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 聊天窗口 -->
    <div class="chat-window">
      <!-- 聊天头部 -->
      <div class="chat-header">
        <div class="seller-info">
          <el-avatar
            :size="40"
            :src="currentSeller?.sellerHead || avatar"
          />
          <div class="seller-detail">
            <div class="seller-name">
              {{ currentSeller?.shopName || toName }}
            </div>
            <div class="seller-status">
              <span class="status-dot" :class="{ online: isOnline }"></span>
              {{ isOnline ? "在线" : "离线" }}
            </div>
          </div>
        </div>
      </div>

      <!-- 消息区域 -->
      <div v-if="toName" class="message-area" ref="messageContainer">
        <!-- 系统消息 -->
        <!-- <div v-for="name in systemMessages" class="system-message">
          您的好友 {{ name }} 已上线
        </div> -->

        <!-- 聊天消息 -->
        <div v-for="(message, index) in historyMessage" 
            :key="index"
            class="message-item"
            :class="{
              'message-sent': message.fromName === username,
              'message-received': message.fromName !== username
            }">
          <div class="message-content">
            <!-- 左侧头像(接收消息时显示) -->
            <el-avatar
              v-if="message.fromName !== username"
              :size="40"
              :src="message.fromImage || defaultAvatar"
              class="avatar-left"
            />
            <!-- 消息气泡 -->
            <div class="message-bubble">
              <div class="message-text">{{ message.content }}</div>
            </div>
            <!-- 右侧头像(发送消息时显示) -->
            <el-avatar
              v-if="message.fromName === username"
              :size="40"
              :src="avatar"
              class="avatar-right"
            />
          </div>
        </div>
      </div>

      <!-- 底部工具栏和输入区 -->
      <div v-if="toName" class="chat-footer">
        <!-- 工具栏 -->
        <!-- <div class="toolbar">
          <el-button-group>
            <el-button icon="Picture" circle />
            <el-button icon="Promotion" circle />
            <el-button icon="ChatDotRound" circle />
          </el-button-group>
        </div> -->

        <!-- 输入区 -->
        <div class="input-area">
          <el-input
            v-model="sendMessage.content"
            type="textarea"
            :rows="3"
            resize="none"
            placeholder="请输入消息..."
            @keyup.enter.native="submit"
          />
          <el-button
            type="primary"
            class="send-btn"
            :disabled="!sendMessage.content"
            @click="submit"
          >
            发送
          </el-button>
        </div>
      </div>
    </div>

    <!-- 右侧用户列表 -->
    <div class="user-sidebar">
      <el-card class="user-list">
        <template #header>
          <div class="card-header">
            <span>用户</span>
            <el-tag type="success" size="small"
              >{{ friendsList.length }}人</el-tag
            >
          </div>
        </template>
        <el-menu>
          <el-menu-item
            v-for="friend in friendsList"
            :key="friend.username"
            @click="showChat(friend.username)"
          >
            <el-avatar :size="30" :src="friend.headImage || defaultAvatar" />
            <span>{{ friend.username }}</span>
          </el-menu-item>
        </el-menu>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { getUserInfo, getChatList, getMallInfoById } from "@/api/api";
import { useRoute } from "vue-router";
const route = useRoute();
const sellerId = route.query.sellerId;
const webSocket = ref();
const currentSeller = ref(null); 
const currentProduct = ref(null); 

const isShowChat = ref(false);
const chatMes = ref(false);
const isOnline = ref(true);
const username = ref("");
const toName = ref("");
const avatar = ref("");
const sendMessage = ref({
  toName: "",
  fromName: "",
  content: "",
  fromImage:'',
  toImage:''
  // avatar: "",
});
const historyMessage = ref([]);
const friendsList = ref([]);
const systemMessages = ref([]);
const sellerAvatar = ref("");
const defaultAvatar = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
onMounted(() => {
  init();
});

const init = async () => {
  const res = await getUserInfo();
  avatar.value = res.data.headImage;
  username.value = res.data.username;
  sendMessage.value.fromImage = res.data.headImage;
  
  
  //  // 获取URL参数中的卖家和商品信息
  //  const urlParams = new URLSearchParams(window.location.search);
  // const sellerId = urlParams.get('sellerId');
  // const productId = urlParams.get('productId');

  // if(sellerId && productId) {
  //   // 获取卖家信息
  if(sellerId){
    const sellerInfo = await getMallInfoById(sellerId);
    console.log(sellerInfo.data);
    sellerAvatar.value = sellerInfo.data.sellerHead;
    currentSeller.value = sellerInfo.data;
    sendMessage.value.toImage = sellerInfo.data.sellerHead;
  }
  

  
  //   // 获取商品信息
  //   const productInfo = await getProductInfo(productId);
  //   currentProduct.value = productInfo;

  //   // 自动连接该卖家的WebSocket
    connectSellerChat(sellerId);
};

const connectSellerChat = (sellerId) => {
  const wsUrl = `ws://10.102.207.39:8090/chat/chat/${username.value}`;

  if (webSocket.value) {
    webSocket.value.close();
  }

  webSocket.value = new WebSocket(wsUrl);
  webSocket.value.onopen = onOpen;
  webSocket.value.onmessage = onMessage;
  webSocket.value.onclose = onClose;

  // 自动显示聊天窗口
  if(sellerId){
    showChat(currentSeller.value.sellerName);
  }
  
};

const onOpen = () => {
  isOnline.value = true;
  console.log("连接成功");
  if (sellerId && currentSeller.value?.sellerName) {
        showChat(currentSeller.value.sellerName);
      }
};

const onClose = () => {
  isOnline.value = false;
  console.log("连接关闭");
};

const onMessage = (event) => {
  console.log("接收到服务端推送的消息：", event.data);

  // 获取服务端推送过来的消息
  let dataString = event.data;
  // 将 dataString 转换为 json 对象
  let response = JSON.parse(dataString);
  console.log(response);
  
  console.log("服务端推送过来的消息：", response);

  // 判断是否是系统消息
  if (Array.isArray(response)) {
    // 系统消息 好友列表展示
    friendsList.value = response
        .filter(user => user.userName !== username.value)
        .map(user => ({
          username: user.userName,
          headImage: user.headImage || defaultAvatar.value
        }));

      // 如果还没有选择聊天对象，但有商家信息，自动选择商家
      if (!toName.value && currentSeller.value?.sellerName) {
        showChat(currentSeller.value.sellerName);
      }
      
      systemMessages.value = friendsList.value.map(friend => friend.username);
  } else {
    // 非系统消息
    // let history = sessionStorage.getItem(response.fromName);
    // if (!history) {
    //   historyMessage.value = [];
    // }
    // historyMessage.value.push(response);
    // sessionStorage.setItem(
    //   response.fromName,
    //   JSON.stringify(historyMessage.value)
    // );
  }
};

const showChat =async (name) => {
  console.log("开始与用户聊天:", name);
  
  toName.value = name;
  isShowChat.value = true;
  chatMes.value = true;
  const chatList = await getChatList(name);
  console.log("聊天列表", chatList.data);
  historyMessage.value = chatList.data;
  console.log(historyMessage.value);
  // 获取聊天记录
  // const history = sessionStorage.getItem(name);
  // historyMessage.value = history ? JSON.parse(history) : [];

  // 如果是商家，设置商家信息
  const seller = friendsList.value.find(f => f.username === name);
  if (seller) {
    currentSeller.value = {
      sellerName: seller.username,
      sellerHead: seller.headImage,
      shopName: seller.username
    };
    sendMessage.value.toImage = seller.headImage;
  }
};

const submit = () => {
  sendMessage.value.content = sendMessage.value.content.trim();

  if (!sendMessage.value.content) {
    ElMessage.error("请输入聊天内容");
    return;
  }

  sendMessage.value.toName = toName.value;
  sendMessage.value.fromName = username.value;
  // sendMessage.value.avatar = avatar.value;
  console.log("发送的消息：", sendMessage.value.fromName);
  console.log(sendMessage.value);

  historyMessage.value.push(JSON.parse(JSON.stringify(sendMessage.value)));
  sessionStorage.setItem(toName.value, JSON.stringify(historyMessage.value));
  webSocket.value.send(JSON.stringify(sendMessage.value));
  sendMessage.value.content = "";
};
</script>

<style lang="less" scoped>
.taobao-chat {
  display: flex;
  justify-content: center;
  padding: 2rem;
  min-height: 100vh;
  background: #f5f7fa;
  gap: 2rem;
  

  .product-card {
    width: 100%;
    max-width: 300px;
    align-self: flex-start;

    .product-info {
      display: flex;
      gap: 1.5rem;
      padding: 1rem;

      .product-image {
        width: 8rem;
        height: 8rem;
        object-fit: cover;
        border-radius: 4px;
      }

      .product-detail {
        flex: 1;

        .product-name {
          font-size: 1.4rem;
          color: #333;
          margin-bottom: 0.8rem;
        }

        .product-price {
          color: #ff4d4f;
          font-size: 1.8rem;
          font-weight: bold;
        }
      }
    }
  }

  .chat-window {
    flex: 1;
    min-width: 600px;
    max-width: 800px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    height: calc(100vh - 4rem);

    .chat-header {
      padding: 1.6rem;
      border-bottom: 1px solid #f0f0f0;

      .seller-info {
        display: flex;
        align-items: center;
        gap: 1.2rem;

        .seller-detail {
          .seller-name {
            font-size: 1.6rem;
            font-weight: 500;
            color: #333;
          }

          .seller-status {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1.2rem;
            color: #999;

            .status-dot {
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #999;

              &.online {
                background: #52c41a;
              }
            }
          }
        }
      }
    }

    .message-area {
      flex: 1;
      overflow-y: auto;
      padding: 2rem;

      .system-message {
        text-align: center;
        color: #999;
        font-size: 1.2rem;
        margin: 1rem 0;
      }

      .message-item {
        margin-bottom: 2rem;

        .message-content {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          max-width: 70%;
        }

        &.message-received {
          .message-content {
            margin-right: auto;
          }

          .message-bubble {
            background: #f5f7fa;

            .message-text {
              color: #333;
            }
          }
        }

        &.message-sent {
          .message-content {
            margin-left: auto;
            justify-content: flex-end;
          }

          .message-bubble {
            background: #95de64;

            .message-text {
              color: white;
            }
          }
        }

        .message-bubble {
          padding: 1rem 1.5rem;
          border-radius: 8px;
          font-size: 1.4rem;
          line-height: 1.6;
          word-break: break-word;

          .sender-name {
            font-size: 1.2rem;
            color: #999;
            margin-bottom: 0.4rem;
          }

          .message-text {
            font-size: 1.4rem;
            line-height: 1.6;
            word-break: break-word;
          }
        }
      }
    }

    .chat-footer {
      border-top: 1px solid #f0f0f0;
      padding: 1.6rem;

      .toolbar {
        padding-bottom: 1rem;
        border-bottom: 1px solid #f0f0f0;
      }

      .input-area {
        padding-top: 1rem;
        position: relative;

        .el-textarea {
          margin-bottom: 1rem;
        }

        .send-btn {
          position: absolute;
          right: 1rem;
          bottom: 1rem;
          padding: 0.8rem 3rem;
        }
      }
    }
  }

  .user-sidebar {
    width: 250px;

    .user-list {
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .el-menu-item {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }
  }
}
</style>
