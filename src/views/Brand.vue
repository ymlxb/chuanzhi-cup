<template>
  <div class="contain">
    <header class="header">
      <div class="slogan">探索可持续品牌，开启绿色生活新旅程</div>
      <el-carousel class="carousel-container" :interval="4000" type="card">
        <el-carousel-item v-for="item in headerImage" :key="item">
          <img :src="item.url" width="100%" class="head-img" />
        </el-carousel-item>
      </el-carousel>
    </header>
    <main>
      <section class="show">
        <div class="show-box">
          <h3 class="show-box-title">时尚服饰类</h3>
          <el-divider
            content-position="left"
            style="margin-bottom: 4rem"
          ></el-divider>
          <div class="show-box-title-second">时尚可持续</div>
          <div class="show-box-item">
            <div class="show-box-item--1">
              <div class="show-box-brg"></div>
              <div class="show-box-content">
                <div class="show-box-item-img">
                  <img
                    src="../assets/images/icicle.png"
                    alt=""
                    class="show-box-item-img-one"
                  />
                </div>
                <div class="show-box-item-details">
                  <h3 class="title-second u-margin-button-2">介绍:</h3>
                  <p class="paragraph">
                    icicle 之禾创立于 1997 年，以 “遵循自然原则和规律”
                    为理念。选用高品质天然原料，反对过剩设计。深入本土制造产业升级，为高端时装业柔性制造提供可能。
                  </p>
                  <h3 class="title-second u-margin-button-2">特色:</h3>
                  <p class="paragraph">
                    始终坚持使用天然材质，将产品质量与设计感完美融合。在制造环节，以高标准严控瑕疵数量，致力于为消费者打造高品质时尚之选。
                  </p>
                  <a
                    href="https://www.icicle.com.cn/"
                    target="blank"
                    class="btn-text"
                    >了解更多 &rarr;</a
                  >
                </div>
              </div>
            </div>
            <div class="show-box-item--1">
              <div class="show-box-brg"></div>
              <div class="show-box-content">
                <div class="show-box-item-img">
                  <img
                    src="../assets/images/ganni.jpg"
                    alt=""
                    class="show-box-item-img-one"
                  />
                </div>
                <div class="show-box-item-details">
                  <h3 class="title-second u-margin-button-2">介绍:</h3>
                  <p class="paragraph">
                    Ganni来自丹麦的时尚品牌，2000 年由画廊主 Fran Struelsen
                    创立，最初是羊绒品牌，后在 2009 年 Ditte 和 Nicolaj
                    Reffstrup 夫妇接手后风格转变。
                  </p>
                  <h3 class="title-second u-margin-button-2">特色:</h3>
                  <p class="paragraph">
                    在追求时尚的同时，积极探索可持续发展道路，在 2023
                    秋冬系列中采用 100%
                    经过认证的有机、可循环或低影响材料制作成衣系列，减少了对环境的影响。
                  </p>
                  <a href="https://www.ganni.com/en/home" target="blank" class="btn-text"
                    >了解更多 &rarr;</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="show-box">
          <h3 class="show-box-title">鞋履领域</h3>
          <el-divider
            content-position="left"
            style="margin-bottom: 4rem"
          ></el-divider>
          <div class="show-box-title-second">步履可持续</div>
          <div class="show-box-item">
            <div class="show-box-item--1">
              <div class="show-box-brg"></div>
              <div class="show-box-content">
                <div class="show-box-item-img">
                  <img
                    src="../assets/images/allbirds.jpg"
                    alt=""
                    class="show-box-item-img-one"
                  />
                </div>
                <div class="show-box-item-details">
                  <h3 class="title-second u-margin-button-2">介绍:</h3>
                  <p class="paragraph">
                    Allbirds来自新西兰的鞋履品牌，以舒适且环保的鞋履产品受到消费者的青睐。其产品不仅在新西兰本土市场销售，还远销全球多个国家和地区。
                  </p>
                  <h3 class="title-second u-margin-button-2">特色:</h3>
                  <p class="paragraph">
                    鞋面材料常采用天然羊毛、桉树纤维等可再生资源，这些材料具有良好的透气性和舒适性，同时也减少了对传统石油基材料的依赖。
                  </p>
                  <a href="https://www.allbirds.cn/pc.html" target="blank" class="btn-text"
                    >了解更多 &rarr;</a
                  >
                </div>
              </div>
            </div>
            <div class="show-box-item--1">
              <div class="show-box-brg"></div>
              <div class="show-box-content">
                <div class="show-box-item-img">
                  <img
                    src="../assets/images/untitlab.jpg"
                    alt=""
                    class="show-box-item-img-one"
                  />
                </div>
                <div class="show-box-item-details">
                  <h3 class="title-second u-margin-button-2">介绍:</h3>
                  <p class="paragraph">
                    untitlab 是中国新锐设计师鞋履品牌，从品牌创立之初便坚持使用环保材料，从第一季起，全部系列都使用环保超纤面料，践行环保理念
                  </p>
                  <h3 class="title-second u-margin-button-2">特色:</h3>
                  <p class="paragraph">
                    从品牌创立伊始就始终坚持使用环保材料，并且加入 “1% for the Planet” 全球组织，积极履行环保社会责任，为地球可持续发展贡献力量。
                  </p>
                  <a href="https://untitlab.com/zh" target="blank"  class="btn-text"
                    >了解更多 &rarr;</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="show-box">
          <h3 class="show-box-title">家居用品领域</h3>
          <el-divider
            content-position="left"
            style="margin-bottom: 4rem"
          ></el-divider>
          <div class="show-box-title-second">家居与自然和谐</div>
          <div class="show-box-item">
            <div class="show-box-item--1">
              <div class="show-box-brg"></div>
              <div class="show-box-content">
                <div class="show-box-item-img">
                  <img
                    src="../assets/images/ikea.jpg"
                    alt=""
                    class="show-box-item-img-one"
                  />
                </div>
                <div class="show-box-item-details">
                  <h3 class="title-second u-margin-button-2">介绍:</h3>
                  <p class="paragraph">
                    IKEA（宜家）于 1943
                    年在瑞典创立，经过多年发展，宜家已成为全球最大的家具家居用品企业。
                  </p>
                  <h3 class="title-second u-margin-button-2">特色:</h3>
                  <p class="paragraph">
                    推出大量使用回收塑料、再生木材等环保材料的家居产品。例如，用回收塑料瓶制成的地毯，不仅减少了塑料废弃物的污染，还为家居产品提供了新的材料来源。
                  </p>
                  <a href="https://www.ikea.cn/cn/zh/cat/jia-ju-fu001/" target="blank" class="btn-text"
                    >了解更多 &rarr;</a
                  >
                </div>
              </div>
            </div>
            <div class="show-box-item--1">
              <div class="show-box-brg"></div>
              <div class="show-box-content">
                <div class="show-box-item-img">
                  <img
                    src="../assets/images/hola.jpg"
                    alt=""
                    class="show-box-item-img-one"
                  />
                </div>
                <div class="show-box-item-details">
                  <h3 class="title-second u-margin-button-2">介绍:</h3>
                  <p class="paragraph">
                    HOLA 是一家致力于提供家居用品和家居装饰的品牌，起源于中国，近年来在全球市场上逐渐扩展。
                  </p>
                  <h3 class="title-second u-margin-button-2">特色:</h3>
                  <p class="paragraph">
                    HOLA 积极倡导使用可再生、可回收的原料，并且采取节能环保的生产工艺，以此减少对环境的影响，全力打造更环保的家居产品。
                  </p>
                  <a href="https://www.hola.com.tw/" target="blank" class="btn-text"
                    >了解更多 &rarr;</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="show-box">
          <h3 class="show-box-title">美妆护肤类</h3>
          <el-divider
            content-position="left"
            style="margin-bottom: 4rem"
          ></el-divider>
          <div class="show-box-title-second">美丽与责任并重</div>
          <div class="show-box-item">
            <div class="show-box-item--1">
              <div class="show-box-brg"></div>
              <div class="show-box-content">
                <div class="show-box-item-img">
                  <img
                    src="../assets/images/aesop.jpg"
                    alt=""
                    class="show-box-item-img-one"
                  />
                </div>
                <div class="show-box-item-details">
                  <h3 class="title-second u-margin-button-2">介绍:</h3>
                  <p class="paragraph">
                    Aesop（伊索）
                    是在美妆护肤界颇具知名度且深受消费者喜爱的品牌，以其独特的品牌理念和产品特色在市场中占据一席之地。
                  </p>
                  <h3 class="title-second u-margin-button-2">特色:</h3>
                  <p class="paragraph">
                    简约包装，精心选取天然、纯净的成分，包装材料也精挑细选，它们不仅契合简约美学追求，更与品牌天然、质朴理念相呼应。
                  </p>
                  <a href="https://www.aesop.com.cn/" target="blank" class="btn-text"
                    >了解更多 &rarr;</a
                  >
                </div>
              </div>
            </div>
            <div class="show-box-item--1">
              <div class="show-box-brg"></div>
              <div class="show-box-content">
                <div class="show-box-item-img">
                  <img
                    src="../assets/images/drunk.jpg"
                    alt=""
                    class="show-box-item-img-one"
                  />
                </div>
                <div class="show-box-item-details">
                  <h3 class="title-second u-margin-button-2">介绍:</h3>
                  <p class="paragraph">
                    Drunk
                    Elephant（醉象）是美妆护肤领域中备受关注的品牌，以其独特的成分理念和对包装的优化举措而闻名。
                  </p>
                  <h3 class="title-second u-margin-button-2">特色:</h3>
                  <p class="paragraph">
                    Drunk Elephant 强调用 “干净” 成分，这是品牌理念核心，其在包装上也努力减少垃圾产生。
                  </p>
                  <a href="https://www.drunkelephant.com/" target="blank" class="btn-text"
                    >了解更多 &rarr;</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="show-box">
          <h3 class="show-box-title">食品饮料类</h3>
          <el-divider
            content-position="left"
            style="margin-bottom: 4rem"
          ></el-divider>
          <div class="show-box-title-second">美味源于自然</div>
          <div class="show-box-item">
            <div class="show-box-item--1">
              <div class="show-box-brg"></div>
              <div class="show-box-content">
                <div class="show-box-item-img">
                  <img
                    src="../assets/images/ben.jpg"
                    alt=""
                    class="show-box-item-img-one"
                  />
                </div>
                <div class="show-box-item-details">
                  <h3 class="title-second u-margin-button-2">介绍:</h3>
                  <p class="paragraph">
                    Ben & Jerry’s 是全球知名冰淇淋品牌，口味多样、理念独特，积极践行社会责任和环保，受消费者喜爱。
                  </p>
                  <h3 class="title-second u-margin-button-2">特色:</h3>
                  <p class="paragraph">
                    在原料采购环节秉持公平贸易的理念，这是其品牌的一大特色。品牌不仅仅满足于使用现有的可回收材料，还不断探索新的包装形式以提高可回收性。
                  </p>
                  <a href="https://www.benjerry.com/" target="blank" class="btn-text"
                    >了解更多 &rarr;</a
                  >
                </div>
              </div>
            </div>
            <div class="show-box-item--1">
              <div class="show-box-brg"></div>
              <div class="show-box-content">
                <div class="show-box-item-img">
                  <img
                    src="../assets/images/星巴克.jpg"
                    alt=""
                    class="show-box-item-img-one"
                  />
                </div>
                <div class="show-box-item-details">
                  <h3 class="title-second u-margin-button-2">介绍:</h3>
                  <p class="paragraph">
                    星巴克作为全球知名的咖啡连锁品牌，在从原料采购到门店运营的各个环节的可持续发展方面做出了诸多努力。
                  </p>
                  <h3 class="title-second u-margin-button-2">特色:</h3>
                  <p class="paragraph">
                    向全球的咖啡农推广可持续的种植方法，从源头上保障了产品的可持续性，星巴克还在整体运营环节进行了节能优化，在店内广泛采用节能设备。
                  </p>
                  <a href="https://www.starbucks.com.cn/" target="blank" class="btn-text"
                    >了解更多 &rarr;</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import brand1 from "../assets/images/brand1.png";
