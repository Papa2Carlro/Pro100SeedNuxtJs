<template>
  <div>
    <Loader v-if="loader" color="#2B2B2B"/>

    <section v-else class="blog">
      <div class="blog__body">
        <BlogSidebar :nolocalize="true" link="/blog" :links="categories" class-name="blog__aside" />

        <main class="blog__main">
          <BlogMobileMenu/>

          <div class="blog__header">
            <div class="blog__header-title">
              {{ 'blog_title' | localize(locale) }}
            </div>

            <div class="blog__header-text">
              {{ 'blog_info' | localize(locale) }}
            </div>
          </div>

          <ul
            v-for="group in visible"
            :key="group"
            class="blog__list masonry"
            :class="{'masonry--short': group.length > 2 && group.length <= 4, 'masonry--short-6': group.length > 4 && group.length <= 6, 'masonry--short-2': group.length <= 2}"
          >
            <Article
              v-for="(article, index) in group"
              :key="article._id"
              :index="index"
              :title="article.title"
              :picture="article.picture"
              :category="article.category"
              :time-stamp="article.timeStamp"
            />
          </ul>

          <LoaderPost :visible="loaderPost"/>
        </main>
      </div>

      <div class="blog__bg"/>
    </section>
  </div>
</template>
<script>
import BlogSidebar from '@/components/Sidebar.vue'

import BlogMobileMenu from '@/components/blog/MobileMenu'
import Loader from '@/components/ui/Loader'
import Article from '@/components/blog/Article'
import LoaderPost from '@/components/ui/LoaderPost'

export default {
  name: 'Blog',
  components: {
    LoaderPost,
    BlogSidebar,
    BlogMobileMenu,
    Loader,
    Article
  },
  async asyncData ({$http, params, error}) {
    try {
      const res = await $http.$get('/api/post/all')

      if (res.ok) {
        const post = await res.body.filter((post) => {
          const categoryUrl = post.category.toLowerCase().split(' ').join('-')

          return params.category === categoryUrl
        })

        if (post.length === 0) { throw 'Not Found' }
      }
    } catch (err) {
      error({
        statusCode: 404,
        message: err
      })
    }
  },
  data: () => ({
    loader: true,
    posts: [],
    visible: [],
    page: 0,

    loaderPost: true,

    categories: []
  }),
  async created () {
    await this.$store.dispatch('blog/setPosts')
    await this.getCategory()
    await this.$store.commit('blog/setPagination', this.$route.params.category.split('-').join(' '))
    this.posts = await this.$store.getters['blog/getPosts']

    this.visible.push(this.posts[0])

    this.loader = false
  },
  mounted () {
    window.addEventListener('scroll', this.scrollHandler)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    async getCategory () {
      const category = await this.$store.getters['blog/getCategory']

      if (category.length === 0) {
        await this.$store.commit('blog/collectCategory')
        this.categories = await this.$store.getters['blog/getCategory']
      }

      this.categories = category
    },
    async loadMoreHandler () {
      this.loaderPost = false

      await this.visible.push(this.posts[++this.page])

      this.loaderPost = true
    },
    scrollHandler () {
      if (this.page + 1 === this.posts.length) {
        return
      }

      const {outerHeight, scrollY} = window
      const {offsetHeight} = document.body

      if (scrollY + outerHeight >= offsetHeight) {
        this.loadMoreHandler()
      }
    }
  }
}
</script>
