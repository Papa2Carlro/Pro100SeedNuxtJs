<template>
  <div>
    <Loader v-if="loader" color="#1A1A1A"/>

    <section v-else id="post">
      <div class="post grid" :class="{'grid--post': post.body.image.length > 1}">
        <div class="post__info grid--left">
          <div class="post__info-author">
            by {{ post.author }}
          </div>

          <div class="post__info-header">
            <div class="post__info-subTitle">
              {{ post.category }}
            </div>
            <time class="post__info-date">
              {{ post.timeStamp | DateFilter(locale) }}
            </time>
          </div>

          <div class="post__info-title">
            {{ post.title[locale] }}
          </div>

          <div class="editor" v-html="post.body.html[locale]"/>

          <div class="post__backBtn btn btn--default btn--lg2" @click="$router.go(-1)">
            {{ 'back_to' | localize(locale) }} {{ 'blog_back_to' | localize(locale) }}
          </div>
        </div>

        <div class="post__image grid--right">
          <img :src="post.body.image[0]" alt="">
        </div>

        <div v-if="post.body.image.length > 1" class="post__image grid--right-bottom">
          <img :src="post.body.image[1]" alt="">
        </div>
      </div>

      <BackBtn label="blog_back_to"/>
    </section>
  </div>
</template>

<script>
import BackBtn from '@/components/ui/BackBtn'
import Loader from '@/components/ui/Loader'

import DateFilter from '@/filters/date.filter'

export default {
  name: 'Post',
  components: {
    Loader,
    BackBtn
  },
  filters: {DateFilter},
  async asyncData ({$http, params, error}) {
    try {
      const res = await $http.$get('/api/post/all')

      if (res.ok) {
        const [post] = await res.body.filter((post) => {
          const postUrl = post.title.en.toLowerCase().split(' ').join('-')

          return params.title === postUrl
        })

        if (!post) { throw 'Not Found' }

        return {post}
      }
    } catch (err) {
      error({
        statusCode: 404,
        message: err
      })
    }
  },
  data: () => ({
    loader: true
  }),
  mounted () {
    this.loader = false
  }
}
</script>
