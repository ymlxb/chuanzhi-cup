<template>
  <header>
    <div class="header-container">
      <div class="logo">可持续生活</div>
      <nav>
        <a href="#mission">我们的使命</a>
        <a href="#vision">我们的愿景</a>
        <a href="#values">我们的价值观</a>
        <a href="#activities">我们的活动</a>
        <a href="#team">团队介绍</a>
        <a href="#contact">联系我们</a>
        <a href="#join">加入我们</a>
      </nav>
      <!-- <div class="social-icons">
        <a href="#"><img src="facebook-icon.png" alt="Facebook" /></a>
        <a href="#"><img src="twitter-icon.png" alt="Twitter" /></a>
        <a href="#"><img src="instagram-icon.png" alt="Instagram" /></a>
      </div> -->
    </div>
  </header>

  <div class="container">
    <div class="mission" id="mission">
      <h2>我们的使命</h2>
      <p>
        在可持续生活网站，我们致力于推广可持续的生活方式，帮助人们理解在日常生活中如何做出环保的选择。我们相信，只有通过教育和信息共享，才能真正实现可持续发展的目标。我们的使命是为用户提供易于理解和实施的实用信息，鼓励大家积极参与环保行动，形成良好的生活习惯。
      </p>
      <p>
        我们提供丰富的资源，包括实用技巧、成功案例和最新的环保趋势，帮助用户在生活的每一个方面做出更环保的选择。通过我们的平台，用户不仅可以学习到如何减少个人碳足迹，还能了解如何在家庭和社区中推广可持续生活。
      </p>
    </div>

    <div class="vision" id="vision">
      <h2>我们的愿景</h2>
      <p>
        我们的愿景是构建一个每个人都能为保护地球贡献力量的社区。我们希望通过教育和社区建设，推动可持续发展的理念，使每个人都能意识到自己在环境保护中的重要角色。无论是选择可再生能源、减少塑料使用，还是参与本地环保活动，我们相信，生活中的每一个小改变都能够汇聚成巨大的力量。
      </p>
      <p>
        我们希望能够激励更多的人加入到可持续发展的行列中来，创造一个健康、和谐的地球，为子孙后代留下美好的生活环境。
      </p>
    </div>

    <div class="values" id="values">
      <h2>我们的价值观</h2>
      <p>
        我们秉持诚信、创新和责任的价值观，致力于创建一个开放、包容和支持的社区。在这里，每个人的声音都很重要，我们鼓励分享经验和知识，促进彼此之间的学习和成长。
      </p>
      <p>
        我们深知，只有通过合作与分享，才能实现更大的影响。因此，我们倡导社区成员之间的互动与合作，共同探索可持续生活的最佳实践。
      </p>
    </div>

    <div class="activities" id="activities">
      <h2>我们的活动</h2>
      <p>
        我们定期组织各种活动，以促进可持续生活的实践。这些活动包括社区清洁日、讲座、工作坊以及环保知识分享会。通过这些活动，我们希望能够团结更多的人参与到环保行动中来，共同为保护环境贡献力量。
      </p>
      <p>
        此外，我们还鼓励用户分享自己的环保项目和实践经验，以激励更多的人采取行动，加入可持续生活的行列。
      </p>
    </div>

    <div class="team" id="team">
      <h2>团队介绍</h2>
      <p>
        我们的团队由一群热爱环境、充满激情的人组成。每个团队成员都在可持续发展领域有着丰富的经验和专业知识。我们有教育工作者、环境科学家、社区组织者和志愿者，大家共同努力，推动可持续生活的理念。
      </p>
      <p>
        团队的多样性使我们能够更全面地理解和应对可持续发展面临的挑战。我们相信，通过团队的合作，可以实现更大的社会影响。
      </p>
    </div>

    <div class="contact" id="contact">
      <h2>联系我们</h2>
      <p>
        我们欢迎任何对可持续生活感兴趣的人与我们联系。如果你有任何问题、建议或想法，请通过以下方式与我们沟通：
      </p>
      <ul>
        <li style="font-size: 1.4rem;">电子邮件: jdq8576@126.com</li>
        <li style="font-size: 1.4rem;">电话: +86 155 1672 2432</li>
        <!-- <li>社交媒体: 在各大社交平台上搜索“可持续生活”即可找到我们。</li> -->
      </ul>
      <p>我们期待着听到你的声音，共同为可持续生活的未来努力！</p>
    </div>

    <div class="join-us" id="join">
      <h2>加入我们</h2>
      <p>
        我们欢迎所有对可持续生活感兴趣的人加入我们的社区，共同探讨和实践环保生活方式。无论你是初学者还是专家，这里都有你可以参与的地方。
      </p>
      <p>
        加入我们，你将能够接触到丰富的资源，参与到各种活动中，并与志同道合的人分享你的经验和见解。让我们一起努力，为这个世界创造更美好的未来！
      </p>
    </div>
  </div>

  <!-- <footer>
    <p>© 2024 可持续生活. 保留所有权利.</p>
  </footer> -->
</template>

<script setup></script>

<style scoped lang="less">
body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
          color: #333;
      };
      header {
          background: #35424a;
          color: #ffffff;
          padding: 3rem 0;
          text-align: center;
          // position: fixed;
          width: 100%;
      };
      .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 120rem;
          margin: auto;
          padding: 0 4rem;
      };
      .logo {
          font-size: 2.5em;
          font-weight: bold;
      };
      nav {
          margin: 0;
      };
      nav a {
          color: #ffffff;
          text-decoration: none;
          margin: 0 2rem; 
          font-weight: bold;
          font-size: 1.6em; 
      };
      nav a:hover {
          text-decoration: underline;
      };
      .social-icons {
          display: flex;
          align-items: center;
      };
      .social-icons img {
          width: 3rem;
          height: 3rem;
          margin-left: 15px;
      };
      .container {
          width: 85%;
          max-width: 100rem;
          margin: auto;
          padding: 3rem;
          background: #ffffff;
          box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
          border-radius: 1rem;
          line-height: 1.8;
          // margin-top: 85px
      };
      h1 {
          margin-bottom: 3rem;
          font-size: 3em; 
      };
      h2 {
          color: #35424a;
          margin-top: 25px;
          border-bottom: 2px solid #35424a;
          padding-bottom: 1rem;
          font-size: 2em; 
      };
      p {
          margin: 2rem 0;
          font-size: 1.6em;
      };
      footer {
          text-align: center;
          padding: 2rem 0;
          background: #35424a;
          color: #ffffff;
          position: relative;
          bottom: 0;
          width: 100%;
          margin-top: 3rem;
      };
      .mission, .vision, .values, .join-us, .activities, .team, .contact {
          margin: 3rem 0; 
          padding: 2rem;
          border-radius: .5rem;
      };
      .mission {
          background: #e9f7ef;
          border-left: .5rem solid #28a745;
      };
      .vision {
          background: #f9ebea;
          border-left: .5rem solid #e74c3c;
      };
      .values {
          background: #d9edf7;
          border-left: .5rem solid #3498db;
      };
      .activities {
          background: #fff3cd;
          border-left: .5rem solid #ffc107;
      };
      .team {
          background: #e2e3e5;
          border-left: .5rem solid #6c757d;
      };
      .contact {
          background: #d4edda;
          border-left: .5rem solid #28a745;
      };
</style>
