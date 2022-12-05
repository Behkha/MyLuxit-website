<template>

        <!-- Tab section -->

        <div class="profile">
            <h2 class="profile__title">پروفایل من</h2>
            <button class="profile__exit" @click="exit">خروج</button>

                <div class="profile__header">

                    <button @click="setTab(0)" :class="{active: states[0]}" class="profile__header__btn">
                        <svg>
                            <use xlink:href="../assets/icons.svg#settings"></use>
                        </svg>
                        تنظیمات
                    </button>

                    <!-- <button @click="setTab(1)" :class="{active: states[1]}" class="profile__header__btn">
                        <svg>
                            <use xlink:href="../assets/icons.svg#prize"></use>
                        </svg>
                        جوایز
                    </button> -->

                    <button @click="setTab(2)" :class="{active: states[2]}" class="profile__header__btn">
                        <svg>
                            <use xlink:href="../assets/icons.svg#bookmark-white"></use>
                        </svg>
                        ذخیره شده
                    </button>
                </div>

                <div class="profile__body">

                    <div class="tabs">
                        <!-------- tab 1 ---------->

                        <div :class="{active: states[0]}" class="tab-1">

                            <div class="tab-1__block">

                                <div class="tab-1__option">
                                    <span>نام و نام خانوادگی</span>
                                    <input type="text" v-model="name">
                                </div>

                                <div class="tab-1__option">
                                    <span>شماره همراه</span>
                                    <input class="number" type="text" disabled v-model="tell">
                                </div>

                                <div class="tab-1__option">
                                    <span>جنسیت</span>
                                    <div  class="gender">
                                        <span>مرد</span>
                                        <div class="gender__switch" @click="gender = !gender" :class="{changed: gender}">
                                            <span class="gender__switch__state"></span>
                                            </div>
                                        <span>زن</span>
                                    </div>
                                </div>

                            </div>

                            <div class="tab-1__block">
                                <button @click="localSetUserData" class="btn">ذخیره اطلاعات</button>
                            </div>

                            <div class="tab-1__block message">
                                <div v-if="showSuccessState" class="successMessage">تنظیمات با موفقیت ذخیره شد</div>
                                <div v-if="showErrorState" class="errorMessage">مشکلی در ذخیره اطلاعات به وجود آمده است</div>
                            </div>

                        </div>

                        <!-------- tab 2 ---------->

                        <!-- <div :class="{active: states[1]}" class="tab-2">
                            <ul>
                                <li>
                                    <div class="title">نصب نسخه موبایل چارپایه</div>
                                        
                                    <div class="progress-bar">
                                        <div></div>
                                    </div>
                                    
                                    <div class="check active">
                                        &#10004;
                                    </div>
                                    
                                </li>

                                <li>
                                    <div class="title">دعوت 5 نفر از دوستان به چارپایه</div>
                                        
                                    <div class="progress-bar">
                                        <div></div>
                                    </div>

                                    <div class="check">
                                        &#10004;
                                    </div>

                                </li>

                                <li>
                                    <div class="title">آپلود عکس در نسخه موبایل</div>
                                        
                                    <div class="progress-bar">
                                        <div></div>
                                    </div>

                                    <div class="check">
                                        &#10004;
                                    </div>
                                </li>

                            </ul>

                            <div class="card">
                                <img src="../assets/card-prize.png" alt="">
                            </div>
                        </div> -->

                        <!-------- tab 3 ---------->

                        <div :class="{active: states[2]}" class="tab-3">
		                    <app-post-comp v-for="(bookmark, index) in userBookmarks" :post_data="bookmark.bookmarkable" :type="'place'" :key="index"></app-post-comp>
                        </div>

                    </div>
                </div>
            </div>
        
</template>

<script>
import PostComp from '../components/post-comp'
import axios from 'axios'
export default {
    name: 'profile',
    components: {
        appPostComp: PostComp
    },
    data(){
        return {
            states: [true, false, false],
            name: '',
            tell: '',
            gender: 0,
            showSuccessState: false,
            showErrorState: false,
            userBookmarks: []
        }
    }
    ,
    methods: {
        setTab (num) {
            this.states = [false, false, false]
            this.states[num] = true
        },
        exit(){
            localStorage.removeItem('token')
            this.$store.dispatch('getLoginState', false)
            this.$router.push('login')
        },
        localGetUserData(){
            axios.get('user/self').then(res => {
                this.name = res.data.name
                this.tell = res.data.tell
                this.gender = res.data.gender-1
            })
        },
        localSetUserData(){
            axios.put(`user/self?name=${this.name}&city_id=1&gender_id=${this.gender+1}`)
            .then(() => {
                this.showSuccess()
            })
            .catch(() => {
                this.showError()
            })
        },
        localGetBookmarks(){
            axios.get('user/bookmarks')
            .then(res => {
                this.userBookmarks = res.data.data
            })
            .catch(err => console.log(err))
        },
        showSuccess(){
            this.showSuccessState = true
            setTimeout(() => {
                this.showSuccessState = false
            }, 4000);
        },
        showError(){
            this.showErrorState = true
            setTimeout(() => {
                this.showErrorState = false
            }, 4000);
        }
    },
    created(){
        this.localGetUserData()
        this.localGetBookmarks()
    }
}
</script>


<style lang="scss">

