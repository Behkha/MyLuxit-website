<template>
<div class="slider ">

  <div class="img-container">

    <ul class="selector">
      <li @click="setSlide(0)" :class="{active: states[0]}" class="selector__item"></li>
      <li @click="setSlide(1)" :class="{active: states[1]}" class="selector__item"></li>
      <li @click="setSlide(2)" :class="{active: states[2]}" class="selector__item"></li>
      <!-- <li @click="setSlide(3)" :class="{active: states[3]}" class="selector__item"></li> -->
    </ul>
    <img :class="{active: states[0]}" src="../assets/slider-1.jpg" alt="">
    <img :class="{active: states[1]}" src="../assets/slider-2.jpg" alt="">
    <img :class="{active: states[2]}" src="../assets/slider-3.jpg" alt="">
    <div class="txt-container">
      <h2 class="txt-container__title">
        لوکسیت، سیستم امن و مدیریت‌شده‌ی معاملات
      </h2>
      <p class="txt-container__content">
        لوکسیت، سیستم امن و مدیریت شده معاملات املاک درجه یک است که شما با کمک این سیستم میتوانید برای خرید ملک از قبیل ویلا، زمین، آپارتمان و ... که تمامی آنها از بالاترین کیفیت ممکن برخوردارند اقدام نمایید. همچنین شما میتوانید از همراه ساخت
        لوکسیت
        یکی از طرح ها و نقشه های موجود را انتخاب نمایید تا لوکسیت آنها را با بالاترین کیفیت برای شما اجرا کند. از طریق سیستم جستجوی سایت لوکسیت و دسته بندی های مدیریت شده در این بستر، ملک مورد نظر خود را پیدا کنید و پس از دریافت مشاوره از کارشناسان
        مجرب ما، برای خرید آن در بستری امن و با خیالی آسوده اقدام کنید.
      </p>

    </div>
  </div>
  <div class="txt-container txt-sm">
    <h2 class="txt-container__title">
      لوکسیت، سیستم امن و مدیریت‌شده‌ی معاملات
    </h2>
    <p class="txt-container__content">
      لوکسیت، سیستم امن و مدیریت شده معاملات املاک درجه یک است که شما با کمک این سیستم میتوانید برای خرید ملک از قبیل ویلا، زمین، آپارتمان و ... که تمامی آنها از بالاترین کیفیت ممکن برخوردارند اقدام نمایید. همچنین شما میتوانید از همراه ساخت
      لوکسیت
      یکی از طرح ها و نقشه های موجود را انتخاب نمایید تا لوکسیت آنها را با بالاترین کیفیت برای شما اجرا کند. از طریق سیستم جستجوی سایت لوکسیت و دسته بندی های مدیریت شده در این بستر، ملک مورد نظر خود را پیدا کنید و پس از دریافت مشاوره از کارشناسان
      مجرب ما، برای خرید آن در بستری امن و با خیالی آسوده اقدام کنید.
    </p>

  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      sliderTimer: 10000, //millisecond
      states: [false, false, true],
      currentSlide: 0
    }
  },

  methods: {
    resetStates() {
      this.states = [false, false, false]
    },
    setSlide(num) {
      this.resetStates();
      this.states[num] = true;
      this.currentSlide = num
    },
    next() {
      this.resetStates();
      this.currentSlide++;

      if (this.currentSlide >= this.states.length) {
        this.currentSlide = 0;
      }

      this.states[this.currentSlide] = true;
    }
  },
  mounted() {
    setInterval(this.next, this.sliderTimer)
  }
}
</script>

<style lang="scss">
.slider {
    font-size: 2rem;
    width: 100%;
    background: #1a1a1a;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    background-color: #1a1a1a;

    @media screen and (max-width: 960px) {
        padding: 0 5% 16rem 3%;
    }

    @media screen and (max-width: 600px) {
        padding: 2rem 7% 14rem;
    }

    .img-container {
        flex: 0 0 100%;

        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        @media screen and (max-width: 600px) {
            flex: 0 0 100%;
        }

        img {
            filter: brightness(50%);
            display: none;
            width: 100%;
            height: 40em;
            &.active {
                display: block;
            }
            @media screen and (max-width: 960px) {
                height: auto;
            }
        }

        .selector {
            display: flex;
            flex-direction: column;
            position: absolute;
            align-items: center;
            top: 104%;
            right: 50%;
            transform: translateX(50%);
            flex-direction: row-reverse;

            & > *:not(:last-child) {
                margin-right: 1rem;
            }
            @media screen and (max-width: 600px) {}

            &__item {
                background-color: var(--color-grey-4);
                display: block;
                width: 1rem;
                height: 1rem;
                border-radius: 1rem;
                margin-bottom: 1rem;
                cursor: pointer;

                &.active {
                    width: 1.5rem;
                    height: 1.5rem;
                    background-color: var(--color-dark-4);
                }
            }
        }
        .txt-container {
            @media screen and (max-width: 1088px) {
                display: none;
            }
        }
    }

    .txt-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 10rem;
        flex: 0 0 100%;
        position: absolute;
        top: 0;
        right: 5em;
        left: 5em;
        @media screen and (max-width: 960px) {
            flex: 0 0 50%;
        }

        @media screen and (max-width: 1088px) {
            flex: 0 0 100%;
            position: static;
        }

        &__title {
            font-size: 1.8rem;
            color: white;
            margin-bottom: 3rem;
            @media screen and (max-width: 1088px) {
                color: var(--color-dark-1);
            }
        }

        &__content {
            font-size: 1.6rem;
            color: white;
            line-height: 3.4rem;
            @media screen and (max-width: 1088px) {
                color: var(--color-dark-2);
            }
        }

        a.btn {
            display: inline-block;
            align-self: flex-end;
            margin-right: auto;
            margin-top: 7rem;
            text-decoration: none;
            font-size: 2rem;
            color: #fff;
            background-color: var(--color-dark-4);
            padding: 1.4rem 3rem;
            border: none;
            border-radius: 100px;
            cursor: pointer;
            transition: all 1s;
            &:hover {
                background-color: var(--color-dark-3);
            }
        }
    }
    .txt-sm {
        display: none;
        @media screen and (max-width: 1088px) {
            display: block;
        }
    }
}
</style>
