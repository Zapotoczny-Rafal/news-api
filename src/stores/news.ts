import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios"

export const useNewsStore = defineStore('news', () => {
  let news: any = ref([])
  let maxPerPage = ref(20)
  let apiKey = ref('127c09135def4717b4faf7788e0b1489')
  let country = ref('us')

  async function fetchNews(this: any) {

    const url = `https://newsapi.org/v2/top-headlines?` +
    'country=' + country.value +
    '&pageSize=' + maxPerPage.value +
    '&apiKey=' + apiKey.value

    try {
      const data = await axios.get(url)
        this.news = data.data
    }
    catch (err) {
      console.log(err)
    }
  }

  function increasingPages(this: any) {
    if (maxPerPage.value >= 100) {
      return;
    }
    maxPerPage.value += 20
    this.fetchNews()
    console.log(news)
  }
  
  return { news, fetchNews, increasingPages }
})
