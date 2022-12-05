<template>
<!-- To set the dark or light them use 1 and 0 for select_list['dark'] variable -->
<div class="select-city-comp" :class="{dark: select_list['dark'], light: !select_list['dark']}">
  <button class="select-city-comp__selected" :class="{active: state}" @click="state = !state">
    {{ select_list['data'][selected] }}
  </button>
  <ul class="select-city-comp__list" v-if="state">
    <li @click="selectFunc(0, 0)" class="select-city-comp__list__item" v-if="selected" :key="0">
      همه
    </li>
    <template v-for="(item, index) in select_list['data']">
      <li @click="selectFunc(item, index)" class="select-city-comp__list__item" v-if="index != selected && index != select_list.default" :key="index">
        {{ item }}
      </li>
    </template>
  </ul>
</div>
</template>

<script>
export default {
  props: ['select_list'],
  data() {
    return {
      selected: this.select_list['default'],
      state: false
    }
  },
  methods: {
    selectFunc(item, index) {
      if (item == 0) {
        this.$store.commit('setCurrentCityId', 0)
        this.selected = 0
        this.state = false
      } else {
        this.selected = index
        this.$store.commit('setCurrentCityId', this.select_list.id[item])
        this.state = false
      }
    }
  },
  mounted() {}
}
</script>
lex-direction: column;
    flex-wrap: wrap;

<style lang="scss">
.select-city-comp {
    position: relative;
    display: flex;
    width: 22rem;
    justify-content: center;
    align-items: center;

    &__selected {
        width: inherit;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        border: none;
        border-radius: 100px;
        cursor: pointer;

        font-size: 1.8rem;
        transition: all 0.5s;

        &.active {
            border-radius: 0;
        }
    }

    &__list {
        list-style: none;
        position: absolute;
        top: 100%;
        display: flex;
        flex-direction: column;
        z-index: 100000;
        font-size: 1.6rem;
        animation: key1 0.5s ease-out;
        @media(min-width: 960px) {
            flex-wrap: wrap;
            min-height: 10em;
            max-height: 20em;
            min-width: 35em;
        }
        &__item {
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 100000;
            height: 5rem;
            cursor: pointer;
            transition: all 1s;
        }
    }

    ////////////////////////
    ///// Light Style

    .light & {

        &__selected {
            color: var(--color-grey-1);
            background-color: #1a1a1a;
            &:hover {
                background-color: white;
                color: var(--color-dark-4);
            }
        }
        &__list {
            color: white;
            background-color: #1a1a1a;

            &__item {

                &:hover {
                    background-color: var(--color-grey-4);
                    color: var(--color-dark-4);
                }
            }
        }
    }
    ///// End Light Style

    ////////////////////////
    ///// Dark Style
    .dark & {

        &__selected {

            color: #fff;
            background-color: var(--color-dark-3);

            &:hover {
                background-color: var(--color-dark-2);
            }

        }

        &__list {

            color: #fff;
            :nth-child(even) {
                background-color: var(--color-dark-3);
            }

            :nth-child(odd) {
                background-color: var(--color-dark-1);
            }

            &__item {
                &:hover {
                    background-color: var(--color-dark-2);
                }
            }
        }
    }

    ///// End Dark Style
}

@keyframes key1 {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
