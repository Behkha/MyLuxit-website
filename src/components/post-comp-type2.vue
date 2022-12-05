<template>
<router-link class="post-comp" :to="{path: path, query: {id: post_data['id']}}">
  <img class="post-comp__img" :src="imgUrl">
  <h3 class="post-comp__title"> {{ title }} </h3>
  <span class="post-comp__txt"> {{ post_data['subtitle']}} </span>
</router-link>
</template>

<script>
export default {
  props: ['post_data'],
  computed: {
    title() {
      if (this.post_data['name']) {
        return this.post_data['name']
      } else {
        return this.post_data['title']
      }
    },
    imgUrl() {
      if (this.post_data.media[0].path.indexOf('://') < 0) {
        return 'http://' + this.post_data.media[0].path
      } else {
        return this.post_data.media[0].path
      }
    },
    path() {
      if (this.post_data['postable_type'] == 'place') {
        return 'place'
      } else if (this.post_data['postable_type'] == 'event') {
        return 'event'
      }
    }

  }
}
</script>



<style lang="scss">
.post-comp {
    margin-top: 1.8vw;
    position: relative;
    display: flex;
    flex: 0 0 32%;

    height: 17.92vw;
    color: #fff;
    border-radius: 10px;

    cursor: pointer;

    @media screen and (max-width: 960px) {
        flex: 0 0 48%;
        height: 26.88vw;
        margin-top: 3vw;
    }

    @media screen and (max-width: 600px) {
        flex: 0 0 100%;
        height: 56vw;
        margin-top: 6vw;
    }

    &:hover {
        img {
            filter: grayscale(50%);
        }
    }

    &.long-post {
        height: 37.6vw !important;
    }

    &__title {
        position: absolute;
        font-size: 2rem;
        bottom: 7rem;
        right: 3rem;
        text-shadow: 0.4rem 0.4rem 0.6rem rgb(100, 100, 100);
    }

    &__txt {
        position: absolute;
        font-size: 1.4rem;
        bottom: 4rem;
        right: 3rem;
        text-shadow: 0.4rem 0.4rem 0.4rem rgb(100, 100, 100);
    }

    &__img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        transition: all 1s;
    }

    &.type-2 {
        height: 100%;
    }
}
.post-comp-type2 {
    margin-top: 1.8vw;
    display: flex;
    flex-direction: column;
    flex: 0 0 32%;

    background-color: #fff;
    border-radius: 10px;
    box-shadow: 1rem 1rem 2rem var(--color-grey-3);
    text-decoration: none;
    cursor: pointer;

    @media screen and (max-width: 960px) {
        flex: 0 0 48%;
        // height: 26.88vw;
        margin-top: 3vw;
    }

    @media screen and (max-width: 600px) {
        flex: 0 0 100%;
        // height: 56vw;
        margin-top: 6vw;
    }

    &:hover {
        img {
            filter: grayscale(50%);
        }
    }

    &__title {
        margin: 1.6rem 3rem 0 0;

        font-size: 1.6rem;
        color: var(--color-dark-2);
    }

    &__txt {
        margin: 1rem 3rem 2rem 0;

        font-size: 1.4rem;
        color: var(--color-grey-1);
    }

    &__img {
        width: 100%;
        height: 17.92vw;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        transition: all 1s;

        @media screen and (max-width: 960px) {
            height: 26.88vw;
        }

        @media screen and (max-width: 600px) {
            height: 56vw;
        }
    }

    &.type-2 {
        height: 18vw;
    }
}
</style>
