<template lang="pug">
#Login
	img#login-img(src="../assets/image/login/main_image.png")
	#login-form
		h1 Login
		form#login
			.box
				img(src = "../assets/image/login/icon_email.png")
				input(type="text" v-model="id" placeholder="E-mail")
			.box
				img(src = "../assets/image/login/icon_password.png")
				input(type="password" v-model="pw" placeholder="Password")
			.forget
				p Forget password?

			img#link-main(src = "../assets/image/login/btn_Login.png" @click="login")

	.other_choice
		img(src="../assets/image/login/line_OrLogWith.png" height="10%")
		.icon 
			img(src = "../assets/image/login/icon_fb.png" height="100%")
			img(src = "../assets/image/login/icon_google.png" height="100%")
			img(src = "../assets/image/login/icon_twitter.png" height="100%")
		#login-output
			p Don't have an account? &nbsp;
			p#change-to-signup(@click="signup") Sign Up.
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'
const port = 7764
const IP_address = 'http://luffy.ee.ncku.edu.tw'

export default{
    name:"LogIn",
    data(){
        return{
            id: '',
            pw: '',
            loginForm:{
                username: ''
            }
        }
    },
    methods:{
        login(){
            this.loginForm.username = this.id
            axios.get(`${IP_address}:${port}/login`, {params:{
                id: this.id,
                password: this.pw
            }}).then((res)=>{
                if(res.data === this.id){
                    Cookies.set('logindata', JSON.stringify(this.loginForm), {expires: 1})
                    this.$router.push('/mainpage')
                }
            })
        },
        signup(){
            this.$router.push('/signup')
        },
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

#Login
    display: flex
    flex-direction: column
    align-items: center
    height: 100vh
    width: 100vw

    #login-img
        margin: 9.11vh 0 0 0
        height: 25.246%
    
    #login-form
        width: 70.66vw
        display: flex
        flex-direction: column
        margin: 3.94vh 0 6.4vh 0

        h1
            font-family: Roboto Bold
            font-size:  4.4335vh
            margin: 0 0 2.463vh 0
        
        #login
            display: flex
            flex-direction: column
            align-items: center

            img
                margin: 0 17px 0 0
                height: 100%
            
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
            
            .box:nth-child(2)
                margin: 0 0 3.0788vh 0
            
            .forget
                display: flex
                flex-direction: row
                justify-content: center
                align-self: end
                margin: 0 0 2.8325vh 0

                p
                    font-family: Roboto Light
                    font-size: 1.5vh
                    text-align: left
                    margin: 0

            #link-main
                background-color: white
                display: flex
                align-items: center
                height: 3.94vh
                border: none
                padding: 0
                margin: 0
		
    .other_choice
        display: flex
        flex-direction: column
        align-items: center
        width: 100vw
        margin: 0

        img
            margin: 0

        .icon
            display: flex
            flex-direction: row
            justify-content: center
            align-items: center
            height: 22.55%
            width: 100%
            margin: 3.818vh 0 9.36vh 0

            img
                margin: 0 17px 0 0
            
            img:nth-child(3)
                margin: 0

        #login-output
            display: flex
            flex-direction: row
            justify-content: center
            align-items: center
            font-family: Roboto Medium
            font-size: 1.5vh
            
            p
                margin: 0
            
            p#change-to-signup
                color: rgb(142, 95, 244)

</style>