<template>
  <div class="contain">
    <header class="header">
      <!-- <div class="header__logo-box">
        <img src="../assets/images/image1.png" class="header__logo" >
      </div> -->
      <div class="header__text-box">
        <h1 class="heading-primary">
          <span class="heading-primary--main">持续生活</span>
          <span class="heading-primary--sub">Sustainable living</span>
        </h1>
        <a href="#" @click="transfer" class="btn btn--white btn--animated">开启我们的旅行</a>
      </div>
    </header>

    <main>
      <section class="section-brand">
        <div class="u-center-text  u-margin-button-8" id="to_transfer" style="text-align: center;">
          <h2 class="heading-secondary" >
          为喜欢持续生活的人提供可持续的产品品牌
          </h2>
        </div>
        <div class="row">
          <div class="col-1-of-2">
            <h3 class="heading-third u-margin-button-2">探索可持续品牌的魅力世界</h3>
            <p class="paragraph">开启您的可持续生活之旅，与我们一起发现那些致力于环保、社会责任和可持续发展的品牌。可持续品牌的理念犹如灯塔指引方向，然而，将这一理念落地为具体可操作的行动才是实现品牌可持续发展的关键所在，接下来我们就来看看……</p>
            <h3 class="heading-third u-margin-button-2">加入我们，共创绿色未来</h3>
            <p class="paragraph">在这里，您不仅能找到心仪的可持续产品，还能结识一群志同道合的伙伴，共同为地球的绿色未来贡献力量。在对可持续品牌的一般性概念和特征有了全面的认识之后，让我们深入剖析一些成功的可持续品牌案例，以更好地理解这些概念在现实中的具体呈现。</p>
            <a href="http://localhost:8001/#/Brand" class="btn-text">了解更多 &rarr;</a>
          </div>
          <div class="col-1-of-2">
            <div class="photo-composition">
              <img src="../assets/images/brand4.png" alt="photo composition 1" class="photo-composition__photo photo-composition__photo--p1">
              <img src="../assets/images/brand5.png" alt="photo composition 2" class="photo-composition__photo photo-composition__photo--p2">
              <img src="../assets/images/brand6.png" alt="photo composition 3" class="photo-composition__photo photo-composition__photo--p3">
            </div>
          </div>
        </div>
      </section>
      <section class="section-feature">
        <h2 class="heading-secondary-1">
          为喜欢持续生活的人提供可持续的指南
          </h2>
        <div class="row">
          <div class="col-1-of-4">
            <div class="feature-box">
              <el-icon class="icon u-margin-button-2" :size="50" color="#28b485">
                <Location/>
              </el-icon>
              <h3 class="heading-third u-margin-button-2">慢跑捡垃圾</h3>
              <p class="feature-box__text">慢跑捡垃圾是集锻炼与环保于一体的活动，可清洁环境、健身养心，还通过社交网络与多方合作得以推广发展。
              </p>
            </div>
          </div>
          <div class="col-1-of-4">
            <div class="feature-box">
              <el-icon class="icon u-margin-button-2" :size="50" color="#28b485">
                <Location/>
              </el-icon>
              <h3 class="heading-third u-margin-button-2">乘坐公共交通</h3>
              <p class="feature-box__text">乘坐公共交通以较低成本、高载客量实现人员运输，减少尾气排放，为环境保护与资源节约做出积极贡献。</p>
            </div>
          </div>
          <div class="col-1-of-4">
            <div class="feature-box">
              <el-icon class="icon u-margin-button-2" :size="50" color="#28b485">
                <Location/>
              </el-icon>
              <h3 class="heading-third u-margin-button-2">使用节能电器</h3>
              <p class="feature-box__text">使用节能电器是一种有效的环保举措，通过降低能耗提高能源利用效率，既减少家庭开支又为节能减排贡献力量。</p>
            </div>
          </div>
          <div class="col-1-of-4">
            <div class="feature-box">
              <el-icon class="icon u-margin-button-2" :size="50" color="#28b485">
                <Location/>
              </el-icon>
              <h3 class="heading-third u-margin-button-2">避免食物浪费</h3>
              <p class="feature-box__text">在可持续生活里避免食物浪费意义重大，依据自身需求合理规划食物购买与消费，可减少资源消耗并缓解环境压力。</p>
            </div>
          </div>
        </div>
      </section>
      <section class="section-tours">
        <div class="u-center-text  u-margin-button-8" style="text-align: center;">
          <h2 class="heading-secondary">
          为喜欢持续生活的人提供持续的生活方式
          </h2>
        </div>
        <div class="row">
          <div class="col-1-of-3">
            <div class="card">
              <div class="card__side card__side--font">
                <div class="card__picture card__picture--1">
                  &nbsp
                </div>
                <h3 class="card__heading">
                  <span class="card__heading--span">二手交易平台</span>
                </h3>
                <div class="card__details">
                  二手交易平台，提供二手商品交易的平台，让我们用更少的钱，买到更好的商品。闲置不浪费，二手交易平台让物品价值延续。绿色持续生活，从这里开始。
                </div>
              </div>
              <div class="card__side card__side--back card__details">
                <h3 class="heading-third u-margin-button-2" style="margin-top: 2rem;">功能与作用:</h3>
                <p class="paragraph">二手交易平台是可持续生活的关键部分，为各类闲置物品提供再流通渠道，延长物品使用寿命、减少资源浪费，对买家而言低价买到所需很实惠，对卖家能实现残值变现。</p>
                <h3 class="heading-third u-margin-button-2" style="margin-top: 2rem;">对可持续生活的贡献:</h3>
                <p class="paragraph">二手交易平台减少新物品生产带来的资源消耗与环境压力（如电子产品、家具生产的资源消耗和污染），还促进社区成员互动交流，形成共享文化，增强凝聚力并传播可持续生活理念。</p>
              </div>
            </div>
          </div>
          <div class="col-1-of-3">
            <div class="card">
              <div class="card__side card__side--font">
                <div class="card__picture card__picture--2">
                  &nbsp
                </div>
                <h3 class="card__heading">
                  <span class="card__heading--span">可持续品牌</span>
                </h3>
                <div class="card__details">
                  可持续品牌，秉持可持续发展理念的品牌，让我们以消费践行环保与社会责任。追求品质的同时，关注地球资源与社会福祉。可持续品牌，是可持续生活方式的推动者，用每一个产品引导我们走向绿色、和谐、可持续的未来。
                </div>
              </div>
              <div class="card__side card__side--back card__details">
                <h3 class="heading-third u-margin-button-2" style="margin-top: 2rem;">功能与作用:</h3>
                <p class="paragraph">可持续品牌在时尚业用有机棉、再生聚酯纤维制衣，减少高污染、高能耗原料依赖；食品领域注重有机、本地采购和可持续渔业产品，有多种环境效益。采用清洁能源（太阳能、风能、生物质能等），优化工艺提高能效；注重水资源保护与循环利用，如纺织企业印染废水处理再用。

                </p>
                <h3 class="heading-third u-margin-button-2" style="margin-top: 2rem;">对可持续生活的贡献:</h3>
                <p class="paragraph">可持续品牌利用环保材料与生产耐用产品，减少自然资源开采消耗，再生材料降低对原始资源需求，产品耐用性延长资源使用周期，有助于保护生态系统。
                </p>
              </div>
            </div>
          </div>
          <div class="col-1-of-3">
            <div class="card">
              <div class="card__side card__side--font">
                <div class="card__picture card__picture--3">
                  &nbsp
                </div>
                <h3 class="card__heading">
                  <span class="card__heading--span">绿色生活指南</span>
                </h3>
                <div class="card__details">
                  绿色生活指南，是引领人们走向绿色生活的指引手册。它涵盖生活的各个方面，助力我们轻松开启绿色生活之旅。绿色生活指南，是通往可持续绿色生活的重要路标。
                </div>
              </div>
              <div class="card__side card__side--back card__details">
                <h3 class="heading-third u-margin-button-2" style="margin-top: 2rem;">功能与作用:</h3>
                <p class="paragraph">绿色生活指南指导家庭合理使用能源，在交通上引导选择低能耗方式以降能耗，介绍家庭节水方法，提供绿色产品选择标准，引导选环保产品，倡导理性消费，鼓励参与环保活动和养成日常环保习惯，提倡公共交通、步行、骑行。</p>
                <h3 class="heading-third u-margin-button-2" style="margin-top: 2rem;">对可持续生活的贡献:</h3>
                <p class="paragraph">绿色产品选择与避免过度消费可降污染，环保产品减排污，避免食物浪费减少垃圾与面源污染，可持续交通和减少一次性用品使用也减少污染，有助于保护和恢复生态系统，维护生物栖息地。</p>
              </div>
            </div>
          </div>
        </div>
        <div class="u-center-text u-margin-button-8">
          <!-- <a href="#" class="btn btn--green">全部课程</a> -->
        </div>
      </section>
    </main>
  </div>
  
