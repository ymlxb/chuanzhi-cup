<template>
  <div class="address-edit-page">
    <div
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <h3 class="show-box-title">收货地址</h3>
      <div class="button-group" style="justify-self: end">
        <el-button
          type="warning"
          class="button-group-item"
          @click.stop="uploadDlg.showAndInit()"
          >新增</el-button
        >
        <el-button @click="clock" class="button-group-item">关闭</el-button>
      </div>
    </div>
    <el-divider content-position="left"></el-divider>
    <el-form
      :model="userData"
      label-width="10rem"
      style="padding: 2.5rem; margin: 0 20px; width: 100%"
    >
      <div class="address-box">
        <div
          class="close-icon"
          style="display: flex; justify-content: space-between"
        >
          <h3 class="address-box-title">
            {{ address.addressee }} {{ address.province }}
          </h3>
          <el-icon
            style="
              font-size: 20px;
              color: #666666;
              margin: 1rem;
              cursor: pointer;
            "
            ><Close
          /></el-icon>
        </div>

        <div class="address-box-item">
          <el-form-item label="收货人：">
            {{ address.addressee }}
          </el-form-item>
          <el-form-item label="所在地区：" color="#e6e6e6">
            {{ address.province }}{{ address.city }}
          </el-form-item>

          <el-form-item label="地址：">
            {{ address.fullAddress }}
          </el-form-item>
          <el-form-item label="手机：">
            {{ address.mobile }}
          </el-form-item>
          <div class="editAddress">编辑</div>
        </div>
      </div>
    </el-form>
    <addAddress ref="uploadDlg"></addAddress>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { addUserAddress, getAllUserAddress } from "@/api/api";
import addAddress from "../../components/addAddress.vue";
const uploadDlg = ref();
console.log(uploadDlg.value);

const address = reactive({
  id: "",
  addressee: "",
  mobile: "",
  province: "",
  city: "",
  fullAddress: "",
});

const provinces = [
  { value: "北京", label: "北京" },
  { value: "天津", label: "天津" },
  { value: "河北", label: "河北" },
  { value: "山西", label: "山西" },
  { value: "内蒙古", label: "内蒙古" },
  { value: "辽宁", label: "辽宁" },
  { value: "吉林", label: "吉林" },
  { value: "黑龙江", label: "黑龙江" },
  { value: "上海", label: "上海" },
  { value: "江苏", label: "江苏" },
  { value: "浙江", label: "浙江" },
  { value: "安徽", label: "安徽" },
  { value: "福建", label: "福建" },
  { value: "江西", label: "江西" },
  { value: "山东", label: "山东" },
  { value: "河南", label: "河南" },
  { value: "湖北", label: "湖北" },
  { value: "湖南", label: "湖南" },
  { value: "广东", label: "广东" },
  { value: "广西", label: "广西" },
  { value: "海南", label: "海南" },
  { value: "重庆", label: "重庆" },
  { value: "四川", label: "四川" },
  { value: "贵州", label: "贵州" },
  { value: "云南", label: "云南" },
  { value: "西藏", label: "西藏" },
  { value: "陕西", label: "陕西" },
  { value: "甘肃", label: "甘肃" },
  { value: "青海", label: "青海" },
  { value: "宁夏", label: "宁夏" },
  { value: "新疆", label: "新疆" },
  { value: "台湾", label: "台湾" },
  { value: "香港", label: "香港" },
  { value: "澳门", label: "澳门" },
];

onMounted(async () => {
  const res = await getAllUserAddress();
  console.log(res);
  address.id = res.data[0].id;
  address.addressee = res.data[0].addressee;
  address.mobile = res.data[0].mobile;
  address.province = res.data[0].province;
  address.city = res.data[0].city;
  address.fullAddress = res.data[0].fullAddress;
});

const submitForm = () => {
  console.log(address);
};

const submitBtn = async () => {
  const res = await addUserAddress(address);
  console.log(res);
};
</script>

<style lang="less" scoped>
.show-box-title {
  font-size: 3rem;
  margin: 2rem;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-bottom: 0px;
  justify-content: flex-end;
  .button-group-item {
    height: 40px;
    width: 80px;
    // margin-bottom: 2rem;
  }
}

.address-edit-page {
  max-width: 840px;
  margin: 0 auto;
  // padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.submit-btn {
  margin-top: 20px;
}

.address-box {
  width: 100%;
  // height: 20rem;
  margin: 0 auto;
  border: 0.5rem solid #e6e6e6;
}

.address-box-title {
  margin-right: 0.2rem;
  font-size: 1.6rem;
  padding: 0.8rem;
}

.editAddress {
  display: flex;
  justify-content: flex-end;
  font-size: 1.6rem;
  margin: 1rem;
  margin-right: 3rem;
  color: #007bff;
  cursor: pointer;
}
</style>
