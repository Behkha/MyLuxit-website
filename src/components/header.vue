<template>
<div class="header">
  <div class="logo">

    <button class="toggle" :class="{active: menuState}" @click="menuState = !menuState">
      <svg class="icon-pack">
        <use xlink:href="../assets/icons.svg#menu-2"></use>
      </svg>
    </button>
    <router-link to="/">
      <img src="../assets/logo.png" alt="myluxit logo">
    </router-link>
    <app-search-bar-grey :number="0" class="main-search-small-size"></app-search-bar-grey>
    <!-- <button class="user" @click="user">
                <svg class="icon-pack">
                    <use xlink:href="../assets/icons.svg#profile"></use>
                </svg>
            </button> -->

  </div>

  <nav class="top-menu">
    <ul class="list">
      <li class="list__item" @click="menuState = false" :class="{active: menuState}">
        <router-link to="/">خانه</router-link>
      </li>

      <li class="list__item" @click="menuState = false" :class="{active: menuState}">
        <router-link to="/categories">دسته بندی</router-link>
      </li>

      <li class="list__item" @click="menuState = false" :class="{active: menuState}">
        <router-link to="/posts">پست ها</router-link>
      </li>
    </ul>
  </nav>

  <app-select-city-comp class="cities" :select_list="indexCities" :class="{active: menuState}"></app-select-city-comp>


  <app-search-bar-grey :number="1" class="main-search"></app-search-bar-grey>

  <!-- <div class="user" @click="user" :class="{active: menuState}">
            <svg class="icon-pack icon-user">
                <use xlink:href="../assets/icons.svg#profile"></use>
            </svg>
            <span class="name" v-if="loginState" >{{ userName }}</span>
            <span class="name" v-else>ورود / ثبت نام</span>
        </div> -->
</div>
</template>

<script>
import axios from 'axios'
import SelectCityComp from '@/components/select-city-comp.vue'
import SearchBarGrey from '@/components/searchbar-grey.vue'
import {
  mapMutations
} from 'vuex'

export default {
  data() {
    return {
      userName: '',
      menuState: false,
      btnDlState: true
    }
  },
  computed: {
    indexCities() {
      let data = this.$store.getters.indexCities.data
      let list = {
        default: 0,
        data: ['انتخاب شهر'],
        id: {
          'انتخاب شهر': ''
        }
      }
      for (let i in data) {
        list.data.push(data[i]['name'])
        list.id[data[i]['name']] = data[i]['id']
      }
      return list
    },
    loginState() {
      if (localStorage.token) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    appSelectCityComp: SelectCityComp,
    appSearchBarGrey: SearchBarGrey
  },
  methods: {
    ...mapMutations(['openQR']),
    downloadApp() {
      if (this.btnDlState === true) {
        this.openQR()
      }
    },
    user() {
      this.menuState = false
      if (localStorage.token) {
        this.$router.push('profile')
      } else {
        this.$router.push('login')
      }
    },
    localGetUserName() {
      if (localStorage.token) {
        axios.get('user/self')
          .then(res => {
            this.userName = res.data.name
          })
      }
    }
  },
  created() {
    this.$store.dispatch('getIndexCities')
    this.localGetUserName()
  }
}
</script>

<style lang="scss">
/********************* LAYOUTS *********************/

@mixin vartical-menu-item {
    display: none;
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    height: 6rem;

    border-radius: 0 !important;
    border-bottom: var(--border-grey-1);

    & > * {
        border-radius: 0 !important;
    }

    &.active {
        display: flex;
    }
}

@mixin menu-item-color {
    transition: all 0.5s;
    color: var(--color-grey-1);
    background-color: var(--color-grey-2);

    &:hover {
        background-color: var(--color-grey-4);
        color: var(--color-dark-1);
    }
}

.header {
    width: 100%;
    display: flex;
    align-items: center;
    height: 8rem;
    flex-wrap: wrap;
    position: relative;
    background-color: #000;

    & > * {
        display: flex;
        height: 5rem;
    }

    @media screen and (max-width: 1700px) {
        height: 7.5rem;
    }

    @media screen and (max-width: 960px) {
        height: auto;
        flex-direction: column;
        padding: 0;
        margin: 0;

        border-bottom: none;
    }

}

////////////////////// COMPONENTS //////////////////////

/////////////////////
//// LOGO

.logo {
    width: 80px;
    margin: 0 8rem 0 5rem;
    display: flex;
    align-items: center;

    img {
        width: 80px;

    }

    @media screen and (max-width: 1200px) {
        margin: 0 4rem;
    }

    @media screen and (max-width: 960px) {
        height: 6rem;
        width: 100%;
        padding: 0 2rem;
        margin: 0;
        border-radius: 0;
        border-bottom: var(--border-grey-1);

        img {
            margin-top: -7px;
            width: 60px;
        }

        a {
            margin: auto;
            // transform: translateX(-5rem);
        }
    }

    & .toggle {
        display: none;
        width: 6rem;
        height: 5rem;
        justify-content: center;
        align-items: center;

        border-radius: 0;
        background-color: #1a1a1a;
        border: var(--border-grey-1);
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            background-color: #1a1a1a;
        }

        &.active {
            background-color: #1a1a1a;
            svg {
                fill: #fff;
            }
        }

        @media screen and (max-width: 960px) {
            display: flex;
        }

    }

    & .user {
        display: none;
        width: 6rem;
        height: 5rem;
        justify-content: center;
        align-items: center;

        border-radius: 0;
        background-color: var(--color-grey-2);
        border: var(--border-grey-1);
        cursor: pointer;
        transition: all 0.3s;
        margin-left: 1rem;

        &:hover {
            background-color: var(--color-gray-5);
        }

        @media screen and (max-width: 960px) {
            display: flex;
        }

    }

}

