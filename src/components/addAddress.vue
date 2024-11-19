<template>
  <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
    <div class="address-edit-page">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <h3 class="show-box-title">收获地址</h3>
        <div class="button-group" style="justify-self: end">
          <el-button type="warning" class="button-group-item" @click="editInfo"
            >修改</el-button
          >
          <el-button @click="clock" class="button-group-item">关闭</el-button>
        </div>
      </div>
      <el-divider content-position="left"></el-divider>
      <el-form :model="address" label-width="100px">
        <el-form-item label="收件人：" prop="addressee">
          <el-input v-model="address.addressee" placeholder="请输入收件人"></el-input>
        </el-form-item>
        <!-- <el-form-item label="联系电话：" prop="mobile">
          <el-input v-model="address.mobile" type="tel" required></el-input>
        </el-form-item>
        <el-form-item label="省份：" prop="province">
          <el-select
            v-model="address.province"
            placeholder="请选择省份"
            required
          >
            <el-option
              v-for="province in provinces"
              :key="province.value"
              :value="province.value"
              :label="province.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市：" prop="city">
          <el-input v-model="address.city"></el-input>
        </el-form-item>
        <el-form-item label="详细地址：" prop="fullAddress">
          <el-input
            type="textarea"
            v-model="address.fullAddress"
            required
          ></el-input>
        </el-form-item> -->
        <div style="position: relative; margin: 4rem">
          <el-button
            type="primary"
            native-type="submit"
            @click="submitBtn"
            style="position: absolute; right: 0; top: -1.5rem"
            >保存</el-button
          >
        </div>
      </el-form>

      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          Confirm
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, onMounted,reactive } from "vue";
import { getAllUserAddress } from "@/api/address";
const dialogFormVisible = ref(false);
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
//
const showAndInit = () => {
  dialogFormVisible.value = true;
};
defineExpose({ showAndInit });
</script>

<style lang="less" scoped></style>
