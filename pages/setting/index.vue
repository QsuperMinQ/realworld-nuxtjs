<template>
    <div class="settings-page">
    <div class="container page">
        <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>

            <form @submit.prevent="onSubmit">
            <fieldset>
                <fieldset class="form-group">
                    <input class="form-control" type="text" placeholder="URL of profile picture">
                </fieldset>
                <fieldset class="form-group">
                    <input text = 'user.username' class="form-control form-control-lg" type="text" placeholder="Your Name">
                </fieldset>
                <fieldset class="form-group">
                    <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
                </fieldset>
                <fieldset class="form-group">
                    <input class="form-control form-control-lg" type="text" placeholder="Email">
                </fieldset>
                <fieldset class="form-group">
                    <input class="form-control form-control-lg" type="password" placeholder="Password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                    Update Settings
                </button>
            </fieldset>
            </form>

            <button  class="btn btn-lg btn-primary pull-xs-left" @click="logout">logout</button>
        </div>

        </div>
    </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'SettingPage',
    computed: {
        ...mapState(['user'])
    },
    data () {
        return {
            userInfo: {
                pic: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Ftwgreatdaily.com%2Fimages%2Felastic%2F4_H%2F4_HheXABgx9BqZZI6Aax.jpg&imgrefurl=https%3A%2F%2Ftwgreatdaily.com%2FT5WxTHABjYh_GJGVfwi8.html&tbnid=w80OZDXzyrwz5M&vet=12ahUKEwiWktG51o7wAhVM7JQKHYMcCjMQMygjegUIARD_AQ..i&docid=Dkcgc8SR6L8DGM&w=640&h=640&q=%E5%8D%A1%E9%80%9A%E5%A4%B4%E5%83%8F&ved=2ahUKEwiWktG51o7wAhVM7JQKHYMcCjMQMygjegUIARD_AQ',
                username: '',
                // email: user.email,
                // password: user.password,
                bio: ''
            }
        }
    },
    methods: {
        logout () {
            console.log('logout')
            this.$store.commit('setUser', null)
            // 跳转到首页
            this.$router.push('/')
        },
        async onSubmit() {
            
            try {
                await createArticle({
                    article: this.article
                })

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