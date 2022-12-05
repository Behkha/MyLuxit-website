<template>
    <div class="login">
        <div class="inside">
            <img src="../assets/logo.png" alt="Chaarpayeh Logo" class="inside__logo">

            <div class="select">
                <button :class="{active: state}">ورود / ثبت نام</button>
                <button :class="{active: !state}">تایید تلفن</button>
            </div>

            <div class="body">

                <div v-if="state" class="section">
                    <span>شماره همراه خود را بدون صفر وارد کنید</span>
                    <div>
                        <input type="text" @keyup.enter="register" v-model="primaryNumber"  class="mobile-num" placeholder="شماره همراه">
                        <span>09 </span>
                    </div>
                    <button @click="register">ارسال کد تایید به شماره شما</button>
                </div>

                <div v-else class="section">
                    <span>پس از دریافت پیامک حاوی کد تایید ، کد را در این محل وارد کنید</span>
                    <div>
                        <input type="text" @keyup.enter="enter" v-model="code" class="code" placeholder="کد تایید">
                    </div>
                    <button @click="enter">ورود</button>
                    
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    
import axios from 'axios'

export default {
    data(){
        return {
            state: 1,
            primaryNumber: '',
            code: ''
        }
    },
    computed: {
        fullNumber(){
            return '09' + this.primaryNumber
        }
    },
    methods: {
        register(){
            if(this.fullNumber.length === 11) {
                axios.post(`users?tell=${this.fullNumber}`)
                .then(() => {
                    this.state = !this.state
                })
                .catch(err => console.log(err))
            }
        },
        enter(){
            axios.patch(`users/activation?tell=${this.fullNumber}&code=${this.code}`)
            .then(res => {
                localStorage.token = res.data.token
                axios.defaults.headers.common['Authorization'] = `Bearer ` + res.data.token
                this.$store.commit('setLoginState', true)
                this.$router.push('profile')
            })
            .catch(err => console.log(err))
        }
    }
    
}

</script>

<style lang="scss">
    .login {
        width: 100%;
        margin: 10rem 0 10rem;

        @media screen and (max-width: 1400px) {
            margin: 6rem 0;
        }

        .inside {
            width: 50rem;
            margin: auto;
            padding: 4rem;
            display: flex;
            flex-direction: column;
            box-shadow: 0 12px 30px rgb(224, 224, 224);

            @media screen and (max-width: 600px) {
                width: 80%;
                box-shadow: none;
                border: none;
                
            }

            @media screen and (max-width: 450px) {
                width: 100%;
            }

            &__logo {
                width: 100px;
                margin: auto;
                padding: 3rem 0;
            }

            .select {

                button {
                    width: 50%;
                    line-height: 7rem;
                    font-size: 2rem;

                    color: var(--color-dark-1);
                    background-color: #fff;
                    cursor: pointer;
                    border:none;
                    border-bottom: 2px solid var(--color-grey-2);
                    transition: border .6s;

                    &.active {
                        border-bottom: 2px solid var(--color-dark-3);
                    }
                }
            }

            .body {
                .section {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-size: 1.6rem;
                    color: var(--color-grey-1);
                    
                    &>* {
                        margin-top: 4rem;
                    }

                    div {
                        width: 100%;
                        display: flex;
                        background-color: var(--color-grey-3);
                        align-items: center;
                        border-radius: 10px;

                        span {
                            padding: 0 1rem 0 2.4rem;
                            border-right: var(--border-grey-1);
                        }

                        input {
                            flex: 1;
                            padding: 3rem 3rem 3rem 1rem;
                            background-color: var(--color-grey-3);
                            font-size: inherit;
                            color: inherit;
                            border: none;
                            border-radius: 10px;

                            &.mobile-num {
                                text-align: left;
                                direction: ltr;
                            }

                            &.code {
                                text-align: center;
                                direction: ltr;

                                &::placeholder {
                                    text-align: center;
                                }
                            }

                            &::placeholder {
                                text-align: right;
                            }
                        }
                    }

                    button {
                        width: 100%;
                        padding: 2.8rem 1rem;

                        font-size: 2rem;
                        color: #fff;
                        background-color: var(--color-dark-3);
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                        transition: all .6s;

                        &:hover {
                            background-color: var(--color-dark-1);
                        }

                    }
                }
            }

            border: var(--border-grey-1);
        }
    }
</style>

