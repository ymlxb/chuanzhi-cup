<template>
  <div class="address-edit-page">
    <h3 class="show-box-title">基本信息</h3>
    <el-divider content-position="left"></el-divider>
    <el-form @submit.prevent="submitForm" label-width="100px">
      <el-form-item label="收件人" prop="recipient">
        <el-input v-model="address.recipient" required></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phoneNumber">
        <el-input v-model="address.phoneNumber" type="tel" required></el-input>
      </el-form-item>
      <el-form-item label="省份" prop="province">
        <el-select v-model="address.province" @change="updateCities" required>
          <el-option v-for="province in provinces" :key="province.value" :value="province.value" :label="province.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-select v-model="address.city" required>
          <el-option v-for="city in cities" :key="city.value" :value="city.value" :label="city.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="addressDetail">
        <el-input type="textarea" v-model="address.addressDetail" required></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" class="submit-btn">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const address = reactive({
  recipient: '', // 收件人
  phoneNumber: '', // 联系电话
  province: '', // 省份
  city: '', // 城市
  addressDetail: '', // 详细地址
});

const provinces = [
  { value: 'province1', label: '省份1' },
  { value: 'province2', label: '省份2' },
  // 添加更多省份数据...
];

const cities = ref([]); // 根据省份动态更新城市数据

const updateCities = () => {
  // 这里可以根据选择的省份动态获取对应的城市数据，并更新cities数组
  // 以下为示例数据，实际情况可能需要通过API请求获取
  if (address.province === 'province1') {
    cities.value = [
      { value: 'city1', label: '城市1' },
      { value: 'city2', label: '城市2' },
      // 添加更多城市数据...
    ];
  } else if (address.province === 'province2') {
    cities.value = [
      { value: 'city3', label: '城市3' },
      { value: 'city4', label: '城市4' },
      // 添加更多城市数据...
    ];
  } else {
    cities.value = []; // 如果没有匹配省份，则清空城市数据
  }
};

const submitForm = () => {
  // 提交表单数据，可以进行后续处理，如发送到服务器保存等
  console.log(address); // 打印表单数据到控制台进行调试
};
</script>

<style>

.show-box-title {
  font-size: 3rem;
  margin: 2rem;
}

.address-edit-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.submit-btn {
  margin-top: 20px;
}
</style> 