<template>
  <el-dialog v-model="dialogFormVisible" width="800">
    <div class="address-edit-page">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <h3 class="show-box-title">收获地址</h3>
        <!-- <div class="button-group" style="justify-self: end">
          <el-button type="warning" class="button-group-item" @click="editInfo"
            >修改</el-button
          >
          <el-button @click="clock" class="button-group-item">关闭</el-button>
        </div> -->
      </div>
      <el-divider content-position="left"></el-divider>
      <el-form ref="formRef" :model="address" label-width="100px" :rules="rules">
        <el-form-item label="收件人：" prop="addressee">
          <el-input
            v-model="address.addressee"
            placeholder="请输入收件人"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系电话："
          prop="mobile"
          
        >
          <el-input v-model="address.mobile" type="tel" required placeholder="请输入联系电话"></el-input>
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
        <el-form-item label="城市：" prop="city" >
          <el-input v-model="address.city" placeholder="请输入城市"></el-input>
        </el-form-item>
        <el-form-item
          label="详细地址："
          prop="fullAddress"
          
        >
          <el-input
            type="textarea"
            v-model="address.fullAddress"
            placeholder="请输入详细地址"
            required
          ></el-input>
        </el-form-item>
        <div style="position: relative; margin: 4rem">
          <!-- <el-button
            type="primary"
            native-type="submit"
            @click="submitBtn"
            style="position: absolute; right: 0; top: -1.5rem"
            >保存</el-button -->
        </div>
      </el-form>

      <div
        class="dialog-footer"
        style="display: flex; justify-content: flex-end"
      >
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm"> 确定 </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, onMounted, reactive } from "vue";
import { getAllUserAddress, addUserAddress } from "@/api/api";
const formRef = ref();
const dialogFormVisible = ref(false);
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
const address = reactive({
  id: "",
  addressee: "",
  mobile: "",
  province: "",
  city: "",
  fullAddress: "",
});
let validateMobile = (rule, value, callback) => {
      const reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
      if (value === '') {
        callback(new Error('请输入联系电话'));
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的联系电话'));
      } else {
        callback();
      }
    };
const rules =ref(
  {
    addressee: [{ required: true, message: "请输入收件人", trigger: "blur" }],
    mobile: [
          {required:true, validator: validateMobile, trigger: 'blur' }
        ],
    province: [{ required: true, message: "请选择省份", trigger: "change" }],
    fullAddress: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
    city: [{ required: true, message: "请输入城市", trigger: "blur" }],
    
  },
   
)

onMounted(async () => {
  // const res = await getAllUserAddress();
  // console.log(res);
  // address.id = res.data[0].id;
  // address.addressee = res.data[0].addressee;
  // address.mobile = res.data[0].mobile;
  // address.province = res.data[0].province;
  // address.city = res.data[0].city;
  // address.fullAddress = res.data[0].fullAddress;
});
//

// 点确定保存
const confirm = () => {
  // 
  formRef.value.validate(valid =>{
    console.log(valid);
    
    if(valid){
      const res = addUserAddress(address);
      console.log(res)
      if(res.code === 0){
        dialogFormVisible.value = false;
      }
    }
  })
};

const showAndInit = () => {
  dialogFormVisible.value = true;
};
defineExpose({ showAndInit });
</script>

<style lang="less" scoped></style>
