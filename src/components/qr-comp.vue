<template>
    <div class="qr" v-if="QRState">
        <div class="qr__block">
            <div class="qr__block__header">
                <div class="qr__block__header__exit" @click="closeQR">
                    <svg>
                        <use xlink:href="../assets/icons.svg#cancel"></use>
                    </svg>
                </div>
                <h3 class="qr__block__header__title">دانلود چارپایه</h3>
            </div>

            <div class="qr__block__body">
                <h4 class="qr__block__body__txt">اسکن کنید</h4>
                <img class="qr__block__body__img" src="../assets/qr.png" alt="">
                <a href="https://cafebazaar.ir/app/com.ratintech.chaarpaye/?l=fa" target="_blank" class="qr__block__body__btn">رفتن به صفحه دانلود</a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

export default {
    computed: mapGetters(['QRState']),
    methods: mapMutations(['closeQR'])
}
</script>


<style lang="scss">
    .qr {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(112, 112, 112, 0.247);
        z-index: 99999999999;

        &__block {
            width: 400px;
            height: 540px;
            background-color: #fff;
            margin: 4rem auto 0 auto;

            @media screen and (max-width: 450px) {
                width: 100%;
                height: 100%;
                margin: 0;
                border-radius: 0;
            }

            border-radius: 10px;

            &__header {
                width: 100%;
                height: 20%;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                
                border-bottom: var(--border-grey-1);

                &__exit {
                    position: absolute;
                    left: 28px;
                    top: 50%;
                    display: flex;
                    align-items: center;

                    transform: translateY(-50%);

                    svg {
                        width: 20px;
                        height: 20px;

                        fill: var(--color-dark-3);
                        transition: all .6s;
                        cursor: pointer;

                        &:hover {
                            fill: var(--color-dark-2);
                        }
                    }
                }

                &__title {
                    font-size: 2.2rem;
                    color: var(--color-dark-3);
                }

            }


            &__body {
                display: flex;
                height: 80%;
                padding: 24px 0 30px;

                flex-direction: column;
                justify-content: space-around;
                align-items: center;

                &__txt {
                    font-size: 2rem;
                    color: var(--color-dark-2);
                }

                &__img {
                    width: 200px;
                    height: 200px;
                }

                &__btn {
                    width: 80%;
                    height: 8rem;
                    margin-top: 1rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    color: #fff;
                    background-color: var(--color-dark-1);
                    border-radius: 10px;
                    font-size: 2rem;
                    cursor: pointer;
                    transition: all .6s;
                    text-decoration: none;

                    &:hover {
                        background-color: var(--color-dark-3);
                    }
                }
                
            }
        }
    }
</style>
