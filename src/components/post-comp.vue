<template>
<router-link class="post-comp" :to="{path: type, query: {id: this.post_data['id']}}">
  <img class="post-comp__img" :src="imgUrl">
  <h3 class="post-comp__title"> {{ title }} </h3>
  <span class="post-comp__txt"> {{ post_data['subtitle']}} </span>
</router-link>
</template>

<script>
export default {
  props: ['post_data', 'type'],
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
</style>
