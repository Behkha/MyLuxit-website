<template>
    <div class="aboutus-page">
        <app-loader v-if="aboutusLoader"></app-loader>
        <div class="aboutus-page__header">
            <div class="aboutus-page__header__options">
               <div class="aboutus-page__header__options__nav">
                   <span> درباره ما </span>
               </div>
               <!-- <div class="aboutus-page__header__options__sort">
                   <span>مرتب سازی</span>
                   <app-select-comp :select_list="sort_by"></app-select-comp>
               </div> -->
           </div>
        </div>

        <div class="aboutus-page__body">
            <div class="aboutus-page__body__txt-container">
                <h2 class="aboutus-page__body__txt-container__title">
                    لوکسیت، سیستم امن و مدیریت‌شده‌ی معاملات
                </h2>
                <p class="aboutus-page__body__txt-container__content">
                    لوکسیت، سیستم امن و مدیریت شده معاملات املاک درجه یک است که شما با کمک این سیستم میتوانید برای خرید ملک از قبیل ویلا، زمین، آپارتمان و ... که تمامی آنها از بالاترین کیفیت ممکن برخوردارند اقدام نمایید. همچنین شما میتوانید از همراه ساخت
                    لوکسیت
                    یکی از طرح ها و نقشه های موجود را انتخاب نمایید تا لوکسیت آنها را با بالاترین کیفیت برای شما اجرا کند. از طریق سیستم جستجوی سایت لوکسیت و دسته بندی های مدیریت شده در این بستر، ملک مورد نظر خود را پیدا کنید و پس از دریافت مشاوره از کارشناسان
                    مجرب ما، برای خرید آن در بستری امن و با خیالی آسوده اقدام کنید.
                </p>

            </div>
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
        indexaboutus() {
            return this.$store.getters.indexaboutus
        },
        aboutusLoader() {
            return this.$store.getters.aboutusLoader
        }
    },
    created(){
        this.$store.commit('setaboutusLoader', true)
        this.$store.dispatch('getIndexaboutus')
    }
}
</script>

<style lang="scss">
.aboutus-page {
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


        &__txt-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-top: 10rem;
            flex: 0 0 100%;
            
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






    }
}
</style>

