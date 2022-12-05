<template>
    <router-link :to="{path: 'category-posts', query: {id: cat_data['id']}}" class="category-comp">
        <h3 class="category-comp__title">{{ cat_data['name'] }}</h3>
        <img class="category-comp__img" :src="imgUrl" :alt="cat_data['name']">
    </router-link>
</template>

<script>
export default {
    props: ['cat_data'],
    computed: {
        imgUrl(){
            let address = 'http://' + this.cat_data.image
            return address
        }
    }
}
</script>


<style lang="scss">

    .category-comp {
        
            flex: 0 0 32%;
            height: 17.92vw;
            margin-top: 1.8vw;
            position: relative;

            border-radius: 10px;
            color: #fff;

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
                    filter: grayscale(70%);
                }
            }

            &__title {
                position: absolute;
                text-align: center;
                font-size: 2rem;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-shadow: .4rem .4rem .6rem rgb(61, 61, 61);
                z-index: 100;
            }

            &__img {
                border-radius: 10px;
                width: 100%;
                height: 100%;
                transition: all 1s;
            }

    }

</style>