/////////////////////
//// TOP MENU

.top-menu {
    display: flex;
    flex: 0 0 16%;
    align-items: center;
    font-size: 1.6rem;

    .list {
        list-style: none;
        display: flex;
        flex: 1;
        justify-content: space-between;
        @media screen and (max-width: 960px) {
            width: 100%;
            flex-direction: column;
        }
        &__item {
            height: 5rem;
            width: 100%;
            color: #bbbbbb;

            a {
                text-decoration: none;
                color: inherit;
                display: flex;
                width: 100%;
                height: 5rem;
                justify-content: center;
                align-items: center;
                &.router-link-exact-active {
                    color: white;
                }
            }
            @media screen and (max-width: 960px) {
                justify-content: center;
                align-items: center;
                cursor: pointer;
                @include vartical-menu-item;
                @include menu-item-color;
                background-color: #1a1a1a;
                &:not(:last-child) {
                    border-bottom: var(--border-grey-1) !important;
                }
            }
        }
    }

    @media screen and (max-width: 1800px) {
        flex: 0 0 16%;
    }

    @media screen and (max-width: 1100px) {
        flex: 0 0 19%;
    }

    @media screen and (max-width: 960px) {
        width: 100%;
        height: auto;
    }

}

/////////////////////
//// CITIES

.cities {
    margin: 0 6rem;
    width: 15rem;
    & > * {
        width: inherit;
    }

    @media screen and (max-width: 1600px) {
        margin-left: 4rem;
        margin-right: 4rem;
    }

    @media screen and (max-width: 960px) {
        @include vartical-menu-item;
    }

}

/////////////////////
//// BTN-DL

.btn-dl {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22rem;
    font-size: 1.8rem;

    border: none;
    border-radius: 100px;
    cursor: pointer;
    transition: all 1s;

    @include menu-item-color;

    span.txt-big-size {
        margin-right: 1.4rem;

        @media screen and (max-width: 960px) {
            display: none;
        }
    }

    span.txt-small-size {
        display: none;
        margin-right: rem;

        @media screen and (max-width: 960px) {
            display: block;
        }
    }

    svg.close {
        display: none;
    }

    @media screen and (max-width: 960px) {
        display: none;
        width: 100%;
        padding: 0;
        margin: 0;
        height: 20rem;
        justify-content: flex-start;
        order: 2;

        font-size: 2.6rem;
        border-radius: 0;
        border-bottom: var(--border-grey-1);

        svg {
            width: 4.4rem;
            height: 4.4rem;
            margin: 0 7%;

            &.close {
                display: block;
            }
        }

        &.active {
            display: flex;
        }
    }

    @media screen and (max-width: 600px) {
        height: 14rem;
        font-size: 2rem;

        svg {
            width: 3.2rem;
            height: 3.2rem;
            margin: 0 6%;
        }
    }

    @media screen and (max-width: 450px) {
        height: 12rem;
        font-size: 1.6rem;

        svg {
            width: 2.8rem;
            height: 2.8rem;
        }
    }
}

/////////////////////
//// MAIN SEARCH

.main-search {
    display: flex;
    margin-right: auto;
    height: 5rem;
    margin-left: 2rem;

    @media screen and (max-width: 960px) {
        display: none;
    }
}

.main-search-small-size {
    margin-left: 2rem;
    height: 5rem;
    display: none;

    @media screen and (max-width: 960px) {
        display: flex;
        margin-left: 0;
    }
}

/////////////////////
//// USER

.user {
    font-size: 1.4rem;
    margin-left: 14rem;
    padding: 0 1.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 100px;
    cursor: pointer;
    transition: all 1s;

    @include menu-item-color;

    @media screen and (max-width: 1800px) {
        margin-left: 8rem;
    }

    @media screen and (max-width: 1300px) {
        margin-left: 4rem;
    }

    @media screen and (max-width: 960px) {
        @include vartical-menu-item;
    }

    span.name {
        display: block;
        margin-right: 1.4rem;

        &.active {
            display: flex;
        }
    }
}
</style>
