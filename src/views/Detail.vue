<template>
  <header>
    <nav>
      <!-- 导航栏、搜索框和Logo等元素 -->
    </nav>
  </header>

  <!-- 商品详情主体内容 -->
  <main>
    <el-card class="detail-item">
      <!-- 商品标题区域 -->
      <!-- <h1 class="title">{{mallData.name}}</h1> -->
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <!-- 商户信息 -->
        <div class="merchant-info">
          <el-avatar :size="40" :src="avatar" />
          <span class="merchant-name">{{ mallData.sellerName }}</span>
        </div>

        <!-- 操作按钮 -->
        <div class="action-buttons">
          <el-button
            v-if="!backSelect"
            type="primary"
            size="large"
            icon="ChatDotSquare"
            @click="contactSeller"
          >
            联系商家
          </el-button>
          <el-button
            v-if="backSelect"
            type="danger"
            size="large"
            class="btn-back"
            @click="handleDeleteCommodity"
            >删除
          </el-button>
          <el-button
            v-if="backSelect"
            type="primary"
            size="large"
            class="btn-back"
            @click="editInfo"
            >修改
          </el-button>
          <el-button type="primary" size="large" class="btn-back" @click="back"
            >返回
          </el-button>
        </div>
      </div>
      <div class="product-item">
        <!-- 商品图片区域 -->
        <div class="product-images">
          <el-carousel
            indicator-position="outside"
            style="width: 100%; height: 40rem"
          >
            <el-carousel-item
              v-for="(url, index) in mallData.imageUrls"
              :key="index"
              class="carousel-item"
            >
              <div class="image-wrapper">
                <img :src="url" :alt="`商品图片${index + 1}`" />
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 商品介绍区域 -->
        <div class="product-introduction">
          <div class="product-title">
            {{ mallData.name }}
          </div>
          <span class="product-price">￥{{ mallData.price }}</span>
          <span class="product-condition"
            >发布时间:{{ mallData.createDate }}</span
          >
          <div class="seller-information">
            <el-divider content-position="left">卖家信息</el-divider>
            <div class="seller-name">
              <el-icon class="info-icon"><User /></el-icon>
              <span>商家名称:{{ mallData.sellerName }}</span>
            </div>
            <div class="seller-phone">
              <el-icon class="info-icon"><Phone /></el-icon>
              <span>联系电话:{{ mallData.mobile }}</span>
            </div>
            <div class="seller-qq">
              <el-icon class="info-icon"><Message /></el-icon>
              <span>邮箱地址:{{ mallData.email }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 商品详情描述区域 -->
    <section class="product-description">
      <el-card class="des">
        <div class="des-title">商品描述</div>
        <el-divider border-style="dashed" />
        <div class="des-content">描述:{{ mallData.description }}</div>
      </el-card>
    </section>

    <!-- 用户评价区域 -->
    <section class="user-reviews">
      <!-- 用户评价内容 -->
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";
// import a from '../assets/images/404.png'
// import b from '../assets/images/brand1.png'
// import c from '../assets/images/login.png'
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { getMallInfoById, getUserInfo, deleteCommodity as deleteCommodityApi} from "../api/api";
import { ElMessage } from "element-plus";
import { ta } from "element-plus/es/locales.mjs";

const avatar = ref("");

const route = useRoute();
const router = useRouter();

//     const images = ref([
//     { url: a, alt: '商品主图1' },
//     { url: b, alt: '商品主图2' },
//     { url: c, alt: '商品主图3' },
// ]);
const backSelect = route.query.backSelect;
const commodityId = route.params.id;
console.log(backSelect);
// console.log(commodityId);

onMounted(async () => {
  // const res = await getUserInfo();
  // avatar.value = res.data.headImage;
  getIdMallInfo();
  //   back();
});

const mallData = ref({
  name: "",
  description: "",
  createDate: "",
  sellerName: "",
  imageUrls: "",
  price: "",
  tagName: "",
});
const getIdMallInfo = async () => {
  const res = await getMallInfoById(commodityId);
  console.log(res.data);
  mallData.value = res.data;
  avatar.value = res.data.sellerHead;
};

const back = () => {
  if (backSelect) {
    router.push({
      name: "goodsPublish",
    });
  } else {
    router.push({
      name: "trade",
      query: {
        id: commodityId,
      },
    });
  }
};

const handleDeleteCommodity = async () => {
  const res = await deleteCommodityApi(commodityId);
  console.log(res);
  if (res.code === 0) {
    ElMessage.success("删除成功");
    router.push("/person/goodsPublish");
  } else {
    ElMessage.error("删除失败");
  }
};

const editInfo = () => {
  console.log("111");

  router.push({
    name: "editMallInfo",
    query: {
      name: mallData.value.name,
      description: mallData.value.description,
      images: mallData.value.imageUrls,
      price: mallData.value.price,
      mobile: mallData.value.mobile,
      email: mallData.value.email,
      id: mallData.value.id,
      tagName: mallData.value.tagName,
    },
  });
};

const contactSeller = () => {
  const sellerId = mallData.value.id;
  // const productId = mallData.value.id;

  // 跳转到聊天页面并传递参数
  router.push({
    path: "/im",
    query: {
      sellerId,
      // productId
    },
  });
};
</script>

<style lang="less">
.detail-item,
.des {
  width: 100rem;
  margin: 2rem auto;
  padding: 2rem;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  margin: 2rem;
  text-align: center;
  color: #333;
}

.product-item {
  display: flex;
  // justify-content: space-between;
}

.product-images {
  width: 40rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  .carousel-item {
    background: #f5f5f5; // 淡灰色背景
  }

  .image-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(145deg, #ffffff, #f0f0f0); // 渐变背景

    img {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain; // 保持图片比例
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05); // 悬停时轻微放大
      }
    }
  }
}
:deep(.el-carousel__indicators) {
  transform: translateY(1.5rem);

  .el-carousel__button {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: rgba(152, 251, 152, 0.7);
    transition: all 0.3s;

    &:hover {
      background-color: #98fb98;
    }
  }
}

:deep(.el-carousel__arrow) {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
}

.el-carousel__item:nth-child(2n) {
  background-color: rgb(221.7, 222.6, 224.4);
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: rgb(221.7, 222.6, 224.4);
}

.product-introduction {
  margin-left: 2rem;
  width: 50rem;
}

.product-title {
  font-size: 2rem;
  margin: 1.5rem auto;
  line-height: 1.5;
}

.product-price {
  width: 100%;
  color: #98fb98;
  font-size: 2rem;
  display: inline-block;
  //   text-align: center;
  margin-bottom: 1.5rem;
}

.seller-name,
.seller-phone,
.seller-qq {
  margin: 1rem;
  font-size: 1.6rem;
}

.info-icon {
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  color: #fff;
  background-color: skyblue;
  border-radius: 50%;
}

.des-title {
  font-size: 2rem;
  margin: 1.5rem auto;
}

.btn-back {
  right: 2rem;
  margin: 1rem;
}
.des-content {
  font-size: 2rem;
  margin: 2rem auto;
  line-height: 1.5;
}

.merchant-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;

  .merchant-name {
    font-size: 1.6rem;
    color: #333;
    font-weight: 500;
  }
}

.action-buttons {
  display: flex;
  gap: 1rem;

  .btn-back {
    margin: 0; // 覆盖原有margin
  }
}
</style>
