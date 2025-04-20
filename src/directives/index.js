// 定义懒加载插件
import { useIntersectionObserver } from "@vueuse/core";

export const lazePlugin = {
  install(app) {
    app.directive("img-laze", {
      mounted(el, binding) {
        // el:指令绑定的那个元素 img
        // binding：binding.value 指令等于号后面绑定的表达式的值
        const {stop} = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          // console.log(isIntersecting);
          
          if (isIntersecting) {
            // 进入视口区域
            el.src = binding.value;
            stop();
          }
        });
      },
    });
  },
};
