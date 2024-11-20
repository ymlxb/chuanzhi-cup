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
// console.log();

const address = reactive({
  id: "",
  addressee: "",
  mobile: "",
  province: "",
  city: "",
  fullAddress: "",
});



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
