<template>
  <div class="contain">
    <header class="header">
      <div class="navigation" >
        <div class="navigation-box" v-for="(item,index) in topList" :key="index" @mouseover="handleMouseOver">
          <a href="" class="link" @click="link">
            <span class="text">{{ item }}</span>
          </a>
        </div>

        <div class="search">
          <input type="text" class="search_input"  placeholder="笔记本电脑"></input>
          <button class="search_btn" @click="search">搜索</button>
        </div>
        <div class="toolbar">
          <div class="toolbar-item">
            <a href="/Mall">
              <div>
                <el-icon class="toolbar-item--icon" size="2.5rem"><CirclePlus /></el-icon>
              </div>
              <span class="toolbar-content">发闲置</span>
            </a>
          </div>
          

        </div>
      </div>
    </header>
    <div class="messageBox" :style="{display:showMessageBox ? 'block' : 'none'}" @mouseleave="showMessageBox = false">
      <div class="messageBox-box">
        <div class="messageBox-box-item" 
            v-for="(item,index) in MessageNewList" 
            :key="index"
            @click="goToDetail(item.id)"
        >
          <img :src="item.imageUrls?.[0]" alt="" class="messageBox-box-item-image">
          <p class="messageBox-box-item-name">{{ item.name }}</p>
          <p class="messageBox-box-item-price">¥{{ item.price }}</p>
        </div>
      </div>
    </div>
    
    <main>
      <section class="contents">
        <el-card style="width: 100%;border-radius: 1rem;">
          <div style="display: flex;justify-content: space-around;">
            <div class="contents-item">
              <div class="contents-item-box" v-for="(item,index) in list" :key="index">
                <div class="contents-item--icon margin-left-1" >
                  <component class="icons" :is="item.icon"></component>
                </div>
                <div class="contents-item--text margin-left-1">
                  <router-link :to="`/search?name=${item.name}`">
                    <span class="contents-item--text-title margin-left-1">{{ item.name }}</span>
                  </router-link>
                </div>
                <el-icon class="icon-right"><ArrowRight /></el-icon>
              </div>
            </div>
            <div class="contents-images">
              <el-carousel class="contents-images-box" >
                <el-carousel-item v-for="item in headerImage" :key="item" >
                  <img :src="item.url" width="100%" class="contents-images-box" />
                </el-carousel-item>
              </el-carousel>
              
            </div>
          </div>
          
          
          
        </el-card>
      </section>

      <section class="show">
        <el-card style="width: 100%;border-radius: 1rem;">
          <div class="show-item">
            <div class="show-item-nav">
                <div 
                v-for="(item,index) in items" :key="index"
                :class="['show-item-nav-box', { 'active': activeIndex === index }]"
                @click="changeCom(index)"
              >
              <router-link ></router-link>
                <span>{{ item.name }}</span>
              </div>
            </div>
            <div class="show-item-contain">
              <!-- <IdleComponent/>
              <PhoneComponent/>
              <LaptopComponent/>
              <DigitalComponentVue/>
              <BookComponentVue/>
              <TrafficComponent/>
              <SportComponent/> --> 
              <!-- <el-tabs type="border-card">
                <el-tab-pane label="数码">User</el-tab-pane>
                <el-tab-pane label="服饰鞋帽">Config</el-tab-pane>
                <el-tab-pane label="家具电器">Role</el-tab-pane>
                <el-tab-pane label="家居生活">Task</el-tab-pane>
                <el-tab-pane label="图书音像">Config</el-tab-pane>
                <el-tab-pane label="宠物花卉">Role</el-tab-pane>
                <el-tab-pane label="文玩玉翠">Task</el-tab-pane>
                <el-tab-pane label="汽摩生活">Task</el-tab-pane>
                <el-tab-pane label="美容彩妆">Config</el-tab-pane>
                <el-tab-pane label="模玩动漫">Role</el-tab-pane>
                <el-tab-pane label="其他">Task</el-tab-pane>
              </el-tabs> -->
              <component :is="currentComponent" >
                <div class="show-item-box" v-for="item in newList" :key="item.id"  >
                  <router-link :to="`/Detail/${item.id}`">
                    <!-- <div v-for="url in item.imageUrls">
                     
                    </div> -->
                    <img v-img-laze="item.imageUrls?.[0]"  alt="" class="show-item-box-image">
                    <span class="show-item-box-introduction">{{item.description}}</span>
                    <span class="show-item-box-price">¥{{ item.price }}</span>
                  </router-link>
                </div>
              </component>
            </div>
          </div>
        </el-card>
      </section>
    </main>
  </div>

