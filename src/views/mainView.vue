<template lang="pug">
#main
	#mainpage
		img#personal_btn(src = "../assets/image/MainPage/MainPage_personal.png" @click="openpage")
		img#add_project_btn(src = "../assets/image/MainPage/MainPage_AddAccounting.png" width = "50px", height = "50px")
		#balance_bar
			p $0
			p 本月可用
		#project_block
			#project_bar
				p 儲蓄專案
				img(src = "../assets/image/btn/btn_arrow_right.png" height = "40%")
				img(src = "../assets/image/MainPage/btn_arrange.png" height = "95%")
			#project_view
				.project
					.title
						img(src = "../assets/image/project/Project_colordot_purple.png" height = "17.647%")
						p 一般儲蓄
					.planned_speed
						img(src = "../assets/image/MainPage/MainPage_general_savings.png" height = "100%")
				.add_project
					.title
						img(src = "../assets/image/MainPage/Project_colordot_grey.png" height = "17.647%")
						p 新增儲蓄
					.planned_speed
						img(src = "../assets/image/MainPage/addcircle.png" height = "100%")
			#daily_expend
				#word_block
					p
					p
		#detail_block
			#detail_bar
				p 當日明細
				img(src = "../assets/image/btn/btn_arrow_right.png" height = "40%")
			.list
		.add_button
	#personal_page(:style="{display: open_page_flag, transform: transX}")
		.bar
			img(src = "../assets/image/btn/btn_arrow_back.png" @click="closepage")
			p 個人資料
		#photo_and_name
			img#user_photo(src = "../assets/image/PersonalPage/Personal_userPic.png")
			p(v-text="usn")
		#financial_setting
			p 財務設定
			.list 
				li
					p 固定收入
					img(src = "../assets/image/btn/btn_arrow_right.png", height = "15px")
				li
					p 固定支出
					img(src = "../assets/image/btn/btn_arrow_right.png", height = "15px")
				li
					p 固定儲蓄
					img(src = "../assets/image/btn/btn_arrow_right.png", height = "15px")
		#account_setting
			p 帳號設定
			.list 
				li
					p 更改密碼
				li
					p 登出
				li
					p 刪除所有數據
				li
					p 更改密碼	
	#navbar
		img(src="../assets/image/navbar/unselect/barcode_unselect.png")
		img(src="../assets/image/navbar/unselect/account_unselect.png")
		img(src="../assets/image/navbar/selected/mainpage_select.png")
		img(src="../assets/image/navbar/unselect/accounting_unselect.png" @click="skip_accounting")
		img(src="../assets/image/navbar/unselect/project_unselect.png" @click="skip_project")
</template>

<style lang="sass">
@font-face 
    font-family: "Roboto Bold"
    src: url(../assets/image/font/Roboto-Bold.ttf)

@font-face 
    font-family: "Roboto Regular"
    src: url(../assets/image/font/Roboto-Regular.ttf)

#personal_btn
	width: 21.8667%

#user_photo
    height: 74%

#main
    display: flex
    flex-direction: column
    align-items: center
    background-color: #F4F4F4
    width: 100vw
    height: 100vh
    font-family: Roboto Regular

    #mainpage
        display: flex
        flex-direction: column
        align-items: center
        width: 100vw
        height: auto
        min-height: 100vh
        background-color: #F4F4F4
        position: absolute
        top: 0

        #personal_btn
            position: absolute
            top: 6.4vh
            right: 0
        
        #add_project_btn
            position: fixed
            bottom: 13.423vh
            right: 5.6vw

        #balance_bar
            display: flex
            flex-direction: column
            justify-content: end
            width: 79.7333vw
            height: 15.14778vh

            p:nth-child(1)
                font-family: Roboto Bold
                font-size: 36px
                color: #8E5FF4
                margin: 0 0 1vh 0

            p:nth-child(2)
                font-size: 13px
                color: #737474
                margin: 0

        #project_block
            display: flex
            flex-direction: column
            align-items: center
            margin-top: 4.31vh
            width: 100vw
            height: auto
            margin: 4.31vh 0 0 0

            #project_bar
                display: flex
                flex-direction: row
                justify-content: space-between
                align-items: center
                width: 79.7333vw
                height: 3.463vh
                margin: 0 0 2.525vh 0
                
                p
                    margin: 0 3vw 0 0
                
                img:nth-child(2)
                    margin: 0 50vw 0 0
            
            #project_view
                display: flex
                flex-direction: row
                justify-content: space-between
                align-items: center
                width: 90vw
                height: 20.936vh
                margin: 0 0 2.5vh 0

                .project, .add_project
                    display: flex
                    flex-direction: column
                    align-items: center
                    width: 42.648vw
                    //height: 20.936vh
                    height: 22vh
                    background-color: white
                    border-radius: 8px
                    box-shadow: 0px 8px 23px rgba(0, 0, 0, 0.1)

            .title
                display: flex
                flex-direction: row
                align-items: center
                width: 100%
                height: 20%
                margin: 1.5vh 0 0.5vh 0

                img
                    margin: 0 2.933vw 0 5vw

                p
                    font-size: 14px

            .planned_speed
                display: flex
                flex-direction: row
                justify-content: center
                align-items: center
                width: 100%
                height: 58.235%

            #daily_expend 
                background: url('../assets/image/MainPage/MainPage_helper.png')
                background-position: center
                background-repeat: no-repeat
                background-size: contain
                display: flex
                justify-content: center
                align-items: flex-end
                width: 90vw
                height: 11.45vh
                margin: 0 0 0 0

                #word_block
                    display: flex
                    justify-content: space-evenly
                    align-items: flex-start
                    flex-direction: column
                    height: 8vh

                    p
                        font-size: 16px
                        color: white
                        margin: 0 0 0 0
                        
        #detail_block
            display: flex
            flex-direction: column
            align-items: center
            width: 100vw
            height: auto
            margin: 2.59vh 0 0 0

            #detail_bar
                display: flex
                flex-direction: row
                justify-content: start
                align-items: center
                width: 79.7333vw
                height: 3.463vh
                margin: 0 0 2.525vh 0
                
                p
                    margin: 0 3vw 0 0
            
            .list
              list-style-type: none
              background-color: white
              width: 92%
              border-radius: 10px
              margin: 2.0936vh 0 10vh 0
              a
                display: flex
                flex-direction: row
                justify-content: space-between
                border-bottom: 0.3px solid #B3B3B3
                border-radius: 0

                p
                  width: 75%
                  padding: 1.724vh 5.6vw 1.724vh 5.6vw
                  text-decoration: none
                  font-size: 2vh !important
                  margin: 0 0 0 0

        #detail_block
        .add_button

