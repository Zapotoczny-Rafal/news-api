<script setup lang="ts">
import { onMounted } from 'vue';
import { useNewsStore } from './stores/news'
import { storeToRefs } from 'pinia'

const newsStore = useNewsStore()
const { news } = storeToRefs(newsStore)
const { increasingPages } = newsStore

onMounted(() => {
  newsStore.fetchNews()
})

</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
      </nav>
      <div class="posts">
        <div class="post" 
        v-for="(post, index) in news.articles" :key="index">
          <img :src="post.urlToImage" :alt="post.source.name">
          <h2>{{ post.title }}</h2>
          <div class="post__content">
            <p>{{ post.description }}</p>
            <a :href="post.url"><p class="link">{{ post.source.name }}</p></a>
          </div>
          <div class="post__content_2">
            <h3>{{ post.author }}</h3>
            <small>{{ new Date(post.publishedAt).toLocaleString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        }) }}</small>
          </div>
        </div>
      </div>
      <div class="load">
        <button type="submit" class="btn" @click="increasingPages">Load more</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  margin: auto;
  line-height: 1.5;
  width: 90%;
}

header .post {
  width: 100%;
  height: auto;
  margin-bottom: 30px;
}

header .post .post__content, 
header .post .post__content_2{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

header .post img {
  border-radius: 15px;
  width: 100%;
}

header .post .link {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #ff1a66 0%, #ff5448 60%, #ff8448 100%);
  min-width: 70px;
  max-width: 90px;
  height: auto;
  margin: 0;
  padding: 4px;
  border-radius: 5px;
  margin-left: 12px;
}

header .load {
  display: flex;
  align-items: center;
  justify-content: center;
}

header .load .btn {
  background: linear-gradient(135deg, #ff1a66 0%, #ff5448 60%, #ff8448 100%);
  height: auto;
  padding: 12px;
  border-radius: 5px;
  margin-bottom: 32px;
  border: none;
  font-size: large;
  cursor: pointer;
}

@media (min-width: 1024px) {
  header .posts {
    display: grid;
    gap: 40px;
    grid-template-columns: repeat(2, 1fr);
    place-items: center;
  }
}
</style>
