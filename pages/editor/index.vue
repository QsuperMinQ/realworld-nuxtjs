<template>
    <div class="editor-page">
    <div class="container page">
        <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
            <form @submit.prevent="onSubmit">
                <fieldset>
                    <fieldset class="form-group">
                        <input v-model="article.title" type="text" class="form-control form-control-lg" placeholder="Article Title" required>
                    </fieldset>
                    <fieldset class="form-group">
                        <input v-model="article.description" type="text" class="form-control" placeholder="What's this article about?" required>
                    </fieldset>
                    <fieldset class="form-group">
                        <textarea v-model="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)" required></textarea>
                    </fieldset>
                    <fieldset class="form-group">
                        <input v-model="article.tagList" type="text" class="form-control" placeholder="Enter tags" required><div class="tag-list"></div>
                    </fieldset>
                    <button class="btn btn-lg pull-xs-right btn-primary">
                        Publish Article
                    </button>
                </fieldset>
            </form>
        </div>

        </div>
    </div>
    </div>
</template>

<script>
import { createArticle } from '@/api/article'

export default {
    middleware: 'authenticated',
    name:'EditorPage',
    data() {
        return {
            
            "article": {
                "title": "",
                "description": "",
                "body": "",
                "tagList": ''
            }
            
        }
    },

    methods: {
        async onSubmit() {
        this.article.tagList = this.article.tagList.split(',')
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