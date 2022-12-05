<template>
<div class="main">
  <app-slider></app-slider>

  <!-- start main posts -->

  <div class="m-posts">
    <div class="m-posts__header">
      <h2>همگام با بهترین‌های لوکسیت</h2>
      <span>به‌روزترین نمونه‌های املاک، هم‌اکنون در دسترس شماست!</span>
      <router-link class="posts-link" to="/posts">مشاهده همه پست ها
        <svg class="arrow">
          <use xlink:href="../assets/icons.svg#left-arrow"></use>
        </svg>
      </router-link>
    </div>
    <app-loader v-if="postsLoader"></app-loader>
    <div class="m-posts__header__message" v-if="!postsLoader && (mainPosts.length == 0)">موردی برای نمایش وجود ندارد!</div>
    <app-post-comp v-for="(m_post, index) in mainPosts" :post_data="m_post.postable" :type="m_post.postable_type" :key="index"></app-post-comp>
  </div>


  <!-- end main posts -->



  <!-- start main categiry -->

  <!-- <div class="m-categories">
    <div class="m-categories__header">
      <h2>دسته‌بندی‌های لوکسیت</h2>
      <span ملک آینده‌ی خود را در دسته‌بندی‌ها بیابید.</span> </div> <div class="m-categories__body">
        <app-loader v-if="categoriesLoader"></app-loader>
        <app-category-comp v-for="(cat, index) in filteredIndexCategories" :cat_data="cat" :key="index"></app-category-comp>
    </div>
    <router-link to="/categories" class="m-categories__btn">مشاهده دسته بندی ها</router-link>
  </div> -->
  <!-- end main category -->

  <!-- start download-block -->
  <!-- End download-block -->

</div>
</template>

<script>
import Slider from '../components/slider'
import PostComp from '../components/post-comp'
import CategoryComp from '../components/category-comp'
import loader from '../components/loader'

import axios from 'axios'

export default {
  name: 'main_page',
  data() {
    return {
      QRState: false,
      mainPosts: [],
      postsLoader: true
    }
  },
  computed: {
    categoriesLoader() {
      return this.$store.getters.categoriesLoader
    },
    filteredIndexCategories() {
      return this.$store.getters.filteredIndexCategories
    },
    city() {
      return this.$store.getters.currentCityId
    }
  },
  watch: {
    city() {
      this.postsLoader = true
      this.localGetPosts()
    }
  },
  components: {
    appSlider: Slider,
    appPostComp: PostComp,
    appCategoryComp: CategoryComp,
    appLoader: loader
  },
  methods: {
    openQR() {
      this.$store.commit('openQR')
    },
    localGetPosts() {
      axios.get(`posts?page=1&city_id=${this.city}`)
        .then(res => {
          this.postsLoader = false
          this.mainPosts = res.data.data.splice(0, 6)
        })
    }
  },
  mounted() {
    this.$store.commit('setCategoriesLoader', true)
    this.localGetPosts()
    this.$store.dispatch('getIndexCategories')
  }
}
</script>

<style lang="scss">
///////////////////////////
////// posts-block

.m-posts {
    display: flex;
    flex-wrap: wrap;
    padding: 7rem 2% 8rem;
    justify-content: space-between;
    background-color: #1a1a1a;

    &__header {
        flex: 0 0 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        h2 {
            font-size: 1.8rem;
            padding-bottom: 1rem;
            color: #ffffff;
        }

        span {
            font-size: 1.6rem;
            color: #bbbbbb;
        }

        .posts-link {
            display: flex;
            align-items: center;
            font-size: 1.8rem;
            text-decoration: none;
            position: absolute;
            left: 0;
            top: 1rem;
            color: var(--color-dark-2);
            transition: all 0.5s;

            &:hover {
                color: var(--color-dark-1) !important;

                svg {
                    fill: var(--color-dark-1) !important;
                }
            }

            @media screen and (max-width: 600px) {
                position: relative;
                margin-top: 1rem;
            }

            svg {
                width: 1.8rem;
                height: 1.8rem;
                margin-right: 1.2rem;

                fill: var(--color-dark-2);
                transition: all 0.5s;
            }
        }

        &__message {
            width: 100%;
            padding: 3rem 0 0;
            font-size: 1.6rem;

            color: var(--color-dark-2);
            text-align: center;
        }

    }

}

///////////////////////////
////// category-block

.m-categories {
    display: flex;
    flex-wrap: wrap;
    padding: 10rem 7% 13rem;
    flex-direction: column;
    background-color: var(--color-grey-2);

    & :nth-child(4) {
        display: none;

        @media screen and (max-width: 960px) {
            display: flex;
        }
    }

    &__header {
        flex: 0 0 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        margin-bottom: 2rem;

        h2 {
            font-size: 1.8rem;
            padding-bottom: 1rem;
            color: var(--color-dark-4);
        }

        span {
            font-size: 1.6rem;
            color: var(--color-dark-1);
        }

    }

    &__body {
        display: flex;
        flex-wrap: wrap;
        flex: 100%;
        justify-content: space-between;
    }

    &__btn {
        margin: 6rem auto 0;
        text-decoration: none;
        padding: 1.4rem 3rem;
        border: none;
        border-radius: 100px;
        cursor: pointer;
        transition: all 1s;
        font-size: 2rem;
        color: #fff;
        background-color: var(--color-dark-4);

        &:hover {
            background-color: var(--color-dark-3);
        }
    }
}

///////////////////////////
////// download-block

.download-block {
    width: 100%;
    padding: 14rem 7%;
    position: relative;
    display: flex;
    justify-content: space-around;

    font-size: 2rem;
    background-color: var(--color-grey-8);

    @media screen and (max-width: 960px) {
        padding: 0 4% 2rem;
    }

    @media screen and (max-width: 600px) {
        padding: 4rem 7%;
        flex-wrap: wrap;
    }

    .img-container {
        flex: 0 0 40%;

        display: flex;
        align-items: center;
        justify-content: center;

        @media screen and (max-width: 600px) {
            flex: 0 0 100%;
        }

        img {
            width: 100%;
        }
    }

    .txt-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 10rem;
        flex: 0 0 40%;

        @media screen and (max-width: 960px) {
            flex: 0 0 50%;
        }

        @media screen and (max-width: 600px) {
            flex: 0 0 100%;
        }

        &__title {
            font-size: 1.8rem;
            color: var(--color-dark-1);
            margin-bottom: 3rem;
        }

        &__content {
            font-size: 1.6rem;
            color: var(--color-grey-1);
            line-height: 3.4rem;
        }

        &__btn {
            align-self: flex-end;
            display: flex;
            align-items: center;
            margin: 6rem auto 0 0;
            padding: 1.4rem 3rem;

            text-decoration: none;
            border: none;
            border-radius: 100px;
            cursor: pointer;
            transition: all 1s;
            font-size: 2rem;
            color: #fff;
            background-color: var(--color-dark-4);

            &:hover {
                background-color: var(--color-dark-3);
            }
            svg {
                margin-left: 2rem;
                fill: #fff;
            }

        }
    }
}
</style>
