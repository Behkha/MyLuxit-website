<template>
<div class="search">
  <input type="text" class="search__input" @keyup.enter="input_focus" v-model="searchInput" :class="{active: btnState}">
  <button @click="input_focus" class="search__btn">
    <svg class="icon-pack " style="fill: white !important">
      <use xlink:href="../assets/icons.svg#search"></use>
    </svg>
  </button>
</div>
</template>

<script>
export default {
  props: ['number'],
  data() {
    return {
      btnState: false,
      searchInput: ''
    }
  },
  methods: {
    input_focus() {
      this.btnState = !this.btnState
      if (this.btnState) {
        document.getElementsByClassName('search__input')[this.number].focus()
      } else if (this.searchInput) {
        this.$router.push({
          path: 'search',
          query: {
            query: this.searchInput
          }
        })
      }
    }
  }
}
</script>



<style lang="scss">
/////////////////////
//// SEARCH

.search {
    color: var(--color-dark-3);
    display: flex;
    justify-content: center;
    align-items: center;

    &__btn {
        height: 100% !important;
        width: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--color-dark-3);
        margin-right: -2.5rem;

        border: none;
        border-radius: 100px;
        cursor: pointer;
        transition: all 1s;

        background-color: #1a1a1a;
        color: var(--color-grey-1);

        // @media screen and (max-width: 960px) {
        //     background-color: var(--color-grey-5);
        // }

    }

    &__input:focus {
        padding-left: 5rem;
        padding-right: 2rem;
        width: 18rem;
    }

    &__input {
        padding-left: 0;
        padding-right: 0;
        width: 0;
        border: none;
        border-top-right-radius: 100px !important;
        border-bottom-right-radius: 100px !important;
        height: 100%;
        background-color: #1a1a1a;
        transition: all 0.5s;
        margin-right: 3rem;
        &.active {
            width: 18rem;
        }

        &:focus,
        &:hover {
            background-color: #1a1a1a;
            color: white;
            margin-right: 0;
        }
    }
}
</style>
