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
            <h1 class="title">{{mallData.name}}</h1>
            <el-button type="primary" class="btn-back" @click="back">返回</el-button>
            <div class="product-item">
                <!-- 商品图片区域 -->
                <div class="product-images">
                    <el-carousel indicator-position="none" style="width: 100%;height: 40rem;">
                        <el-carousel-item style="width: 100%;height: 40rem;">
                            <img :src="mallData.imageUrls?.[0]" width="100%" class="head-img">
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <!-- 商品介绍区域 -->
                <div class="product-introduction">
                    <div class="product-title">
                        {{mallData.description}}
                    </div>
                    <span class="product-price">￥{{mallData.price}}</span>
                    <span class="product-condition">发布时间:{{mallData.createDate}}</span>
                    <div class="seller-information">
                        <el-divider content-position="left">卖家信息</el-divider>
                        <div class="seller-name">
                            <el-icon class="info-icon"><User /></el-icon>
                            <span>商家名称:{{mallData.sellerName}}</span>
                        </div>
                        <div class="seller-phone">
                            <el-icon class="info-icon"><Phone /></el-icon>
                            <span>联系电话:{{mallData.mobile}}</span>
                        </div>
                        <div class="seller-qq">
                            <el-icon class="info-icon"><Message /></el-icon>
                            <span>邮箱地址:{{mallData.email}}</span>
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
                <div class="des-content">
                    描述:
                </div>
            </el-card>
        </section>

        <!-- 用户评价区域 -->
        <section class="user-reviews">
            <!-- 用户评价内容 -->
        </section>
    </main>

</template>

<script setup>
    import { ref } from 'vue'
    // import a from '../assets/images/404.png'
    // import b from '../assets/images/brand1.png'
    // import c from '../assets/images/login.png'
    import { useRoute,useRouter } from 'vue-router';
    import { onMounted } from 'vue';
    import { getMallInfoById } from '../api/api';

    const route = useRoute();
    const router = useRouter();
//     const images = ref([ 
//     { url: a, alt: '商品主图1' },
//     { url: b, alt: '商品主图2' },
//     { url: c, alt: '商品主图3' },
// ]);

const commodityId = route.params.id;

onMounted(() => {

      getIdMallInfo();
    //   back();
    
    })


const mallData = ref({name: '', description: '', createDate: '', sellerName: '',imageUrls:"",price:''});
const getIdMallInfo = async ()=>{
      const res = await getMallInfoById(commodityId);
      console.log(res.data);
      mallData.value = res.data;
      
    }


    const back = () => {
      router.push({
       name: 'trade',
       query: {
        id: commodityId
       },

      });
    }

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
    height: 40rem;
    background-color: rgb(221.7, 222.6, 224.4);
 }

 .product-images img {
    width: 100%; 
    height: 100%;
    // object-fit: cover; 
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
  color:#98fb98;
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
</style>