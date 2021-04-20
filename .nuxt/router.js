import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _244044ce = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _6799a70e = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _e858f9cc = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _83b415cc = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _46f679c1 = () => interopDefault(import('../pages/setting' /* webpackChunkName: "" */))
const _3bddf848 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _b61f8f32 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _244044ce,
    children: [{
      path: "",
      component: _6799a70e,
      name: "home"
    }, {
      path: "/login",
      component: _e858f9cc,
      name: "login"
    }, {
      path: "/register",
      component: _e858f9cc,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _83b415cc,
      name: "profile"
    }, {
      path: "/setting",
      component: _46f679c1,
      name: "setting"
    }, {
      path: "/editor",
      component: _3bddf848,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _b61f8f32,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
