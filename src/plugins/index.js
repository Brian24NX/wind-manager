/**
 *  author:Jason
 */
import cache from "./cache";
import modal from "./modal";
export default {
  install(Vue) {
    //缓存对象
    Vue.prototype.$cache = cache;
    Vue.prototype.$modal = modal;
  },
};