</template>

<script setup>
    import PetsPlantsComponent from '../components/PetsPlantsComponent.vue';
    import AntiqueJadeComponent from '../components/AntiqueJadeComponent.vue';
    import HomeLivingComponent from '../components/HomeLivingComponent.vue';
    import DigitalComponent from '../components/DigitalComponent.vue';
    import BookComponent from '../components/BookComponent.vue';
    import TrafficComponent from '../components/TrafficComponent.vue';
    import BeautyMakeupComponent from '../components/BeautyMakeupComponent.vue';
    import ClothingShoesHatsComponent from '../components/ClothingShoesHatsComponent.vue';
    import ModelToysAnimationComponent from '../components/ModelToysAnimationComponent.vue';
    import OtherCategoryComponent from '../components/OtherCategoryComponent.vue';
    import FurnitureAppliancesComponent from '../components/FurnitureAppliancesComponent.vue';
    import IdleComponent from '../components/IdleComponent.vue';
    import SportComponent from '../components/SportComponent.vue';
    import home1 from '../assets/images/home1.png';
    import home2 from '../assets/images/home2.png';
    import home3 from '../assets/images/home3.png';
    import { reactive, shallowRef,ref, markRaw, onMounted } from 'vue';
    import { useRoute,useRouter } from 'vue-router';
    import { throttle } from 'lodash';
    import request from '@/utils/request';
    import axios from 'axios';
    import {getAllMallInfo,searchMallInfoByName,searchMallInfoByTag,} from '@/api/api'
    import { ElMessage } from 'element-plus';
    const route = useRoute();
    const router = useRouter();
    const number = ref(0);
    const showMessageBox = ref(false);
    const topList = reactive(['数码','图书音像','宠物花卉','美容彩妆','运动健身',])
    const hoveredText = ref('');

    const headerImage = [{ url: home1 }, { url: home2 }, { url: home3 }];

    const list = reactive([
      {name:'数码',icon:'Monitor'},
      {name:'服饰鞋帽',icon:'Paperclip'},
      {name:'汽摩生活',icon:'Bicycle'},
      {name:'家居生活',icon:'Printer'},
      {name:'图书音像',icon:'Collection'},
      {name:'运动健身',icon:'Baseball'},
      {name:'家具电器',icon:'Goods'},
    ])
    
    let items = reactive([
      {name:'闲置好物',components:markRaw(IdleComponent)},
      {name:'数码',components:markRaw(DigitalComponent)},
      {name:'服饰鞋帽',components:markRaw(ClothingShoesHatsComponent)},
      {name:'家具电器',components:markRaw(FurnitureAppliancesComponent)},
      {name:'家居生活',components:markRaw(HomeLivingComponent)},
      {name:'图书音像',components:markRaw(BookComponent)},
      {name:'宠物花卉',components:markRaw(PetsPlantsComponent)},
      {name:'文玩玉翠',components:markRaw(AntiqueJadeComponent)},
      {name:'汽摩生活',components:markRaw(TrafficComponent)},
      {name:'运动健身',components:markRaw(SportComponent)},
      {name:'美容彩妆',components:markRaw(BeautyMakeupComponent)},
      {name:'模玩动漫',components:markRaw(ModelToysAnimationComponent)},
      {name:'其他',components:markRaw(OtherCategoryComponent)},
      
    ])

    const currentComponent = shallowRef(markRaw(DigitalComponent));
    const activeIndex = ref(0);
    const changeCom = (index) => {
      activeIndex.value = index;
      currentComponent.value = items[index].components;
      const tag = items[index].name;
      searchByTag(tag)
    }

    // 获取数据
    const newList = ref([]);
    const MessageNewList = ref([]);
    const getNewList = async () =>{
      const res = await getAllMallInfo();
      console.log(res.data.list);
      newList.value = res.data.list;
      // newList.value.forEach(item =>{
      //   console.log('1111',item.imageUrls[0]);
        
      // })
    }

    onMounted(() => {
      getNewList();
      // getCommodity();
      const commodityId = route.query.id;
      console.log(commodityId);
      
    })

    const goToDetail = (id) => {
      router.push(`/Detail/${id}`);
    }

    // 阻止默认跳转
    const link = (event) =>{
      event.preventDefault();
    }

    // 搜索查询
    const search = () => {
      
      let name = document.querySelector('.search_input').value;
      console.log(name);
      if (name) {
        searchMallInfoByName({name}).then((res)=>{
          console.log(res);
          if(res.code === 0){
            router.push({
            path:`/Search?name=${name}`,
            query:{name}

          })
          } else{
            console.log('error未查询到该商品');
            
            ElMessage({message:res.msg,type:'error'})
          }
        })
      } else {
        getNewList();
      }
    }

    // 根据商品标签获取商品信息
    const searchByTag = (tag) => {
      // console.log('Searching by tag:', tag);
      console.log('Searching by tag:', tag);
      
      searchMallInfoByTag({tag:tag,number:0}).then((res) => {
          if(res.data === null){
            console.log('error未查询到该商品');
            ElMessage({message:res.msg,type:'error'})
          }
          if(res.code === 0){
            console.log(res.data);
            newList.value = res.data.list;
          }
        });
      }
 
    const messageList = (tag) => {
      searchMallInfoByTag({tag, number: 6}).then((res) => {
        if(res.data === null){
            console.log('error未查询到该商品');
            ElMessage({message:res.msg,type:'error'})
          }
          if(res.code === 0){
            console.log(res.data);
            MessageNewList.value = res.data.list;
          }
    });
  }
  // 节流
  const throttleMessage = throttle(messageList,500)
  const handleMouseOver = (event) => {
    hoveredText.value = event.target.innerText;
    console.log(hoveredText.value);
    showMessageBox.value = true
    throttleMessage(hoveredText.value)
  }

      
    

    // onMounted(() => {
    //   getCommodity();
    // })

    // 获取全部商品
  //   const getCommodity = () => {
  //     axios.get('http://10.102.221.39:8081/mall/Commodity/listAllCommodity')
  // .then(res => {
  //   console.log(res.data);
  // })
  // .catch(error => {
  //   console.error('请求出错:', error);
  // });

  //   }
  </script>

