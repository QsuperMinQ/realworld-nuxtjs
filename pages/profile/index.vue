<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{user.username}}</h4>
            <p>
              {{user.bio}}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow {{user.username}}
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link                  
                  class="nav-link"
                  :class="{
                    active: tab === 'my_articles'
                  }"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'my_articles'
                    }
                  }">My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link 
                  class="nav-link"
                  :class="{
                    active: tab === 'favorited_articles'
                  }"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'favorited_articles'
                    }
                  }">Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug">
            <div class="article-meta">
              <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }"><img :src="article.author.image" /></nuxt-link>
              <div class="info">
                <nuxt-link to="" class="author"></nuxt-link>
                <span class="date">{{article.createdAt}}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{
                name: 'article',
                params: {
                  slug: article.slug
                }
              }">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>


        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getArticles } from '@/api/article';

export default {
  middleware: 'authenticated',
  name: 'UserProfile',
  async asyncData ({route,query}) {
    const tab = query.tab || 'my_articles';
    const username = route.params.username;
    let data = tab == 'my_articles' ? 'author':  'favorited'
    const articleRes = await getArticles({
      [data]: username
    })
    const { articles, articlesCount } = articleRes.data

    return {
      tab,
      articles
    }
  },
  watchQuery: ['tab', 'name'],
  computed: {
      ...mapState(['user'])
  },
}
</script>

<style>

</style>
