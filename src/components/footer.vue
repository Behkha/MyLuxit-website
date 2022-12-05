<template>
<div class="footer">

  <div class="footer__inside">
    <div class="footer__inside__section">
      <h3 class="about">درباره لوکسیت</h3>
      <p>
        لوکسیت، سیستم امن و مدیریت‌شده‌ی معاملات املاک درجه یک بوده که تحت این سیستم، کاربران قادر خواهند بود بهترین ملک موجود در بازار را مشاهده نموده و پس از مشاوره با کارشناسان لوکسیت و تحت نظر آن‌ها، برای معامله و خرید آن اقدام نمایند.
      </p>
    </div>

    <div class="footer__inside__section links">
      <!-- <h3>لینک ها</h3> -->
      <nav class="footer-nav">
        <router-link to="/aboutus">درباره ما</router-link>
        <router-link to="/categories">دسته بندی ها</router-link>
        <router-link to="/posts">پست ها</router-link>
        <!-- <router-link v-if="loginState" to="/profile">پروفایل من</router-link> -->
        <!-- <router-link v-else to="/login">ورود / ثبت نام</router-link> -->
      </nav>
    </div>
    <div class="footer__inside__section">
      <h3>شبکه های اجتماعی</h3>
      <div class="footer__social">
        <a href="https://www.instagram.com/myluxit/">
          <svg class="icon-pack" style="width: 3rem;">
            <use xlink:href="../assets/icons.svg#instagram-logo"></use>
          </svg>
        </a>
        <a href="https://t.me/myluxit">
          <svg class="icon-pack telegram" style="width: 3rem;">
            <use xlink:href="../assets/icons.svg#telegram"></use>
          </svg>
        </a>

      </div>
    </div>

    <div class="footer__inside__section">
      <!-- <h3>نمادها</h3>
      <a href="http://samandehi.ir" target="_blank">
        <img class="sign" src="../assets/namad-new.png" alt="samandehi.ir">
      </a> -->
    </div>
  </div>

  <div class="footer__copyright">طراحی و پیاده سازی وب سایت <a href='http://ratintech.com'> راتین تک </a></div>
</div>
</template>

<script>
import {
  mapMutations
} from 'vuex'

export default {
  computed: {
    loginState() {
      if (localStorage.token) {
        return true
      } else {
        return false
      }
    }
  },
  methods: mapMutations(['openQR'])
}
</script>

<style lang="scss">
.footer {
    display: flex;
    flex-direction: column;
    background: #1a1a1a;

    @media screen and (max-width: 1200px) {
        padding-right: 1rem;
        padding-left: 1rem;
    }

    @media screen and (max-width: 600px) {
        padding: 0 1rem;
    }

    &__inside {
        display: flex;
        justify-content: space-around;
        align-content: flex-start;
        flex-wrap: wrap;

        @media screen and (max-width: 960px) {
            margin-top: 10rem;
        }

        &__section {
            margin-top: 20rem;
            flex: 0 0 15%;

            font-size: 1.6rem;
            color: #bbbbbb;
            line-height: 3rem;

            @media screen and (max-width: 960px) {
                margin-right: 10%;
                margin-top: 4rem;
                flex: 0 0 30%;
            }

            @media screen and (max-width: 600px) {
                flex: 0 0 90%;
                margin-top: 4rem;
                text-align: center;
                margin-right: 0;
            }

            h3 {
                font-size: 2rem;
                color: #bbbbbb;
                margin-bottom: 2.4rem;

                &.dl {
                    margin-top: 1.4rem;
                }

                &.about {
                    display: block !important;
                }
            }

            a {
                display: block;
                text-decoration: none;
                color: inherit;
                margin: 2.2rem 0;

                @media screen and (max-width: 960px) {
                    margin: 1.2rem 0;
                }
            }

            a.btn {
                margin: 0;
                display: inline-block;
                padding: 1.4rem 3rem;
                border: none;
                border-radius: 100px;
                cursor: pointer;
                transition: all 1s;
                font-size: 1.8rem;
                color: #fff;
                background-color: var(--color-dark-4);

                @media screen and (max-width: 600px) {
                    padding: 1rem 1.8rem;
                    font-size: 1.7rem;
                }

                &:hover {
                    background-color: var(--color-dark-3);
                }

            }

            & .footer-nav {
                @media screen and (max-width: 600px) {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                }
            }

            @media screen and (max-width: 600px) {

                &.links {
                    margin-top: 6rem;
                    order: -1;
                }
            }

        }
    }

    &__social {
        display: flex;

        @media screen and (max-width: 600px) {
            justify-content: center;
        }

        .telegram {
            border-radius: 8px;
        }

        a {
            margin: 0 0.5rem 1rem;

            svg {
                height: 5.3rem;
                width: 5.3rem;
                fill: var(--color-dark-2);

                @media screen and (max-width: 600px) {
                    height: 4.2rem;
                    width: 4.2rem;
                }
            }
        }
    }
    &__copyright {
        display: flex;
        justify-content: center;
        margin: 7rem 0 5rem;
        font-size: 1.6rem;
        color: var(--color-dark-3);
        @media screen and (max-width: 600px) {
            margin: 2rem 0;
        }
        a {
            color: inherit;
            text-decoration: none;
            font-weight: bold;
            margin-right: 0.2em;
        }
    }
}
</style>
