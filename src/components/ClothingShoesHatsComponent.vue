<template>
  <!-- <a href="">
              <div class="show-item-box">
                <img src="../assets/images/404.png" alt="" class="show-item-box-image">
                <span class="show-item-box-introduction">联想拯救者,几乎全新，因为家里又买了一个多余了，需要出售，可小刀。</span>
                <span class="show-item-box-price">¥7999.00</span>
              </div>
            </a> -->

  <slot />
</template>

<script setup>
defineProps({
  title: {
    type: Number,
    default: 0,
  },
});
</script>

<style lang="less" scoped>
.show-item-box {
  width: 24rem;
  border: 1px solid transparent;
  padding: 0.5rem;
  border-radius: 2rem;
  overflow: hidden;
  transition: all 0.5s ease;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.3);
}
.show-item-box:hover {
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);
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
  color: #333;
  line-height: 1.5;
  padding: 0 0.8rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%; /* 或者设置一个具体的宽度，如200px */
  max-height: 3em;
  margin-bottom: 2rem;
}

.show-item-box-price {
  width: 100%;
  color: #98fb98;
  font-size: 3rem;
  display: inline-block;
  text-align: center;
  margin-bottom: 1.5rem;
}
</style>
