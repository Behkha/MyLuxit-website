<template>
    <div class="categories-page">
        <app-loader v-if="categoriesLoader"></app-loader>
        <div class="categories-page__header">
            <div class="categories-page__header__options">
               <div class="categories-page__header__options__nav">
                   <span> دسته بندی ها </span>
               </div>
               <!-- <div class="categories-page__header__options__sort">
                   <span>مرتب سازی</span>
                   <app-select-comp :select_list="sort_by"></app-select-comp>
               </div> -->
           </div>
        </div>

        <div class="categories-page__body">
            <app-category-comp v-for="(cat, index) in indexCategories" :cat_data="cat" :key="index"></app-category-comp>
        </div>

    </div>
</template>

<script>
import CategoryComp from '../components/category-comp'
import selectComp from '../components/select-comp'
import loader from '../components/loader'

export default {
    components: {
        appCategoryComp: CategoryComp,
        appLoader: loader
        // ,appSelectComp: selectComp
    },
    data(){
		return {
            loader: true
            // ,sort_by: {default: 0, data: ['پربازدیدترین', 'جدیدترین', 'محبوب ترین'], dark: 1}
		}
    },
    computed: {
        indexCategories() {
            return this.$store.getters.indexCategories
        },
        categoriesLoader() {
            return this.$store.getters.categoriesLoader
        }
    },
    created(){
        this.$store.commit('setCategoriesLoader', true)
        this.$store.dispatch('getIndexCategories')
    }
}
</script>

<style lang="scss">
.categories-page {
    width: 100%;
    padding: 0 2% 14rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
    background-color: #1a1a1a;

    @media screen and (max-width: 960px){
        padding-bottom: 4rem;
    }

    &__header {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 8rem 0 0rem 0;

        &__title {
            display: flex;
            justify-content: center;

            h3 {
                font-size: 2.2rem;
                color: var(--color-dark-3)
            }
        }

        &__options {
            display: flex;
            justify-content: center;

            color: var(--color-dark-2);

            &__nav {
                display: flex;
                align-items: center;
                font-size: 3rem;
                color: #ffffff;
            }

            &__sort {
                font-size: 1.6rem;
            }
        }
    }

    &__body {
        display: flex;
        flex-wrap: wrap;

        @media screen and (max-width: 960px){
            justify-content: space-between;
        }
        
        &>*:not(:nth-child(3n+1)){
            margin-right: 2%;

            @media screen and (max-width: 960px){
                margin-right: 0;
            }
        }
    }
}
</style>

