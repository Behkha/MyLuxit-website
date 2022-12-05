<template>
<div class="event-content">
  <!---- slider and text section---->

  <div class="event-content__top-section">
    <app-art-slider :images="images"></app-art-slider>

    <div class="event-content__content">
      <div class="event-content__content__header">
        <div>
          <h3>{{ title }}</h3>
          <div class="share-content">

            <div class="share-content__item" v-if="loginState">
              <svg id="bookmark" @click="localBookmark" :class="{isBookmarked: isBookmarked}">
                <use xlink:href="../assets/icons.svg#bookmark-white"></use>
              </svg>
            </div>

            <div class="share-content__item">
              <svg>
                <use xlink:href="../assets/icons.svg#share"></use>
              </svg>
            </div>

          </div>

        </div>

        <div>
          <button> {{ type }} </button>
          <div>
            <h4>امتیاز از 10</h4>
            <button class="ratings">{{ ratings }}</button>
          </div>
        </div>
      </div>
      <div class="event-content__content__txt">
        {{ content }}
      </div>
    </div>
  </div>

  <!---- tabs ----->

  <div class="event-content__tabs">

    <div class="event-content__tabs__header">

      <button @click="setTab(0)" :class="{active: states[0]}" class="event-content__tabs__header__btn">
        <svg v-if="states[0]">
          <use xlink:href="../assets/icons.svg#document"></use>
        </svg>
        <span>جزئیات</span>
      </button>

      <button @click="setTab(1)" v-if="place" :class="{active: states[1]}" class="event-content__tabs__header__btn">
        <svg v-if="states[1]">
          <use xlink:href="../assets/icons.svg#calendar"></use>
        </svg>
        <span>مکان</span>
      </button>

      <button @click="setTab(2)" :class="{active: states[2]}" class="event-content__tabs__header__btn">
        <svg v-if="states[2]">
          <use xlink:href="../assets/icons.svg#commenting"></use>
        </svg>
        <span>نظرات</span>
      </button>

      <button @click="setTab(3)" :class="{active: states[3]}" class="event-content__tabs__header__btn">
        <svg v-if="states[3]">
          <use xlink:href="../assets/icons.svg#placeholder"></use>
        </svg>
        <span>روی نقشه</span>
      </button>

      <button @click="setTab(4)" :class="{active: states[4]}" class="event-content__tabs__header__btn">
        <svg v-if="states[4]">
          <use xlink:href="../assets/icons.svg#gallery"></use>
        </svg>
        <span>گالری</span>
      </button>


    </div>

    <div class="event-content__tabs__body">

      <!-------- tab 1 ---------->

      <div :class="{active: states[0]}" class="tab-1">
        <div class="tab-1__option" v-if="address">
          <div class="tab-1__option__icon-box">
            <svg class="phone">
              <use xlink:href="../assets/icons.svg#eventholder"></use>
            </svg>
          </div>

          <div class="tab-1__option__data">
            <span class="tab-1__option__data__label">آدرس</span>
            <span class="tab-1__option__data__value">
              {{ address }}
            </span>
          </div>
        </div>

        <div class="tab-1__option" v-if="website">
          <div class="tab-1__option__icon-box">
            <svg>
              <use xlink:href="../assets/icons.svg#telephone"></use>
            </svg>
          </div>
          <div class="tab-1__option__data">
            <span class="tab-1__option__data__label">وبسایت</span>
            <span class="tab-1__option__data__value">
              <a :href="website">کلیک کنید</a>
            </span>
          </div>
        </div>


        <div class="tab-1__option" v-if="schedule.start">
          <div class="tab-1__option__icon-box">
            <svg>
              <use xlink:href="../assets/icons.svg#calendar"></use>
            </svg>
          </div>
          <div class="tab-1__option__data">
            <span class="tab-1__option__data__label">تاریخ شروع و پایان</span>
            <span class="tab-1__option__data__value">
              شروع در :
              {{ schedule.start }} <br>
              پایان در :
              {{ schedule.end }}
            </span>
          </div>
        </div>

      </div>
      <!-------- tab 2 ---------->

      <div :class="{active: states[1]}" class="tab-2" v-if="place">
        <app-post-comp :post_data="place" :type="'place'"></app-post-comp>
      </div>

      <!-------- tab 3 ---------->

      <div :class="{active: states[2]}" class="tab-3">
        <div class="tab-3__comments">
          <div class="tab-3__comments__message" v-if="comments.length == 0">
            نظری موجود نیست ، شما میتوانید اولین نظردهنده باشید!
          </div>
          <div class="tab-3__comments__item" v-for="(comment, index) in comments" :key="index">
            <div class="tab-3__comments__item__icon">
              <svg>
                <use xlink:href="../assets/icons.svg#icon-person_outline"></use>
              </svg>
            </div>
            <div class="tab-3__comments__item__name">
              <div> {{ comment.user.name }} </div>
              <div> {{ comment.created_at_fa_h }} </div>
            </div>
            <span class="tab-3__comments__item__txt">
              {{ comment.content }}
            </span>
          </div>

        </div>

        <div class="tab-3__add-comment" v-if="!loginState">
          <span class="tab-3__add-comment__alert">برای ثبت نظر ابتدا وارد حساب کاربری خود شوید</span>

          <div class="tab-3__add-comment__login">
            <svg class="icon-pack icon-user">
              <use xlink:href="../assets/icons.svg#profile"></use>
            </svg>
            <span class="name" @click="goToLogin">ورود / ثبت نام</span>
          </div>
        </div>
        <div class="tab-3__add-comment" v-else>
          <h3 class="tab-3__add-comment__title">شما هم میتوانید در مورد این مکان نظر دهید</h3>
          <textarea class="tab-3__add-comment__txt" v-model="newComment"></textarea>
          <button class="tab-3__add-comment__btn" @click.prevent="localAddComment">ثبت نظر</button>
        </div>
      </div>

      <!-------- tab 4 ---------->

      <div :class="{active: states[3]}" class="tab-4">
        Tab 4
      </div>

      <!-------- tab 5 ---------->

      <div :class="{active: states[4]}" class="tab-5">
        Tab 5
      </div>


    </div>
  </div>
