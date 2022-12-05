<template>
<div class="place-content">
  <app-loader v-if="loader"></app-loader>
  <!---- slider and text section---->
  <div>
    <div id="example">
      <carousel-3d :autoplay="true" :autoplay-timeout="10000" :display="7" :perspective="0" width="800" height="600" :key="carousel_key">
        <slide v-for=" (image, k) in images" :index="k">
          <img :src="image" alt="">
        </slide>
      </carousel-3d>
    </div>
  </div>
  <div class="place-content__top-section" v-if="!loader">
    <!-- <app-art-slider :images="images"></app-art-slider> -->
    <div class="place-content__content">
      <div class="place-content__content__header">
        <div>
          <h3>{{ title }} <button> {{ type }} </button></h3>
          <div class="share-content">
            <!-- <div class="share-content__item" v-if="loginState">
              <svg id="bookmark" @click="localBookmark" :class="{isBookmarked: isBookmarked}">
                <use xlink:href="../assets/icons.svg#bookmark-white"></use>
              </svg>
            </div> -->
            <div class="share-content__item" :class="{active: shareBtnState}" @click="shareBtnState = !shareBtnState">
              <svg class="share">
                <use xlink:href="../assets/icons.svg#share"></use>
              </svg>
              <div class="share-links" v-if="shareBtnState">
                <a :href="telegram">
                  <svg class="icon-pack">
                    <use xlink:href="../assets/icons.svg#telegram"></use>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <!-- <div>
            <h4>امتیاز از 10</h4>
            <button class="ratings">{{ ratings }}</button>
          </div> -->
        </div>
      </div>
      <div class="place-content__content__txt">
        <pre>{{ content }}</pre>
      </div>
      <div class="info">

        <!-- <div class="info__item">
          <div class="info__item__icon">
            <svg>
              <use xlink:href="../assets/icons.svg#scroll"></use>
            </svg>
          </div>

          <div class="info__item__details">
            <h4 class="info__item__details__title">نویسنده</h4>
            <span class="info__item__details__type"> {{ author }} </span>
          </div>
        </div> -->


      </div>
    </div>
  </div>

  <!---- tabs ----->

  <div class="place-content__tabs" v-if="!loader">

    <div class="place-content__tabs__header">

      <button @click="setTab(0)" :class="{active: states[0]}" class="place-content__tabs__header__btn">
        <svg v-if="states[0]">
          <use xlink:href="../assets/icons.svg#document"></use>
        </svg>
        <span>جزئیات</span>
      </button>

      <!-- <button @click="setTab(1)" :class="{active: states[1]}" class="place-content__tabs__header__btn">
        <svg v-if="states[1]">
          <use xlink:href="../assets/icons.svg#calendar"></use>
        </svg>
        <span>رویداد ها</span>
      </button>

      <button @click="setTab(2)" :class="{active: states[2]}" class="place-content__tabs__header__btn">
        <svg v-if="states[2]">
          <use xlink:href="../assets/icons.svg#commenting"></use>
        </svg>
        <span>نظرات</span>
      </button> -->

      <!-- <button @click="setTab(3)" :class="{active: states[3]}" class="place-content__tabs__header__btn">
                        <svg v-if="states[3]">
                            <use xlink:href="../assets/icons.svg#placeholder"></use>
                        </svg>
                        <span>روی نقشه</span>
                    </button>

                    <button @click="setTab(4)" :class="{active: states[4]}" class="place-content__tabs__header__btn">
                        <svg v-if="states[4]">
                            <use xlink:href="../assets/icons.svg#gallery"></use>
                        </svg>
                        <span>گالری</span>
                    </button> -->


    </div>

    <div class="place-content__tabs__body">

      <!-------- tab 1 ---------->

      <div :class="{active: states[0]}" class="tab-1">
        <div class="tab-1__option" v-if="address">
          <div class="tab-1__option__icon-box">
            <svg class="phone">
              <use xlink:href="../assets/icons.svg#placeholder"></use>
            </svg>
          </div>

          <div class="tab-1__option__data">
            <span class="tab-1__option__data__label">آدرس</span>
            <span class="tab-1__option__data__value">
              {{ address }}
            </span>
          </div>
        </div>

        <div class="tab-1__option" v-if="tell">
          <div class="tab-1__option__icon-box">
            <svg>
              <use xlink:href="../assets/icons.svg#telephone"></use>
            </svg>
          </div>
          <div class="tab-1__option__data">
            <span class="tab-1__option__data__label">شماره تلفن</span>
            <span class="tab-1__option__data__value">
              {{ tell }}
            </span>
          </div>
        </div>
        <div class="tab-1__option" v-if="price">
          <div class="tab-1__option__icon-box">
            <img width="38" src="../assets/price-tag.svg" alt="">
          </div>
          <div class="tab-1__option__data">
            <span class="tab-1__option__data__label">قیمت</span>
            <span class="tab-1__option__data__value">
              {{ price | toCurrency}} تومان
            </span>
          </div>
        </div>
        <!-- <div class="info__item" v-if="price">
          <div class="info__item__icon">
            <img width="38" src="../assets/price-tag.svg" alt="">
          </div>
          <div class="info__item__details">
            <h4 class="info__item__details__title">قیمت</h4>
            <span class="info__item__details__type"> {{ price | toCurrency}} تومان</span>
          </div>
        </div> -->
        <div class="tab-1__option" v-if="schedule.length != 0">
          <div class="tab-1__option__icon-box">
            <svg>
              <use xlink:href="../assets/icons.svg#calendar"></use>
            </svg>
          </div>
          <div class="tab-1__option__data">
            <span class="tab-1__option__data__label">ساعت کاری</span>
            <span class="tab-1__option__data__value" v-for="(day, index) in schedule" :key="index">
              {{ index }} : {{ day }}
            </span>
          </div>
        </div>

      </div>
      <!-------- tab 2 ---------->

      <div :class="{active: states[1]}" class="tab-2">
        <div class="tab-2__message" v-if="events.length == 0">
          در حال حاضر در این مکان رویدادی در حال برگزاری نیست!
        </div>
        <app-post-comp v-for="(event, index) in events" :post_data="event" :type="'event'" :key="index"></app-post-comp>
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

        <div class="tab-3__add-comment" @click="goToLogin" v-if="!loginState">
          <span class="tab-3__add-comment__alert">برای ثبت نظر ابتدا وارد حساب کاربری خود شوید</span>
          <div class="tab-3__add-comment__login">
            <svg class="icon-pack icon-user">
              <use xlink:href="../assets/icons.svg#profile"></use>
            </svg>
            <span class="name">ورود / ثبت نام</span>
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
import loader from '../components/loader'
import axios from 'axios'
import {
  Carousel3d,
  Slide
} from 'vue-carousel-3d';
import VueRouter from 'vue-router'

