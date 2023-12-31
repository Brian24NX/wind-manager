const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  user_routes: state => state.user.routes,
  errorLogs: state => state.errorLog.logs,
  routes: state => state.permission.routes,
  buttons: state => state.user.buttons,
  role_permissions: state => state.user.rolePermissions
}
export default getters
