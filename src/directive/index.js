import hasRole from "./permission/hasRole";
import hasPermi from "./permission/hasPermi";
import Vue from "vue";
const install = function (Vue) {
  Vue.directive("hasRole", hasRole);
  Vue.directive("hasPermi", hasPermi);
};
if (window.Vue) {
  window["hasRole"] = hasRole;
  window["hasPermi"] = hasPermi;
  Vue.use(install);
}
export default install;
