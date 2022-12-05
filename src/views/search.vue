<template>
<div class="posts-page">
  <div class="posts-page__header">
    <div class="posts-page__header__title">
      <h3>نتایج جستجو</h3>
    </div>
  </div>

  <div class="posts-page__body" v-if="result.length > 0">
    <app-post-comp-type2 v-for="(post, index) in result" :post_data="post" :key="index"></app-post-comp-type2>
  </div>

  <div class="posts-page__body" v-else>
    <h3 class="message"> متاسفانه جستجو نتیجه ای در بر نداشت</h3>
  </div>



</div>
</template>

<script>
import postCompType2 from '../components/post-comp-type2'
import selectComp from '../components/select-comp'
import axios from 'axios'

export default {
  data() {
    return {
      result: []
      // sort_by: {default: 0, data: ['پربازدیدترین', 'جدیدترین', 'محبوب ترین'], dark: 1}
    }
  },
  components: {
    appPostCompType2: postCompType2
    // appSelectComp: selectComp
  },
  computed: {
    city() {
      let temp = '&city_id=' + this.$store.getters.currentCityId
      return temp
    },
    query() {
      return this.$route.query.query
    }
  },
  watch: {
    city() {
      this.result = []
      this.localGetIndexSearch()
    },
    query() {
      this.result = []
      this.localGetIndexSearch()
    }
  },
  methods: {
    localGetIndexSearch() {
      axios.get(`search/places?query=${this.query}`)
        .then(res => {
          console.log(res.data)
          this.result = res.data
          console.log(this.result);
        })
        .catch(err => console.log(err))
    }
  },
  mounted() {
    this.localGetIndexSearch()
  }
}
</script>


<style lang="scss">
// Search's style is common with post-page

h3.message {
    font-size: 2rem;
    margin-top: 4rem;
    color: var(--color-dark-2);
    width: 100%;
    text-align: center;
}
</style>