import brand2 from "../assets/images/brand2.png";
import brand3 from "../assets/images/brand3.png";
const headerImage = [{ url: brand1 }, { url: brand2 }, { url: brand3 }];
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
.contain {
  padding: 3rem;
  background-color: #f7f7f7;
  font-family: "Lato", sans-serif;
  box-sizing: border-box;
  font-size: 1.6rem;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.header {
  width: 100rem;
  height: 30rem;
  margin: auto;
}
// .carousel-container {
//   position: relative;
// }
.slogan {
  font-size: 3rem;
  color: green;
  text-align: center;
  margin-bottom: 2.5rem;
  // position: absolute;
  // z-index: 999;
  // top: 0;
  // left: 40rem;
}
.head-img {
  width: 100%;
  height: 100%;
}
.show {
  background-color: #f7f7f7;
  padding: 5rem 0;
}

.show-box-title {
  font-size: 3rem;
  margin-bottom: 2rem;
}

.show-box-title-second {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #006400;
}

.show-box-item {
  // max-width: 114rem;
  margin: 0 auto;
  margin-bottom: 10rem;
}
.show-box-item::after {
  content: "";
  display: table;
  clear: both;
}
.show-box-item:not(:last-child) {
  margin-bottom: 8rem;
}
.show-box-item-img-one {
  float: left;
  width: 50%;
  height: 40rem;
}

.show-box-item--1 {
  float: left;
  width: calc((100% - 6rem) / 2);
  position: relative;
}
.show-box-item--1:not(:last-child) {
  margin-right: 6rem;
}

.show-box-item--1:hover {
  transform: translate(0, -3px);
}

.show-box-brg {
  position: absolute; /* 绝对定位，覆盖整个容器 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent; /* 默认透明 */
  transition: background-color 0.3s; /* 过渡效果 */
  z-index: -1;
}

.show-box-content {
  position: relative;
  transition: all 0.3s;
}

.show-box-item--1:hover .show-box-content {
  transform: translate(-1rem, -1rem);
}
.show-box-item--1:hover .show-box-brg {
  background-color: rgba(128, 128, 128, 0.5);
}

.show-box-item-details {
  height: 40rem;
  background-color: skyblue;
}

.title-second {
  font-size: 2.5rem;
}
.paragraph {
  font-size: 1.6rem;
  letter-spacing: 0.1rem;
  line-height: 1.4;
  overflow: hidden;
  padding-left: 1rem;
}
.paragraph:not(:last-child) {
  margin-bottom: 4rem;
}

.u-margin-button-2 {
  margin-bottom: 2rem;
}

.btn-text:link,
.btn-text:visited {
  font-size: 1.6rem;
  text-decoration: none;
  color: #28b485;
  display: inline-block;
  border-bottom: 1px solid #28b485;
  padding: 3px;
  transition: all 0.2s;
}

.btn-text:hover {
  background-color: #28b485;
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.5);
}

.btn-text:active {
  transform: translateY(0);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
}
</style>
