<template>
	<div class="container">
		<app-qr></app-qr>
		<app-header></app-header>
    	<router-view/>
		<app-footer></app-footer>
	</div>
</template>

<script>
import axios from 'axios'
import Header from './components/header'
import Footer from './components/footer'
import qr from './components/qr-comp'

export default {
	components: {
		appHeader: Header,
		appFooter: Footer,
        appQr: qr
	},
	created(){
		if(localStorage.token){
			axios.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.token
			this.$store.commit('setLoginState', true)
		}
	}
}
</script>


<style lang="scss">

	@font-face {
		font-family: 'IRANSans';
		font-style: normal;
		font-weight: normal;
		src:url('./fonts/IRANSansWeb(FaNum).woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
			url('./fonts/IRANSansWeb(FaNum).woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
			url('./fonts/IRANSansWeb(FaNum).ttf') format('truetype');
	}



	.container {
		width: 100%;
		position: relative;
	}
</style>

