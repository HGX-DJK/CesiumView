import { Router } from 'vue-router';

export function createRouterGuards(router: Router) {
  // 前置
  // router.beforeEach(async (to, from, next) => {
  //       next()
  // })

  // router.afterEach((to, _, failure) => {
  
  // })

  // 错误
  router.onError((error) => {
    console.log(error, '路由错误');
  });
}