<style scoped lang="less">
* {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  .contain {
    background-color: #f7f7f7;
    font-family: "Lato", sans-serif;
    box-sizing: border-box;
    font-size: 1.6rem;
  }

  .header {
    width:110rem;
    height: 8rem;
    margin: auto;
    padding:2rem 10rem;
    // position: fixed;
  }

  .navigation {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 4rem;
  }

  .navigation-box {
    height: 8rem;
    display: flex;
    align-items: center;
  }

  // .navigation-box:hover .text {
  //   color: #98fb98;
  // }
  .link {
    display: block;
    // height: 100%;
  }

  .text {
  color: #333;
  cursor: pointer;
  font-size: 1.8rem;
  position: relative;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #98fb98;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #98fb98;

    &::after {
      width: 100%;
    }
  }
}

  .search_input {
    padding: .8rem;
    height: 4rem;
    width: 30rem;
    border: 1px solid #e0e0e0;
    // color:#f5f5dc
  }
  .search_input:focus {
    outline: none;
    border-color:#98fb98;
  }

  .search_btn {
    height: 4rem;
    width: 6rem;
    border: 1px solid #e0e0e0;
    cursor: pointer;
  }
 
 .contents, .show {
    width: 125rem;
    margin: auto;
    // padding-bottom: 10rem;
 }

 .contents-item {
    width: 18%;
    height: 30rem;
    background-color: #d3d3d3;
    border-radius: 1rem;
    padding: 1rem;
 }

 .contents-item-box {
    display: flex;
    margin-bottom: 2rem;
 }

 .contents-item--text {
    width: 100%;
    height: 100%;
 }

 .contents-item--text-title:hover {
    color: #98FB98;
 }

 .margin-left-1 {
    margin-left: .5rem;
 }

 .icon-right {
    right: 1rem;
 }
 .icons {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

.contents-images {
  width: 76%;
  height: 30rem;
  border-radius: 1rem;

}
.contents-images-box {
  width: 100%;
  height: 100%;
  border-radius: 1rem;
}
//  .toolbar {
//   position: fixed;
//   top: 30rem;
//   right: 5rem;
//   width: 5rem;
//   height: 5rem;
//   background-color: #FFFFFF;
//   z-index: 999;
//   border-radius: 1rem;
//  }
.toolbar {
  margin-left: 2rem;
  display: flex;
}

 .toolbar-item--icon {
    width: 5rem;
    height: 3rem;
    margin-right: .5rem;
 }

 .show {
    margin-top: 2rem;
 }

 .show-item-nav {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 2rem;
    z-index: 999;
 }

 .show-item-nav-box {
    width: 10rem;
    height: 4rem;
    margin-right: 2rem;
    cursor: pointer;
    background-color: #d3d3d3;
    border-radius: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
 }
//  .show-item-nav-box:first-child {
//     background-color: #98fb98;
    
//  }
 .show-item-nav-box.active {
    background-color: #98fb98;
    font-weight: bold;
 }

 .show-item-contain {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

 }

 .show-item-box {
    width: 24rem;
    border: 1px solid transparent;
    padding: .5rem;
    border-radius: 2rem;
    overflow: hidden;
    transition: all .5s ease;
    box-shadow: 0 0 0 0 rgba(0,0,0,.3);
 }
 .show-item-box:hover {
    box-shadow: 0 1rem 2rem rgba(0,0,0,.3);
    transform: translateY(-5px);
 }

 .show-item-box-image {
    width: 100%;
    height: 24rem;
    border-radius: 2rem;
    
 }

 .show-item-box-introduction {
    display: inline-block;
    margin-top: 1rem;
    color:#333;
    line-height: 1.5;
    padding: 0 .8rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    max-height: 3em;
    margin-bottom: 2rem;
 }

 .show-item-box-price {
    width: 100%;
    color:#98fb98;
    font-size: 3rem;
    display: inline-block;
    text-align: center;
    margin-bottom: 1.5rem;
 }

 .messageBox {
    position: absolute;
    width: 100vw;
    height: 25rem;
    background-color: #fff;
    z-index: 1;
    display: none;
    
 }
 .messageBox-box {
  display: flex;
    justify-content: space-around;
    align-items: center;
    max-width: 120rem;
    margin:0 15rem;
    // background-color: pink;
    margin-top: 2rem;

    .messageBox-box-item {
      cursor: pointer;
      padding: 1rem;
      border-radius: 1rem;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      }

      &-image {
        width: 15rem;
        height: 15rem;
        border-radius: 0.8rem;
        object-fit: cover;
      }

      &-name {
        text-align: center;
        width: 15rem;
        margin: 0.8rem 0;
        font-size: 1.4rem;
        color: #333;
        // 文本溢出省略
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &-price {
        text-align: center;
        color: #98fb98;
        font-size: 1.8rem;
        font-weight: bold;
      }
    }
 }

</style>