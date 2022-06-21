<template lang="pug">
#SignUp
	img(src = "../assets/image/signup/main_image.png")
	#signup-form
		h1 Sign Up
		form#signup
			.box
				img(src = "../assets/image/signup/icon_username.png")
				input(type="text" v-model="name" placeholder = "User Name")
			.box
				img(src = "../assets/image/signup/icon_email.png")
				input(type="text" v-model="id" placeholder = "E-mail")
			.box
				img(src = "../assets/image/signup/icon_password.png")
				input(type="password" v-model="password" placeholder = "Password")
			.check
				input(type='checkbox', name='check') 
				label I read and agree to terms and condition.

			img#signup_btn(src = "../assets/image/signup/btn_SignUp.png" @click="signup_account")

	.other_choice
		img(src="../assets/image/signup/line_OrConnectWith.png" :style="{height: '9%'}")
		.icon 
			img(src = "../assets/image/signup/icon_fb.png")
			img(src = "../assets/image/signup/icon_google.png")
			img(src = "../assets/image/signup/icon_twitter.png")
		#signup-output
			p Already had an account? &nbsp; 
			p#change-to-login(@click="loginpage") Login.
</template>

<script>
import Cookies from 'js-cookie'
import axios from 'axios'
const port = 7764
const IP_address = 'http://luffy.ee.ncku.edu.tw'
export default{
	name:"SignUp",
	data(){
		return{
			name: '',
			id: '',
			password: '',
			loginForm:{
                username: ''
            }
		}
	},
	methods:{
		loginpage(){
			this.$router.push('/')
		},
		signup_account(){
			this.loginForm.username = this.id
			axios.get(`${IP_address}:${port}/signup`, {params:{
                name: this.name,
				id: this.id,
				password: this.password
            }}).then((res)=>{
				if(res.data === "signup"){
					Cookies.set('logindata', JSON.stringify(this.loginForm), {expires: 1})
                    this.$router.push('/mainpage')
				}
            })
		}
	}
}
</script>

<style lang="sass">
@font-face 
    font-family: "Roboto Bold"
    src: url(../assets/image/font/Roboto-Bold.ttf)

@font-face 
    font-family: "Roboto Light"
    src: url(../assets/image/font/Roboto-Light.ttf)

@font-face 
    font-family: "Roboto Medium"
    src: url(../assets/image/font/Roboto-Medium.ttf)	

#SignUp
	display: flex
	flex-direction: column
	align-items: center
	height: 100vh
	width: 100vw
	img
			margin: 9.11vh 0 0 0
			height: 24.87%
	
	#signup-form
			width: 70.66vw
			display: flex
			flex-direction: column
			margin: 3.94vh 0 4.43vh 0

			h1
					font-family: Roboto Bold
					font-size:  4.4335vh
					margin: 0 0 2.463vh 0
			
			#signup
					display: flex
					flex-direction: column
					align-items: center

					img
							margin: 0 17px 0 0
					
					input
							min-height: 100%
							border-style: none
							border-bottom-style: solid
							border-radius: 0
							width: 100%
							padding: 0
					
					.box
							display: flex
							flex-direction: row
							justify-content: center
							align-items: center
							height: 2.956vh
							width: 100%
							margin: 0 0 3.817vh 0

							img
								height: 100%
					
					.box:nth-child(3)
							margin: 0 0 1.97vh 0
					
					.check
							display: flex
							flex-direction: row
							justify-content: center
							align-self: start
							margin: 0 0 4.8vh 0

							input
									width: 12px
									margin: 0 5px 0 0 
							
							label
									font-family: Roboto Light
									font-size: 1.5vh
									margin: 0

					#signup_btn
							margin: 0
							height: 100%
							background-color: white
							display: flex
							align-items: center
							height: 3.94vh
							border: none
							padding: 0

	.other_choice
			display: flex
			flex-direction: column
			align-items: center
			height: 16.38vh
			width: 100vw
			margin: 0

			img
					margin: 0

			.icon
					display: flex
					flex-direction: row
					justify-content: center
					align-items: center
					height: 4.31vh
					width: 100vw
					margin: 3.818vh 0 5.17vh 0

					img
							margin: 0 17px 0 0
							height: 100%
					
					img:nth-child(3)
							margin: 0

			#signup-output
					display: flex
					flex-direction: row
					justify-content: center
					align-items: center
					font-family: Roboto Medium
					font-size: 1.5vh
					
					p
							margin: 0

					#change-to-login
							color: rgb(142, 95, 244)
</style>