export default {
  data() {
    return {
      carousel_key: '1',
      states: [true, false, false, false, false],
      title: '',
      content: '',
      auther: '',
      photographer: '',
      price: '',
      media: [],
      isBookmarked: false,
      ratings: '',
      address: '',
      tell: '',
      price: '',
      newComment: '',
      type: '',
      comments: [],
      schedule: [],
      events: [],
      shareBtnState: false,
      loader: true
    }
  },
  computed: {
    placeId() {
      return this.$route.query.id
    },
    images() {
      let temp = this.media
      let urls = []

      for (let i in temp) {
        if (temp[i]['path'].indexOf('://') < 0) {
          urls.push('http://' + temp[i]['path'])
        } else {
          urls.push(temp[i]['path'])
        }
      }

      return urls
    },
    url() {
      return 'http://myluxit.ir/' + 'place?id=' + this.placeId
    },
    loginState() {
      return this.$store.getters.loginState
    },
    twitter() {
      return 'https://twitter.com/intent/tweet?url=' + this.url
    },
    linkedin() {
      return 'https://www.linkedin.com/sharing/share-offsite/?url=' + this.url
    },
    telegram() {
      return 'https://telegram.me/share/url?url=' + this.url
    }
  },
  methods: {
    setTab(num) {
      this.states = [false, false, false, false, false];
      this.states[num] = true;
    },
    localGetPlaceContent() {
      axios.get(`places/${this.placeId}`)
        .then(
          res => {
            this.loader = false
            this.title = res.data.name
            this.content = res.data.content
            // this.author = res.data.authors[0].name
            // this.photographer = res.data.photographers[0].name
            this.media = res.data.media
            this.price = res.data.price
            // console.log(res.price);
            this.ratings = res.data.ratings
            this.isBookmarked = res.data.is_bookmarked

            if (res.data.hasOwnProperty('type')) {
              this.type = res.data.type.name
            }

            if (res.data.hasOwnProperty('address')) {
              this.address = res.data.address
            }

            if (res.data.hasOwnProperty('details')) {
              if (res.data.details.hasOwnProperty('tell')) {

                if (res.data.details.tell.hasOwnProperty('content')) {
                  this.tell = res.data.details.tell.content
                }

              }

              if (res.data.details.hasOwnProperty('schedule')) {

                if (res.data.details.schedule.hasOwnProperty('week_days')) {
                  this.schedule = res.data.details.schedule.week_days.fa
                }

              }
            }
          })
        .catch(err => console.log(err))
    },
    localGetPlaceComments() {
      axios.get(`places/${this.placeId}/comments`)
        .then(res => {
          this.comments = res.data.data
        })
        .catch(err => console.log(err))
    },
    localAddComment() {
      axios.post(`places/${this.placeId}/comments`, {
          content: this.newComment
        })
        .then(() => {
          this.localGetPlaceComments()
        })
        .catch(err => console.log(err))
    },
    localGetPlaceEvents() {
      axios.get(`places/${this.placeId}/events`)
        .then(res => {
          this.events = res.data
        })
        .catch(err => console.log(err))
    },
    localBookmark() {
      if (this.isBookmarked == false) {
        axios.post('user/bookmarks', {
            id: this.placeId,
            type: 'place'
          })
          .then(() => {
            this.isBookmarked = true
          })
          .catch(err => console.log(err))
      } else {
        axios.delete(`user/bookmarks/places/${this.placeId}`)
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
    appPostComp: PostComp,
    appLoader: loader,
    Carousel3d,
    Slide
  },
  created() {
    this.localGetPlaceContent()
    this.localGetPlaceComments()
    this.localGetPlaceEvents()
    setTimeout(s => {
      this.carousel_key = "2"
    }, 1000)

  }
}
</script>


<style lang="scss">
.place-content {
    padding-top: 5rem;
    width: 100%;
    background-color: #1a1a1a;
    &__top-section {
        width: 82%;
        margin: 0 9%;
        padding: 5rem 0;
        display: flex;
        @media screen and (max-width: 960px) {
            flex-direction: column;
        }
        .place-content__content {
            flex: 0 0 100%;
            background-color: #000;
            padding: 2rem;
            border-radius: 20px;
            // padding-right: 8rem;
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
                        position: relative;

                        border-radius: 100px;
                        cursor: pointer;

                        svg {
                            width: 3rem;
                            height: 3rem;
                            fill: var(--color-dark-3);

                            &.isBookmarked {
                                fill: #f09d0c;
                            }

                            &.share {
                                transform: translateX(-3px);
                            }
                        }

                        .share-links {
                            background-color: #fff;
                            position: absolute;
                            top: 100%;
                            left: 0;
                            border: var(--border-grey-1);
                            border-top-right-radius: 5px;
                            border-bottom-left-radius: 5px;
                            border-bottom-right-radius: 5px;
                            & > * {
                                padding: 1rem;
                            }
                            a:hover {
                                background-color: var(--color-grey-7);
                                svg {
                                    fill: var(--color-dark-2);
                                }
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
                    margin-right: 0.5em;
                    padding: 1rem 2rem;
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
                    color: #ffffff;
                }

            }

            &__txt {
                font-size: 1.7rem;
                color: var(--color-grey-1);
                line-height: 3.4rem;
            }

            .info {
                display: flex;
                flex: 0 0 100%;
                margin-top: 2rem;

                &__item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-left: 3rem;

                    &__icon {
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        width: 6rem;
                        height: 6rem;

                        background-color: #bbbbbb;
                        border-radius: 100%;

                        svg {
                            width: 3rem;
                            height: 3rem;
                            fill: #ffffff;
                        }
                    }

                    &__details {
                        display: flex;
                        flex-direction: column;
                        margin-right: 1.8rem;

                        &__title {
                            font-size: 1rem;
                            color: var(--color-dark-2);
                        }

                        &__type {
                            font-size: 1.8rem;
                            margin-top: 0.3rem;
                            color: #bbbbbb;
                        }
                    }
                }
            }
        }
    }

    &__tabs {
        width: 82%;
        margin: 0 9%;
        padding: 5rem 0;
        color: #ffffff;

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
                background-color: #000;
                border: none;
                margin-left: 0.8rem;
                cursor: pointer;

                border-top-left-radius: 5px;
                border-top-right-radius: 5px;

                svg {
                    width: 2rem;
                    height: 2rem;
                    margin-left: 1rem;
                    fill: #ffffff;

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

            background-color: #000000;
            border: #000;
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
                flex-wrap: wrap;
                justify-content: flex-start;

                font-size: 1.4rem;
                padding: 0 3rem 5rem;

                & > *:not(:nth-child(3n+1)) {
                    margin-right: 8%;
                    @media screen and (max-width: 900px) {
                        margin-right: 0;
                    }
                }

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

                        background-color: #1a1a1a;
                        border-radius: 50px;

                        svg {
                            width: 4rem;
                            height: 4rem;
                            fill: #ffffff;

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
                        margin-top: 3rem;
                    }

                    &__title {
                        font-size: 1.6rem;
                        color: #ffffff;
                    }

                    &__login {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 20rem !important;
                        margin-top: 2rem;
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
.carousel-3d-container {
    margin: 0 !important;
    .carousel-3d-slide {
        padding: 0;

        .title {
            font-size: 22px;
        }
        border-radius: 2em;
        border: 0;
    }
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