</div>
</template>

<script>
import ArtSlider from '../components/art-slider'
import PostComp from '../components/post-comp'
import axios from 'axios'
import VueRouter from 'vue-router'

export default {
  data() {
    return {
      states: [true, false, false, false, false],
      title: '',
      content: '',
      media: [],
      isBookmarked: false,
      ratings: '',
      address: '',
      price: '',
      newComment: '',
      type: '',
      website: '',
      place: null,
      comments: [],
      schedule: {},
      events: []
    }
  },
  computed: {
    eventId() {
      return this.$route.query.id
    },
    images() {
      let temp = this.media
      let urls = []

      for (let i in temp) {
        urls.push(temp[i]['path'])
      }

      return urls
    },
    loginState() {
      return this.$store.getters.loginState
    }
  },
  methods: {
    setTab(num) {
      this.states = [false, false, false, false, false];
      this.states[num] = true;
    },
    localGetEventContent() {
      axios.get(`events/${this.eventId}`)
        .then(
          res => {
            this.title = res.data.title
            this.content = res.data.content
            this.media = res.data.media
            this.ratings = res.data.ratings
            this.isBookmarked = res.data.is_bookmarked

            if (1) {
              this.place = res.data.place
            }

            if (res.data.hasOwnProperty('type')) {
              if (res.data.type) {
                if (res.data.type.hasOwnProperty('name')) {
                  if (res.data.type.name) {
                    this.type = res.data.type.name
                  }
                }
              }
            }

            if (res.data.hasOwnProperty('address')) {
              if (res.data.address) {
                this.address = res.data.address
              }
            }

            if (res.data.hasOwnProperty('links')) {
              if (res.data.links) {
                if (res.data.links.hasOwnProperty('website')) {
                  if (res.data.links.website.hasOwnProperty('link')) {
                    this.website = res.data.links.website.link
                  }
                }

              }
            }

            if (res.data.hasOwnProperty('details')) {
              if (res.data.details.hasOwnProperty('duration')) {
                this.schedule.start = res.data.details.duration.starts_at_fa
                this.schedule.end = res.data.details.duration.ends_at_fa
              }
            }
          })
        .catch(err => console.log(err))
    },
    localGetEventComments() {
      axios.get(`events/${this.eventId}/comments`)
        .then(res => {
          this.comments = res.data.data
        })
        .catch(err => console.log(err))
    },
    localAddComment() {
      axios.post(`events/${this.eventId}/comments`, {
          content: this.newComment
        })
        .then(() => {
          this.localGetEventComments()
        })
        .catch(err => console.log(err))
    },
    localBookmark() {
      if (this.isBookmarked == false) {
        axios.post('user/bookmarks', {
            id: this.eventId,
            type: 'event'
          })
          .then(() => {
            this.isBookmarked = true
          })
          .catch(err => console.log(err))
      } else {
        axios.delete(`user/bookmarks/events/${this.eventId}`)
          .then(() => {
            this.isBookmarked = false
          })
          .catch(err => console.log(err))
      }
    },
    goToLogin() {
      this.$router.push('login')
    }
  },
  components: {
    appArtSlider: ArtSlider,
    appPostComp: PostComp
  },
  created() {
    this.localGetEventContent()
    this.localGetEventComments()
  }
}
</script>


