<template>
<div class="posts-page">
  <div class="posts-page__header">
    <div class="posts-page__header__title">
      <h3>بهترین املاک لوکسیت</h3>
    </div>
    <div class="posts-page__header__options">
      <!-- <div class="posts-page__header__options__nav">
        <span>خانه / پست ها</span>
      </div> -->
      <!-- <div class="posts-page__header__options__sort">
                   <span>مرتب سازی</span>
                   <app-select-comp :select_list="sort_by"></app-select-comp>
               </div> -->
    </div>
  </div>

  <div class="posts-page__body">
    <app-post-comp v-for="(post, index) in indexPosts" :post_data="post.postable" :type="post.postable_type" :key="index"></app-post-comp>
  </div>

  <app-loader v-if="postsLoader"></app-loader>

  <div id="morePosts" class="posts-page__getMore" @click="morePosts">
    {{ message }}
  </div>
</div>
</template>

<script>
import PostComp from '../components/post-comp'
import selectComp from '../components/select-comp'
import loader from '../components/loader'

export default {
  components: {
    appPostComp: PostComp,
    appLoader: loader
    // appSelectComp: selectComp
  },
  data() {
    return {
      page: 1
      // sort_by: {default: 0, data: ['پربازدیدترین', 'جدیدترین', 'محبوب ترین'], dark: 1}
    }
  },
  computed: {
    postsLoader() {
      return this.$store.getters.postsLoader
    },
    city() {
      if (this.$store.getters.currentCityId) {
        let temp = '&city_id=' + this.$store.getters.currentCityId
        console.log(temp)
        return temp
      } else {
        return ''
      }
    },
    indexPosts() {
      return this.$store.getters.indexPosts
    },
    lastPage() {
      return this.$store.getters.lastPagePosts
    },
    message() {
      if (!this.lastPage) {
        return 'مشاهده موارد بیشتر'
      } else {
        return 'مورد بیشتری برای نمایش وجود ندارد'
      }
    }
  },
  watch: {
    city() {
      this.page = 1
      this.$store.commit('setLastPagePosts', false)
      this.$store.commit('setPostsLoader', true)
      this.$store.commit('resetIndexPosts')
      this.$store.dispatch('getIndexPosts', {
        page: this.page,
        city: this.city
      })
    }
  },
  methods: {
    morePosts() {
      this.page = this.page + 1

      if (!this.lastPage) {
        this.$store.commit('setPostsLoader', true)
        this.$store.dispatch('getIndexPosts', {
          page: this.page,
          city: this.city
        })
      }
    }
  },
  created() {
    this.$store.commit('setLastPagePosts', false)
    this.$store.commit('setPostsLoader', true)
    this.$store.commit('resetIndexPosts')
    this.$store.dispatch('getIndexPosts', {
      page: this.page,
      city: this.city
    })
  }
}
</script>


<style lang="scss">
.posts-page {
    width: 100%;
    padding: 1rem 2% 8rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
    background-color: #1a1a1a;

    @media screen and (max-width: 960px) {
        padding-bottom: 4rem;
    }

    &__header {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 8rem 0 0;

        &__title {
            display: flex;
            justify-content: center;

            h3 {
                font-size: 3rem;
                color: #ffffff;
            }
        }

        &__options {
            display: flex;
            justify-content: space-between;

            color: var(--color-dark-2);

            &__nav {
                font-size: 1.6rem;
                color: var(--color-grey-1);
            }

            &__sort {
                font-size: 1.6rem;
                display: flex;
            }
        }
    }

    &__body {
        display: flex;
        flex: 0 0 100%;
        flex-wrap: wrap;

        @media screen and (max-width: 960px) {
            justify-content: space-between;
        }

        & > *:not(:nth-child(3n+1)) {
            margin-right: 2%;

            @media screen and (max-width: 960px) {
                margin-right: 0;
            }
        }
    }

    &__getMore {
        display: flex;
        flex: 0 0 100%;
        justify-content: center;
        margin-top: 6rem;
        padding: 1rem;

        font-size: 1.5rem;
        cursor: pointer;
        border: var(--border-grey-1);
        border-radius: 10px;
        color: #1a1a1a;
        background-color: var(--color-grey-3);

        &:hover {
            background-color: var(--color-grey-7);
        }
    }

}
</style>
