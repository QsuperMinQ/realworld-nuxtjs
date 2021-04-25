<template>
    <div class="settings-page">
    <div class="container page">
        <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Your Settings</h1>

            <form @submit.prevent="onSubmit">
            <fieldset>
                <fieldset class="form-group">
                    <input v-model = 'userInfo.image' class="form-control" type="text" placeholder="URL of profile picture">
                </fieldset>
                <fieldset class="form-group">
                    <input v-model = 'userInfo.username' class="form-control form-control-lg" type="text" placeholder="Your Name">
                </fieldset>
                <fieldset class="form-group">
                    <textarea v-model = 'userInfo.bio' class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
                </fieldset>
                <fieldset class="form-group">
                    <input v-model = 'userInfo.email' class="form-control form-control-lg" type="text" placeholder="Email">
                </fieldset>
                <fieldset class="form-group">
                    <input v-model = 'userInfo.password' class="form-control form-control-lg" type="password" placeholder="Password">
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
import { mapState } from 'vuex';
import { update } from '@/api/user';

export default {
    name: 'SettingPage',
    computed: {
        ...mapState(['user'])
    },
    data () {
        return {
            userInfo: {
                image: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=a587b23df11f3a295a9dddcaac159007/500fd9f9d72a60590cfef2f92934349b023bba62.jpg',
                username: '',
                email: '',
                password: '',
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
            console.log('this.userInfo', this.userInfo)
            
            try {
                await update({
                    user: this.userInfo
                })

                // 跳转到首页
                this.$router.push('/')

            } catch (error) {
                this.errors = error.response.data.errors
            }
        
        }
    }
}
</script>

<style>

</style>