<style lang="scss">
.event-content {
    width: 100%;
    background-color: var(--color-grey-8);

    &__top-section {
        width: 82%;
        margin: 5rem 9%;
        display: flex;

        @media screen and (max-width: 960px) {
            flex-direction: column;
        }

        .event-content__content {
            flex: 0 0 51%;
            padding-right: 8rem;

            @media screen and (max-width: 960px) {
                flex: 0 0 100%;
                padding-right: 0;
                padding-top: 2rem;
            }

            &__header {
                display: flex;
                flex-direction: column;
                margin-bottom: 2rem;
                color: var(--color-dark-1);

                .share-content {
                    display: flex;
                    align-items: stretch;

                    &__item {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 5rem;
                        width: 5rem;
                        margin-right: 1rem;

                        border-radius: 100px;
                        cursor: pointer;

                        &:hover {
                            background-color: var(--color-grey-4);
                        }

                        svg {
                            width: 3rem;
                            height: 3rem;
                            fill: var(--color-dark-3);

                            &.isBookmarked {
                                fill: #f09d0c;
                            }
                        }
                    }
                }

                div {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    &:first-child {
                        margin-bottom: 1.4rem;
                    }

                    div {
                        display: flex;

                        h4 {
                            padding-left: 1rem;
                            font-size: 1.6rem;
                            width: 10rem;
                        }
                    }
                }

                button {
                    padding: 1rem 1.4rem;
                    border: none;
                    border-radius: 100px;
                    cursor: pointer;
                    transition: all 1s;

                    &.ratings {
                        flex: 0 0 5rem;
                    }
                }

                h3 {
                    font-size: 2rem;
                }

            }

            &__txt {
                font-size: 1.7rem;
                color: var(--color-grey-1);
                line-height: 3.4rem;
            }
        }
    }

    &__tabs {
        width: 82%;
        margin: 5rem 9%;
        color: var(--color-grey-1);

        // @media screen and (max-width: 1800px) {
        //     width: 84%;
        //     margin: 0 7%;
        // }

        &__header {
            display: flex;
            align-items: flex-end;

            &__btn {
                display: flex;
                align-items: center;
                justify-content: center;

                font-size: 1.4rem;
                padding: 2rem 3rem;
                color: inherit;
                background-color: var(--color-grey-2);
                border: none;
                margin-left: 0.8rem;
                cursor: pointer;

                border-top-left-radius: 5px;
                border-top-right-radius: 5px;

                &.active {
                    transform: translate(0, 1px);
                    border-top: 3px solid var(--color-dark-1);
                    border-left: var(--border-grey-1);
                    border-right: var(--border-grey-1);
                }

                svg {
                    width: 2rem;
                    height: 2rem;
                    margin-left: 1rem;
                    fill: var(--color-dark-2);

                    @media screen and (max-width: 540px) {
                        margin-left: 0;
                        margin-bottom: 1rem;
                    }
                }

                @media screen and (max-width: 720px) {
                    margin-left: 3px;
                    padding: 1.4rem 0;
                    flex: 1;

                    &:last-child {
                        margin-left: 0;
                    }
                }

                @media screen and (max-width: 540px) {
                    height: 8rem;
                    padding: 1.2rem 0;
                    font-size: 1.2rem;
                    flex-direction: column;
                }
            }
        }

        &__body {

            background-color: var(--color-grey-2);
            border: var(--border-grey-1);
            border-radius: 5px;

            & > * {
                padding: 5vh 3%;
                display: none;

                &.active {
                    display: flex;
                }
            }

            .tab-1 {
                width: 100%;
                justify-content: space-between;
                flex-wrap: wrap;

                font-size: 1.4rem;
                padding: 0 3rem 5rem;

                @media screen and (max-width: 900px) {
                    flex-direction: column;
                }

                &.active {
                    display: flex;
                }

                &__option {
                    display: flex;
                    flex: 0 0 28%;

                    margin-top: 5rem;
                    align-content: center;

                    @media screen and (max-width: 900px) {
                        flex: 0 0 60%;
                        margin: 5rem 20% 0 !important;
                    }

                    @media screen and (max-width: 600px) {
                        flex: 0 0 80%;
                        margin: 5rem 10% 0 !important;
                    }

                    @media screen and (max-width: 450px) {
                        flex: 0 0 100%;
                        margin: 5rem 0 0 !important;
                    }

                    &__icon-box {
                        display: flex;
                        flex: 0 0 8rem;
                        height: 8rem;
                        justify-content: center;
                        align-items: center;

                        background-color: var(--color-grey-5);
                        border-radius: 5px;

                        svg {
                            width: 4rem;
                            height: 4rem;
                            fill: var(--color-dark-1);

                            &.phone {
                                width: 3rem;
                                height: 3rem;
                            }
                        }
                    }

                    &__data {
                        display: flex;
                        flex: 1;
                        flex-direction: column;

                        @media screen and (max-width: 900px) {
                            margin-right: 8rem;
                        }

                        @media screen and (max-width: 600px) {
                            margin-right: 6rem;
                        }

                        @media screen and (max-width: 400px) {
                            margin-right: 4rem;
                        }

                        &__label {
                            padding: 1rem 1.4rem;
                            font-weight: bold;
                        }

                        &__value {
                            padding: 1rem 1.4rem;

                            a {
                                text-decoration: none;
                                color: var(--color-dark-2);
                            }

                            @media screen and (max-width: 900px) {
                                margin: 0 0 0 auto;
                            }
                        }

                    }

                }
            }

            .tab-2 {

                width: 100%;
                flex-wrap: wrap;
                justify-content: space-between;

                font-size: 1.4rem;

                @media screen and (max-width: 900px) {
                    flex-direction: column;
                }

                &.active {
                    display: flex;
                }

            }

            .tab-3 {
                justify-content: space-between;
                font-size: 1.4rem;
                flex-wrap: wrap;

                &__comments {
                    display: flex;
                    flex: 0 0 50%;
                    flex-direction: column;

                    @media screen and (max-width: 960px) {
                        flex: 0 0 100%;
                    }

                    & > *:not(:first-child) {
                        margin-top: 2rem;
                    }

                    &__item {
                        display: flex;
                        padding: 2rem;
                        border-radius: 8px;

                        background-color: var(--color-grey-5);

                        &__icon {
                            display: flex;
                            height: 6rem;
                            flex: 0 0 6rem;

                            justify-content: center;
                            align-items: center;

                            background-color: var(--color-grey-4);
                            border-radius: 100px;
                            padding: 1rem;

                            svg {
                                width: 4rem;
                                height: 4rem;
                                fill: var(--color-dark-3);
                            }
                        }

                        &__name {
                            display: flex;
                            width: 14rem;
                            flex-direction: column;
                            font-size: 1.6rem;
                            line-height: 3rem;
                            margin: 0 2rem;
                        }

                        &__txt {
                            display: flex;
                            font-size: 1.6rem;
                            line-height: 3rem;
                            color: var(--color-dark-3);
                        }
                    }

                }

                &__add-comment {
                    flex: 0 0 40%;
                    flex-direction: column;

                    @media screen and (max-width: 960px) {
                        flex: 0 0 100%;
                    }

                    &__title {
                        font-size: 1.6rem;
                        color: var(--color-dark-3);
                    }

                    &__login {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 20rem !important;
                        height: 5rem;
                        border: 2px solid #ddd !important;
                        border-radius: 100px;
                        cursor: pointer;
                        background-color: var(--color-dark-1);
                        color: #fff;
                        transition: all 0.2s;

                        &:hover {
                            opacity: 0.8;
                        }

                        svg {
                            margin-left: 1.6rem;
                            fill: #fff;
                        }
                    }

                    &__alert {
                        display: inline-block;
                        font-size: 1.8rem;
                        color: var(--color-dark-2);

                        @media screen and (max-width: 960px) {
                            font-size: 1.4rem;
                            padding: 2rem 0;
                        }
                    }

                    &__btn {
                        display: flex;
                        @include btn-default;
                        @include btn-black;
                    }

                    &__txt {
                        width: 100%;
                        margin-top: 2rem;
                        margin-bottom: 2rem;
                        height: 14rem;
                    }

                }

            }

        }

    }
}
</style>
