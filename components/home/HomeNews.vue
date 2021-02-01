<template>
  <section class="home-news">
    <div class="home__container">
      <SectionHeader :title="'home_news_title' | localize(locale)">
        {{ 'home_news_info' | localize(locale) }}
      </SectionHeader>

      <ul class="home-news__list masonry masonry--short">
        <Article
          v-for="(article, index) in posts"
          :key="article._id"
          :index="index"
          :title="article.title"
          :picture="article.picture"
          :category="article.category"
          :time-stamp="article.timeStamp"
        />
      </ul>

      <nuxt-link to="/blog" class="home-news__link btn btn--default btn--lg">
        {{ 'blog_open_blog' | localize(locale) }}
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import SectionHeader from '@/components/ui/SectionHeader'
import Article from '@/components/blog/Article'

export default {
  name: 'HomeNews',
  components: {Article, SectionHeader},
  data: () => ({
    posts: []
  }),
  async created () {
    await this.$store.dispatch('blog/setPosts')
    await this.$store.commit('blog/sortLastPost')
    this.posts = this.$store.getters['blog/getLastPost']
  }
}
</script>
