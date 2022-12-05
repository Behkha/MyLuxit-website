<template>
    <div class="artist__slider">
        <img v-for="(url, index) in images" :class="{active: states[index]}" :src="url" alt="" :key="index">

        <!-- <ul class="selector" v-if="images.length > 1">
            <li  v-for="(url, index) in images"  @click="setSlide(index)" :class="{active: states[index]}" :key="index"></li>
        </ul> -->

        <a @click.prevent="prev" v-if="images.length > 1" class="prev" href="#">
            <svg>
                <use xlink:href="../assets/icons.svg#left-arrow"></use>
            </svg>
        </a>
        <a @click.prevent="next" v-if="images.length > 1" class="next" href="#">
            <svg>
                <use xlink:href="../assets/icons.svg#right-arrow"></use>
            </svg>
        </a>
    </div>
</template>

<script>
export default {
    props: ['images'],
    data(){
        return {
            sliderTimer: 10000,
            states: [true],
            currentSlide: 0
        }
    },
    methods: {

        //Slider Methods
        resetStates(){
            let temp = []
            for(let i=0; i<this.images.length; i++) {
                temp.push(false)
            }
            this.states = temp
        },
        setSlide(num){
            this.resetStates();
            this.states[num] = true;
        },
        next(){
            this.resetStates();
            this.currentSlide++;

            if(this.currentSlide <  this.states.length){
                this.states[this.currentSlide] = true;
            }
            else {
                this.currentSlide = 0;
                this.states[this.currentSlide] = true;
            }   
        },
        prev(){
            this.resetStates();
            this.currentSlide--;

            if(this.currentSlide >= 0){
                this.states[this.currentSlide] = true;
            }
            else {
                this.currentSlide = this.states.length - 1;
                this.states[this.currentSlide] = true;
            }
        }
        
    },
    mounted(){
        setInterval(this.next, this.sliderTimer)
    }
}
</script>


<style lang="scss">
.artist__slider {
            flex: 0 0 49%;
            height: 26.78vw;
            position: relative;
            
            border-radius: 5px;

            @media screen and (max-width: 960px){
                height: 53.33vw;
            }

            img {
                display: none;
                width: 100%;
                height: inherit;

                border-radius: 5px;

                &.active {
                    display: block;
                }
            }
            

            a {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 6rem;
                height: 8rem;
                top: 50%;
                transform: translateY(-50%);

                font-size: 3rem;
                background-color: rgba(92, 91, 91, 0.37);
                text-decoration: none;
                color: #fff;
                
                &.prev {
                    left: 0;

                    svg {
                        fill: #fff;
                        width: 4.6rem;
                        height: 6rem;
                    }
                }

                &.next {
                    right: 0;

                    svg {
                        fill: #fff;
                        width: 4.6rem;
                        height: 6rem;
                    }
                }
            }

            ul.selector {
                width: 100%;
                height: 6rem;
                display: flex;
                flex-direction: row-reverse;
                position: absolute;
                bottom: 0;
                left: 0;
                align-items: center;
                justify-content: center;

                list-style: none;
                background-color: rgba(92, 91, 91, 0.37);
                border-bottom-right-radius: 5px;
                border-bottom-left-radius: 5px;
                cursor: pointer;

                li {
                    width: 10px;
                    height: 10px;
                    margin-right: 15px;

                    background-color: #fff;
                    border-radius: 100%;
                    transition: background-color .4s;

                    &.active {
                        width: 14px;
                        height: 14px;
                    }

                    &:hover {
                        background-color: var(--color-grey-1);
                    }
                }
                
            }
        }

</style>