.profile {
    padding: 7rem 0 7rem;
    width: 80%;
    margin: 0 10%;
    color: var(--color-grey-1);
    text-align: center;
    
    @media screen and (max-width: 1800px) {
        width: 84%;
        margin: 0 7%;
    }

    &__title {
        margin-bottom: 2.4rem;
        text-align: center;
        color: var(--color-dark-3);
    }

    &__exit{
        margin-bottom: 1.4rem;
        border: none;
        background-color: #fff;
        color: var(--color-grey-1);
        cursor: pointer;
    }

        

        &__header {
            margin: 0;
            display: flex;
            align-items: flex-end;

            &__btn {
                display: flex;
                align-items: center;
                justify-content: center;
        
                font-size: 1.4rem;
                padding: 2rem 3rem;
                color: inherit;
                background-color: var(--color-grey-2);
                border:none;
                margin-left: .8rem;
                cursor: pointer;

                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                
                &.active {
                    transform: translate(0, 1px);
                    border-top: 3px solid var(--color-dark-1);
                    border-left: var(--border-grey-1);
                    border-right: var(--border-grey-1);
                }

                svg {
                    width: 2rem;
                    height: 2rem;
                    margin-left: 1rem;
                    fill: var(--color-dark-2);
                }
            }
        }

        &__body {
            background-color: var(--color-grey-2);
            border: var(--border-grey-1);
            border-radius: 5px;


            .tabs {

                display: block;
                width: 100%;

                .active {
                    display: flex !important;
                }

                

                .tab-1 {

                    font-size: 1.2rem;
                    padding: 0 3rem 5rem;
                    display: none;
                    flex-direction: column;
                    justify-content: space-between;

                    @media screen and (max-width: 850px){
                            padding: 0 6rem 3rem;;
                    }

                    &__block {

                        display: flex;
                        justify-content: space-between;
                        @media screen and (max-width: 850px) {
                            flex-direction: column;
                        }

                        &.message {
                            justify-content: center;
                            font-size: 2rem;
                        }

                        .btn {
                            display: block;
                            font-size: 1.8rem;
                            padding: 1.5rem 6rem;
                            background-color: var(--color-dark-3);
                            color: #fff;
                            margin: 5rem auto;
                            &:hover {
                                background-color: var(--color-dark-1);
                            }
                        }
                    }

                    &__option {

                        flex: 0 0 28%;
                        padding: 3rem;
                        background-color: var(--color-grey-5);
                        border-radius: 5px;
                        margin-top: 5rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 1.6rem;

                        @media screen and (max-width: 1600px){
                            flex: 0 0 32%;
                            padding: 2rem;
                        }

                        @media screen and (max-width: 1300px) {
                            flex-direction: column;
                            align-items: center;
                            span {
                                margin-bottom: 1rem
                            }
                        }

                        @media screen and (max-width: 850px) {
                            flex-direction: row;
                            padding: 3rem 5rem;
                        }

                        @media screen and (max-width: 550px) {
                            flex-direction: column;
                            align-items: center;
                            span {
                                margin-bottom: 1rem
                            }
                        }

                        .gender {

                            display: flex;
                            justify-content: space-between;
                            width: 100px;

                            &__switch {

                                display: flex;
                                width: 50px;
                                height: 24px;
                                padding: 2px;
                                background-color: var(--color-grey-4);
                                border-radius: 10px;
                                cursor: pointer;

                                &.changed {
                                    justify-content: flex-end;
                                }

                                &__state {
                                    display: inline-block;
                                    width: 20px;
                                    height: 20px;
                                    background-color: var(--color-dark-2);
                                    border-radius: 10px;
                                    transition: background-color .6s;
                                }

                                &:hover span {
                                    background-color: var(--color-dark-3);
                                }
                            }
                        }

                        input {
                            border: var(--border-grey-1);
                            padding: 2px;
                            color: var(--color-dark-1);
                            &.number {
                                text-align: left;
                            }
                        }

                    }
                }


                .tab-2 {

                    display: none;
                    font-size: 1.7rem;
                    padding: 6rem 4rem;

                    @media screen and (max-width: 1100px) {
                        padding: 6rem 8rem;
                        flex-direction: column;            
                    }

                    @media screen and (max-width: 750px) {
                        padding: 2rem;
                    }

                    .card {
                        margin-right: auto;
                        @media screen and (max-width: 1100px){
                            margin: 4rem auto 0;
                        }
                        
                        img {
                            width: 100%;
                            border-radius: 8px;
                        }
                    }

                    ul {
                        display: flex;
                        flex: 0 0 58%;
                        flex-direction: column;
                        list-style: none;

                        li {
                            display: flex;
                            flex-wrap: wrap;
                            padding: 2rem;
                            align-items: center;

                            .title {
                                @media screen and (max-width: 620px) {
                                    flex: 100%;
                                    text-align: center;
                                    padding-bottom: 2rem;
                                }
                            }

                            .progress-bar {
                                margin-right: auto;
                                height: 12px;
                                flex: 0 0 56%;
                                background-color: var(--color-grey-5);
                                border-radius: 5px;
                                @media screen and (max-width: 1800px) {
                                    flex: 0 0 45%;
                                }
                                div {
                                    height: 100%;
                                    width: 30%;
                                    background-color: var(--color-dark-3);
                                    border-radius: 5px;
                                }
                            }

                            .check {
                                width: 4rem;
                                height: 4rem;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                margin-right: 4rem;
                                font-size: 1.8rem;
                                font-weight: 600;
                                background-color: var(--color-grey-5);
                                color: var(--color-grey-1);
                                border-radius: 100%;
                                @media screen and (max-width: 620px) {
                                    margin: auto;
                                }
                                
                                &.active {
                                    color: var(--color-dark-1)
                                }
                            }
                            
                        }
                    }   
                }


                .tab-3 {
                    display: none;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    padding: 0 2% 3rem;

                    @media screen and (max-width: 900px){
                        justify-content: space-between;
                    }

                    &>*:not(:nth-child(3n+1)){
                        margin-right: 2%;

                        @media screen and (max-width: 900px){
                            margin-right: 0;
                        }
                    }

                }
            }
        }
}
</style>

