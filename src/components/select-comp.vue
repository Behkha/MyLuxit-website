<template>

    <!-- To set the dark or light them use 1 and 0 for select_list['dark'] variable -->

    <div class="select-comp" :class="{dark: select_list['dark'], light: !select_list['dark']}">
        <button class="select-comp__selected" @click="state = true">
            {{ select_list['data'][selected] }}
        </button>
        <ul class="select-comp__list">
            <template  v-for="(item, index) in select_list['data']"  v-if="state">
                <li  @click="selectFunc(index)" class="select-comp__list__item"   v-if="index != selected" :key="index">
                    {{ item }} 
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['select_list'],
    data(){
        return {
            selected: this.select_list['default'],
            state: false
        }
    },
    methods: {
        selectFunc(num){
            console.log(num)
        }
    }
}
</script>


<style lang="scss">
    .select-comp {
        position: relative;
        display: flex;
        height: 6rem;
        width: 22rem;
        justify-content: center;
        align-items: center;

        &__selected {
            width: inherit;
            height: 6rem;
            display: flex;
            justify-content: center;
            align-items: center;

            border: none;
            border-radius: 100px;
            cursor: pointer;

            font-size: 2rem;
            transition: all .5s;

            &:focus {
                border-radius: 0;
            }
        }

        &__list {
            list-style: none;
            position: absolute;
            top: 6rem;
            display: flex;
            flex-direction: column;
            z-index: 100000;
            width: inherit;

            font-size: 2rem;
            animation: key1 .5s ease-out;

            &__item {
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 100000;
                width: inherit;
                height: 6rem;

                cursor: pointer;
                transition: all 1s;
            }
        }

        ////////////////////////
        ///// Light Style

        .light & {

            &__selected {
                color: var(--color-grey-1);
                background-color: var(--color-grey-2);

                &:hover {
                    background-color: var(--color-grey-4);
                }
            }

            &__list {

                color: var(--color-grey-1);

                :nth-child(even) {
                    background-color: var(--color-grey-3);
                }

                :nth-child(odd) {
                    background-color: var(--color-grey-7);
                }

                &__item {

                    &:hover {
                        background-color: var(--color-grey-4);
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



    @keyframes key1{
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
</style>
