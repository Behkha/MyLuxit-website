<template>
<div class="category_places-page">
  <div class="category_places-page__header">
    <div class="category_places-page__header__title">
      <div class="category_places-page__header__title__nav">
        <span> دسته بندی ها / {{ thisCategoryName }} </span>
      </div>
      <h3>{{ thisCategoryName }} </h3>
    </div>
    <div class="category_places-page__header__options">
      <!-- <div class="category_places-page__header__options__right-side">
        <div class="cat-select" :class="{active: tabState}" @click="tabState = true">
          <svg>
            <use xlink:href="../assets/icons.svg#placeholder-filled-point"></use>
          </svg>
          <span class="cat-select__label">نقشه</span>
        </div>
        <div class="cat-select" :class="{active: !tabState}" @click="tabState = false">
          <svg>
            <use xlink:href="../assets/icons.svg#menu-1"></use>
          </svg>
          <span class="cat-select__label">پیش فرض</span>
        </div>
      </div> -->
      <!-- <div class="category_places-page__header__options__sort">
                   <span class="label">مرتب سازی</span>
                   <app-select-comp :select_list="sort_by"></app-select-comp>
               </div> -->
    </div>
  </div>

  <div class="category_places-page__map" v-if="tabState">
    <div :class="{active: tabState}">map</div>
  </div>

  <div class="category_places-page__body" v-if="!tabState">
    <app-post-comp-type2 v-for="(post, index) in categoryPosts" :post_data="post" :key="index"></app-post-comp-type2>
    <app-loader v-if="categoryPostsLoader"></app-loader>

    <div id="morePosts" class="category_places-page__body__getMore" v-if="!tabState" @click="morePosts">
      {{ message }}
    </div>
  </div>

</div>
</template>

<script>
import postCompType2 from '../components/post-comp-type2'
import selectComp from '../components/select-comp'
import loader from '../components/loader'

import VueRouter from 'vue-router'

export default {
  components: {
    appPostCompType2: postCompType2,
    appLoader: loader
    // ,appSelectComp: selectComp
  },
  data() {
    return {
      // sort_by: {default: 0, data: ['پربازدیدترین', 'جدیدترین', 'محبوب ترین'], dark: 1},
      tabState: false,
      page: 1
    }
  },
  computed: {
    categoryPostsLoader() {
      return this.$store.getters.categoryPostsLoader
    },
    categoryId() {
      return this.$route.query.id
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
    lastPage() {
      return this.$store.getters.lastPageCategoryPosts
    },
    categoryPosts() {
      return this.$store.getters.categoryPosts
    },
    thisCategoryName() {
      return this.$store.getters.categoriesName[this.categoryId]
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
      this.$store.commit('setLastPageCategoryPosts', false)
      this.$store.commit('setCategoryPostsLoader', true)
      this.$store.commit('resetCategoryPosts')
      this.$store.dispatch('getCategoryPosts', {
        categoryId: this.categoryId,
        page: this.page,
        city: this.city
      })
    }
  },
  methods: {
    morePosts() {
      this.page = this.page + 1

      if (!this.lastPage) {
        this.$store.commit('setCategoryPostsLoader', true)
        this.$store.dispatch('getCategoryPosts', {
          categoryId: this.categoryId,
          page: this.page,
          city: this.city
        })
      }
    }
  },
  created() {
    this.$store.commit('setLastPageCategoryPosts', false)
    this.$store.commit('setCategoryPostsLoader', true)
    this.$store.dispatch('getIndexCategories')
    this.$store.commit('resetCategoryPosts')
    this.$store.dispatch('getCategoryPosts', {
      categoryId: this.categoryId,
      page: this.page,
      city: this.city
    })
  }
}
</script>


<style lang="scss">
.category_places-page {
    width: 100%;
    padding: 0 7% 14rem;
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
            align-items: center;
            position: relative;

            h3 {
                font-size: 3rem;
                color: #ffffff;
                margin-bottom: 2rem;

                @media screen and (max-width: 960px) {
                    margin-bottom: 4rem;
                }
            }

            &__nav {
                font-size: 1.6rem;
                color: var(--color-grey-1);
                position: absolute;
                right: 0;
                bottom: 0;

                @media screen and (max-width: 960px) {
                    bottom: -2rem;
                }
            }
        }

        &__options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 4rem;

            color: var(--color-dark-2);

            &__right-side {

                display: flex;

                .cat-select {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 6rem;
                    padding: 0 1.75rem;
                    margin-left: 1rem;

                    border-radius: 100px;
                    background-color: var(--color-grey-3);
                    color: var(--color-dark-2);
                    border: var(--border-grey-1);
                    cursor: pointer;
                    transition: all 0.4s;

                    &:hover {
                        background-color: var(--color-grey-4);
                    }

                    &.active {
                        background-color: var(--color-dark-2);
                        color: #fff;
                        border: none;

                        & .cat-select__label {
                            display: inline;
                        }

                        svg {
                            fill: #fff;
                        }
                    }

                    &__label {
                        margin-right: 1rem;
                        display: none;

                        font-size: 1.4rem;
                    }

                    svg {
                        width: 2.5rem;
                        height: 2.5rem;

                        fill: var(--color-dark-2);
                    }
                }
            }

            &__sort {
                font-size: 1.8rem;
                display: flex;

                .label {
                    width: 18rem;
                    display: flex;
                    align-items: center;
                }
            }
        }
    }

    &__body {
        display: flex;
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

}
</style>
