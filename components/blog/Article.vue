<template>
  <li class="masonry__item">
    <article class="blog__post article" :class="{'article--big': index + 1 === 1 || index + 1 === 6}">
      <div class="article__info">
        <div class="article__info-title">
          {{ title[locale] }}
        </div>
        <time class="article__info-time">
          {{ timeStamp | dateFilter(locale) }}
        </time>
      </div>

      <div class="article__link">
        <nuxt-link class="btn btn--green btn--md1" :to="`/blog/${category.toLowerCase().split(' ').join('-')}/${title.en.toLowerCase().split(' ').join('-')}`">
          {{ 'reed_more' | localize(locale) }}
        </nuxt-link>
      </div>

      <img :src="picture" class="article__bg" alt="">
    </article>
  </li>
</template>

<script>
import dateFilter from '@/filters/date.filter'

export default {
  name: 'ArticleBlogPost',
  filters: {dateFilter},
  props: [
    'index',
    'timeStamp',
    'title',
    'picture',
    'category'
  ]
}
</script>