#personal_page
        flex-direction: column
        align-items: center
        width: 100vw
        height: auto
        background-color: #F4F4F4
        transition: 0.5s
        position: absolute
        top: 0
        border: none
        border-left: solid 

        .bar
            display: flex
            flex-direction: column
            align-items: center
            width: 100vw
            height: 11.9458vh
            background-color: white
            border-bottom: 0.3px solid #B3B3B3

            img
                position: absolute
                height: 2.8325%
                left: 6.6667vw
                top: 6.0345vh

            p
                font-size: 1.97vh
                position: relative
                top: 6.0345vh
                margin: 0

        #photo_and_name
            display: flex
            flex-direction: column
            align-items: center
            width: 100vw
            height: 13.547vh
            margin: 4.31vh 0 0 0
            
            img
                margin: 0 0 1.97vh 0
            
            p
                font-size: 1.47vh
                margin: 0

        #financial_setting
            display: flex
            flex-direction: column
            width: 85.333vw
            height: 22.78vh
            margin: 3.325vh 0 0 0

            p
                font-size: 1.724vh
                margin: 0

        #account_setting
            display: flex
            flex-direction: column
            width: 85.333vw
            height: 29vh
            margin: 3.325vh 0 20vh 0

            p
                font-size: 1.724vh
                margin: 0

        .list
            list-style-type: none
            background-color: white
            width: 100%
            border-radius: 10px
            margin: 2.0936vh 0 0 0

            li
                display: flex
                flex-direction: row
                align-items: center
                border-bottom: 0.3px solid #B3B3B3
                border-radius: 0

                p
                    display: block
                    color: black
                    width: 75%
                    padding: 1.724vh 5.6vw 1.724vh 5.6vw
                    text-decoration: none
                    font-size: 2vh !important
            
            li:nth-last-child(1)
                border-style: none

#navbar
	background-color: white
	display: flex
	flex-direction: row
	justify-content: center
	align-items: center
	width: 100vw
	height: 10.59vh
	position: fixed
	bottom: 0

	img
		margin: 0 8vw 0 0  //30px
		height: 77.647%

	img:nth-child(5)
		margin: 0

</style>

<script>
import Cookies from 'js-cookie'
import axios from 'axios'
const port = 7764
const IP_address = 'http://luffy.ee.ncku.edu.tw'
export default{
    name: "MainPage",
	data(){
		return{
            ID: '',
			open_page_flag: 'none',
			transX: 'translateX(100%)',
            usn: 'User'
		}
	},
	methods:{
		openpage(){
			this.open_page_flag = 'flex'
            this.ID = JSON.parse(Cookies.get('logindata')).username
            axios.get(`${IP_address}:${port}/username`, {params:{
                id: this.ID
            }}).then((res)=>{
                this.usn = res.data
            })

			setTimeout(() => {
				this.transX = 'translateX(0%)'
  			}, 100)
		},
        closepage(){
            this.transX = 'translateX(100%)'
            setTimeout(() => {
				this.open_page_flag = 'none'
  			}, 500)
        },
        skip_accounting(){
            this.$router.push('/accounting')
        },
        skip_project(){
            this.$router.push('/project')
        }
	}
}
</script>