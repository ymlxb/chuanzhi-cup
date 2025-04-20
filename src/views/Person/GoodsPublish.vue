<template>
  <section class="show">
    <h3 class="show-box-title">商品发布</h3>
    <el-divider content-position="left"></el-divider>
          <div class="show-item">
            
            <div class="show-item-contain">
             
              <component :is="currentComponent" >
                <div v-if="newList" class="show-item-box" v-for="item in newList" :key="item.id"  >
                  <router-link :to="`/Detail/${item.id}?backSelect=true`">
                    <!-- <div v-for="url in item.imageUrls">
                     
                    </div> -->
                    <img v-img-laze="item.imageUrls?.[0]"  alt="" class="show-item-box-image">
                    <span class="show-item-box-introduction">{{item.description}}</span>
                    <span class="show-item-box-price">¥{{ item.price }}</span>
                  </router-link>
                </div>
                <el-empty v-if="!newList" style="margin: auto;"  :image-size="200" />
              </component>
            </div>
          </div>
        
      </section>
</template>

<script setup>
 import PetsPlantsComponent from '../../components/PetsPlantsComponent.vue';
    import AntiqueJadeComponent from '../../components/AntiqueJadeComponent.vue';
    import HomeLivingComponent from '../../components/HomeLivingComponent.vue';
    import DigitalComponent from '../../components/DigitalComponent.vue';
    import BookComponent from '../../components/BookComponent.vue';
    import TrafficComponent from '../../components/TrafficComponent.vue';
    import BeautyMakeupComponent from '../../components/BeautyMakeupComponent.vue';
    import ClothingShoesHatsComponent from '../../components/ClothingShoesHatsComponent.vue';
    import ModelToysAnimationComponent from '../../components/ModelToysAnimationComponent.vue';
    import OtherCategoryComponent from '../../components/OtherCategoryComponent.vue';
    import FurnitureAppliancesComponent from '../../components/FurnitureAppliancesComponent.vue';
    import IdleComponent from '../../components/IdleComponent.vue';
    import SportComponent from '../../components/SportComponent.vue';
    import { reactive, shallowRef,ref, markRaw, onMounted } from 'vue';
    import { useRoute,useRouter } from 'vue-router';
    import { throttle } from 'lodash';
    import request from '@/utils/request';
    import axios from 'axios';
    import {getListMyCommodity} from '@/api/api'
    import { ElMessage } from 'element-plus';
    const route = useRoute();
    const router = useRouter();
    const newList = ref([]);
    const MessageNewList = ref([]);

    const currentComponent = shallowRef(markRaw(DigitalComponent));
    const activeIndex = ref(0);
    const changeCom = (index) => {
      activeIndex.value = index;
      currentComponent.value = items[index].components;
      const tag = items[index].name;
      searchByTag(tag)
    }

    const getNewList = async () =>{
      const res = await getListMyCommodity();
      // console.log(res.data.list);
      if(!res.data){
         newList.value = []
      } else {
         newList.value = res.data.list;
      }
      
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
</script>

<style scoped lang="less">
.contents, .show {
    width: 100rem;
    margin: auto;
    // padding-bottom: 10rem;
 }
 .show {
    margin-top: 2rem;
 }
 .show-box-title {
  font-size: 3rem;
  margin: 2rem;
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
    width: 20rem;
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
</style>