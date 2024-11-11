<template>
  <h1 class="title">发布物品</h1>
          <el-form
            :model="form"
            label-width="auto"
            style="max-width: 600px;margin: auto;"
          >
            <el-form-item label="物品名称:">
              <el-input v-model="form.name" placeholder="请输入物品名称" />
            </el-form-item>
            <el-form-item label="出售价格:">
              <el-input v-model="form.price" placeholder="请输入出售价格" />
            </el-form-item>
            <el-form-item label="物品类型:">
              <el-select v-model="form.tag" placeholder="请输入商品类型">
                <!-- <el-option v-for="(tagName,index) in tagDataList" :key="index" label="tagName" :value="tagName"></el-option> -->
                <el-option
                  v-for="(tagName, index) in tagDataList.value"
                  :key="index"
                  :label="tagName"
                  :value="tagName"
                />
                <!-- <el-option label="笔记本|平板" value="laptop" />
                <el-option label="数码" value="idle" />
                <el-option label="图书" value="book" />
                <el-option label="交通" value="traffic" />
                <el-option label="运动" value="sport" /> -->
              </el-select>
            </el-form-item>
            <el-form-item label="物品描述:">
              <el-input
                v-model="form.description"
                type="textarea"
                placeholder="请输入物品描述"
              />
            </el-form-item>
            <el-form-item label="联系电话:">
              <el-input
                v-model="form.mobile"
                placeholder="请输入联系电话"
              />
            </el-form-item>
            <el-form-item label="邮箱地址:">
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱地址"
              />
            </el-form-item>
            <!-- <el-form-item label="物品照片:"> -->
              <!-- 上传照片
              <el-upload
              class="avatar-uploader"
              :action="`http://10.102.56.50:8081/mall/Commodity/insertCommodityImage/${commodityId}`"
              :headers="{Authorization: `${token}`,} "
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload> -->

          <!-- </el-form-item> -->
           <div class="detail-footer" style="display: flex;justify-content: end;">
            <el-steps style="min-width: 20rem" :active="active" finish-status="success">
              <el-step title="Step 1" />
              <el-step title="Step 2" />
              <!-- <el-step title="Step 3" /> -->
            </el-steps>
            <el-button type="primary" round @click="cancel" style="margin-left: 3rem;">取消</el-button>
            <el-button type="primary" round @click="handleSubmit" style="margin-left: 3rem;">下一步</el-button>
           </div>
            
          </el-form>
</template>

<script setup lang="ts">
import { reactive, ref,onMounted } from "vue";
import {uploadMallImg} from "@/api/api";
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import type { UploadFile } from "element-plus";
import { addMallInfo, getAllTag } from "@/api/api";
import { useUserStore } from "@/stores/user";

// import { Plus } from '@element-plus/icons-vue'
import { useRouter } from "vue-router";

import type { UploadProps } from 'element-plus'
const userStore = useUserStore();
const router = useRouter();

const form = reactive({
  name: "",
  price: "",
  description: "",
  tag: "",
  image: null,
  mobile: "",
  email: "",
});

const active = ref(0);
const commodityId = ref('');
onMounted(() => {
  getTag();
  // uploadMallImg()
});
const emit = defineEmits(['activeNameChange','publishSuccess']);
const emitActiveNameChange = () => {
  emit('activeNameChange', 'image');
}

// 表单提交
const handleSubmit = async () => {
  const res = await addMallInfo(form);
  console.log(res);
  if (res.code === 0) {
    ElMessage.success("发布成功");
    commodityId.value = res.data.id;
    console.log(res.data.commodityId);
    console.log(commodityId.value);
    console.log(commodityId);
    // uploadMallImg();
    emitActiveNameChange();
    emit('publishSuccess', commodityId.value);
  }
};

const cancel = () => {
  router.push("/trade");
};

// 上传图片
const uploadMallImg = () =>{
  uploadMallImg(commodityId.value,form.image).then((res) => {
    console.log(res);
  });
}


let tagDataList = reactive([]);
// 获取标签
const getTag = async () => {
  await getAllTag().then((res) => {
    tagDataList.value = res.data;
    tagDataList.forEach((item) => {
      console.log(item);
    });
    console.log(res.data);

    console.log(tagDataList.value);
  });
};
</script>

<style lang="less" scoped>
.el-form {
  max-width: 600px;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-input,
.el-select {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #cccccc;
  padding: 10px; 
}

.title {
  font-size: 2rem;
  color: #333333;
  margin-bottom: 2rem;
  font-weight: bold;
  text-align: center;
}

/* 上传照片样式 */
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>