<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{isLogin ? '登录' : '注册'}}
          </h1>
          <p class="text-xs-center">
            <nuxt-link v-if="!isLogin" to="/login">已有账户?</nuxt-link>
            <nuxt-link v-else to="/register">去注册一个?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">
                {{field}} {{message}}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">

            <fieldset class="form-group" v-if="!isLogin">
              <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="昵称" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="邮箱" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="密码" required>
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? '登录' : '注册' }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user'

// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'LoginPage',
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  },

  data () {
    return {
      user: {
        // username: 'happy-123456789',
        // email: '111@123.com',
        // password: '123456789'
        // https://www.google.com/imgres?imgurl=https%3A%2F%2Ftwgreatdaily.com%2Fimages%2Felastic%2F4_H%2F4_HheXABgx9BqZZI6Aax.jpg&imgrefurl=https%3A%2F%2Ftwgreatdaily.com%2FT5WxTHABjYh_GJGVfwi8.html&tbnid=w80OZDXzyrwz5M&vet=12ahUKEwiWktG51o7wAhVM7JQKHYMcCjMQMygjegUIARD_AQ..i&docid=Dkcgc8SR6L8DGM&w=640&h=640&q=%E5%8D%A1%E9%80%9A%E5%A4%B4%E5%83%8F&ved=2ahUKEwiWktG51o7wAhVM7JQKHYMcCjMQMygjegUIARD_AQ
        // What u believe makes who u are!
        username: '',
        email: '',
        password: ''
      },
      errors: {}
    }
  },

  methods: {
    async onSubmit() {
      try {
        const { data } = this.isLogin
        ? await login({
          user: this.user
        })
        : await register({
          user: this.user
        })
        
         this.$store.commit('setUser', data.user)

         // 为了防止刷新页面数据丢失，我们需要把数据持久化
        Cookie.set('user', data.user)

         // 跳转到首页
        this.$router.push('/')

      } catch (error) {
        this.errors = err.response.data.errors
      }
      
    }
  }

}
</script>

<style>

</style>