</template>

<script setup>
  const transfer = (event) => {
    event.preventDefault();
    document.querySelector('#to_transfer').scrollIntoView({ behavior: 'smooth' });
  };
</script>

<style lang="less" scoped>
  * ,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }
  .contain {
    padding: 3rem;
    background-color: #fff;
    font-family: "Lato", sans-serif;
    box-sizing: border-box;
    font-size: 1.6rem;
  }
  .header {
    height: 95vh;
    background-image: linear-gradient(to right bottom,rgba(128, 214, 113, 0.806),rgba(40, 180, 133, 0.829)),
    url(../assets/images/backgroud.jpg);
    background-size: cover;
    background-position: center;
    clip-path: polygon(0 0,100% 0,100% 75vh,0 100%);
    position: relative;
  }
  .header__logo-box {
    position: absolute;
    top:4rem;
    left:4rem;
    
  }
  .header__logo {
    width: 5rem;
  }
  .header__text-box {
    text-align: center;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);

  }
  .heading-primary {
    color: #fff;
    text-align: center;
    margin-bottom: 6rem;
  }
  .heading-primary--main {
    display: block;
    font-size: 60px;
    font-weight: 400;
    letter-spacing: 35px;
    animation: moveInLeft 1s ease-out;
  }
  .heading-primary--sub {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    margin-top: 5rem;
    text-transform: uppercase;
    letter-spacing: 1rem;
    animation:moveInRight 1s ease-out;
  }

  @keyframes moveInLeft {
    0% {
      opacity: 0;
      transform:translateX(-10rem);
    }

    80% {
      transform: translateX(2rem);
    }

    100% {
      opacity:1;
      transform:translateX(0);
    }

  }

  @keyframes moveInRight {
    0% {
      opacity: 0;
      transform:translateX(10rem);
    }

    80% {
      transform: translateX(-2rem);
    }

    100% {
      opacity:1;
      transform:translateX(0);
    }

  }

  @keyframes moveInBottom {
    0% {
      opacity: 0;
      transform:translateY(5rem);
    }

    100% {
      opacity:1;
      transform:translateY(0);
    }

  }

  .btn:link,
  .btn:visited {
    display: inline-block;
    text-decoration: none;
    padding: 1.5rem 4rem;
    border-radius: 10rem;
    transition:all 0.3s;
    position: relative;
  }
  
  .btn--white {
    background-color: #fff;
    color: #777;
    
  }

  .btn:hover {
    transform:translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,.2);
  }
  
  .btn:active {
    transform:translateY(-1px);
    box-shadow: 0 5px 10px rgba(0,0,0,.2);
  }
  
  .btn::after {
    content:'';
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 10rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition:all 0.4s;
  }

  .btn--white::after {
    background-color: #fff;
  }

  .btn:hover::after {
    transform: scaleX(1.5) scaleY(1.6);
    opacity: 0;
  }

  .btn--animated {
    animation:moveInBottom .5s ease-out .75s;
    animation-fill-mode: backwards; //避免了在动画开始前元素的突然显现
  }

  .section-brand {
    background-color: #f7f7f7;
    padding: 25rem 0;
    margin-top: -20vh;
  }

  .heading-secondary {
    font-size: 2.5rem;
    font-weight: 400;
    display: inline-block;
    background-image: linear-gradient(to right, #7ed56f, #28b485);
    background-clip: text;
    color: transparent;
    letter-spacing: .2rem;
    transition: all .2s;
    margin-top: 8rem;
  }

  .heading-secondary:hover {
    transform: skewY(2deg) skewX(-15deg) scale(1.1);
    text-shadow: 0.5rem 1rem 2rem rgba(0,0,0,.2);
  }

  .heading-secondary-1 {
    position: absolute;
    top: 17rem;
    left: 32%;
    font-size: 2.5rem;
    letter-spacing: .2rem;
    transition: all .2s;
    color:#656D78;
  }
  .heading-secondary-1:hover {
    transform: skewY(2deg) skewX(-15deg) scale(1.1);
    text-shadow: 0.5rem 1rem 2rem rgba(0,0,0,.2);
  }

  .u-margin-button-8 {
    margin-bottom: 8rem;
  }

  .row {
    max-width: 114rem;
    margin: 0 auto;
    color: #656D78;
  }
  .row::after {
  content: "";
  display: table;
  clear: both;
}
  .row:not(:last-child) {
    margin-bottom: 8rem;
  }
  .col-1-of-2 {
    float: left;
    width: calc((100% - 6rem) /2);
  }
  .col-1-of-2:not(:last-child) {
    margin-right: 6rem;
  }
  .heading-third {
    font-size: 1.6rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .paragraph {
    font-size: 1.6rem;
    letter-spacing: .1rem;
    line-height: 1.4;
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
    transition: all .2s;
  }

  .btn-text:hover {
    background-color: #28b485;
    color:#fff;
    transform:translateY(-3px);
    box-shadow: 0 1rem 2rem rgba(0,0,0,.5);
  }

  .btn-text:active {
    transform:translateY(0);
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.2);
  }

  .photo-composition {
    position: relative;
  }

  .photo-composition__photo {
    position: absolute;
    width: 55%;
    box-shadow: 0 1.5rem 4rem rgba(0,0,0,.2);
    border-radius: 2px;
  }

  .photo-composition__photo--p1 {
    width: 60%;
    left: 0;
    top: -2rem;
  }

  .photo-composition__photo--p2 {
    width: 60%;
    right: 0;
    top: 3rem;
  }
  .photo-composition__photo--p3 {
    width: 60%;
    left: 20%;
    top: 14rem;
  }

  .col-1-of-4 {
    float: left;
    width: calc((100% - 3*6rem) /4);
  }
  .col-1-of-4:not(:last-child) {
    margin-right: 6rem;
  }

  .section-feature {
    background-color: #f7f7f7;
    padding: 25rem 0;
    margin-top: -15vh;
    height: 95vh;
    background-image: linear-gradient(to right bottom,rgba(128, 214, 113, 0.806),rgba(40, 180, 133, 0.829)),
    url(../assets/images/backgroud.jpg);
    background-size: cover;
    background-position: center;
    clip-path: polygon(0 15vh,100% 0,100% 75vh,0 100%);
    position: relative;

  }

  .feature-box {
    background-color: #D5EDDE;
    border:1px solid #D5EDDE;
    letter-spacing: .1rem;
    line-height: 1.4;
    text-align: center;
    padding: 2rem;
    border-radius: 3px;
    box-shadow: 0 1.5rem 4rem rgba(0,0,0,.2);
    transition:all .3s;
  }

  .icon {
    margin:2.5rem;
  }

  .feature-box:hover {
    transform: translateY(-1.5rem) scale(1.02);
  }

  .section-tours {
    background-color: #f7f7f7;
    padding: 25rem 0 25rem 0;
    margin-top: -20vh;
  }

  .col-1-of-3 {
    float: left;
    width: calc((100% - 2*6rem) /3);
  }
  .col-1-of-3:not(:last-child) {
    margin-right: 6rem;
  }

  .card {
    perspective: 150rem;
    -moz-perspective: 150rem;
    position: relative;
    min-height: 50rem;
  }
  
  .card__side {
    background-color: skyblue;
    height: 50rem;
    transition: all .8s ease;
    // color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    backface-visibility: hidden;
    box-shadow: 0 1.5rem 4rem rgba(0,0,0,.2);
    border-radius:3px;
    overflow: hidden;
  }
  .card:hover .card__side {
    transform: rotateY(180deg);
  }
  .card__side--font {
    background-color: #fff;
  }
  .card__side--back {
    background-color: greenyellow;
    transform: rotateY(-180deg);
  }
  
  .card:hover .card__side--back {
    transform: rotateY(0);
  }

  .card__picture {
    background-size: cover;
    height: 25rem;
    background-blend-mode: screen;
  }
  .card__picture--1 {
    background-image: linear-gradient(to right bottom,rgba(128, 214, 113, 0.806),rgba(40, 180, 133, 0.829)),url(../assets/images/trade.jpg);
  }
  .card__picture--2 {
    background-image:url(../assets/images/brand7.png);
  }
  .card__picture--3 {
    background-image: linear-gradient(to right bottom,rgba(128, 214, 113, 0.806),rgba(40, 180, 133, 0.829)),url(../assets/images/advice.png);
  }

  .card__heading {
    position: absolute;
    top:20rem;
    right: 2rem;
    font-size: 3rem;
    text-align: right;
    width: 75%;
    color: #fff;
  }
  .card__heading--span {
    background-image: linear-gradient(to right bottom, #7ed56f, #28b485);
  }
  .card__details {
    padding: 1rem 2rem;
    text-align: left;
    line-height: 1.5;
  }

  .u-center-text {
    text-align: center;
    color:#fff;
  }
  .btn--green {
    background-color: #7ed56f;
    border-radius: 3px;
  }
</style>