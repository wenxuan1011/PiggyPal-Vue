<template lang="pug">
#accounting 
	.bar
		img#back(src = "../assets/image/btn/btn_arrow_back.png")
		p 記帳
	#everyday_earn
		img(src = "../assets/image/Accounting/box_SelectDate.png")
		#today_earn
			p 本日損益
			p +0
		img#add_deals_btn(src = "../assets/image/Accounting/btn_add.png" @click="openpage")
	br
	#today_detail
		.bars
			p 收入
		.income 
		.bars
			p 支出
		.expenditure 	
#add_deals(:style="{display: open_page_flag, transform: transX}")
	.bar
		img#btn_back(src = "../assets/image/btn/btn_arrow_back.png" @click="closepage")
		p 新增交易
	#type
		p(@click="save_set" :style="{'border-bottom': saveborbot}") 儲蓄
		p#income(@click="income_set" :style="{'border-bottom': inborbot}") 收入
		p#expend(@click="CreateSortBox(); out_set()" :style="{'border-bottom': outborbot}") 支出
		p(@click="pop_message(3)" :style="{'border-bottom': transborbot}") 轉帳
	form#fin
		.datebox
			Datepicker(v-model="date" :previewFormat="format" :enableTimePicker="false" :clearable="false" hideInputIcon)
			img(src = "../assets/image/btn/btn_arrow_down.png")
		.box
			input(type = "text" name = "cost" v-model="money" @click="open_keyboard_selector")
		.box
			p 分類
			.input_div(@click="open_cls")
				p#sort 飲食
				img(src = "../assets/image/btn/btn_arrow_right.png")
		.box(:style="{display: fin_name}")
			p 名稱
			input(type = "text" v-model="item_data")
		.box
			p 帳戶
			.input_div
				p#acc 現金
				img(src = "../assets/image/btn/btn_arrow_right.png")
		.box
			p 備註
			input(type = "text" v-model="note_data")
		img#save_btn(src = "../assets/image/btn/btn_save.png" @click="save_accounting(date.getMonth()+1, date.getDate(), date.getFullYear())") 

.NumKeyBoard_select_box(:style="{display: open_keyboard, transform: transY}")
	img.line(src = "../assets/image/Accounting/ListLine.png")
	.board_box
		p#seven(@click="enter_number(7)") 7 
		p#eight(@click="enter_number(8)") 8 
		p#nine(@click="enter_number(9)") 9 
	.board_box
		p#four(@click="enter_number(4)") 4 
		p#five(@click="enter_number(5)") 5 
		p#six(@click="enter_number(6)") 6 
	.board_box
		p#one(@click="enter_number(1)") 1
		p#two(@click="enter_number(2)") 2
		p#three(@click="enter_number(3)") 3
	.board_box
		img(src = "../assets/image/Accounting/calculator_btn-c.png" @click="slice_number")
		p#zero(@click="enter_number(0)") 0 
		img(src = "../assets/image/Accounting/calculator_btn-ok.png" @click="close_keyboard_selector")

.sort_select_box(:style="{display: sort_flag, transform: sort_transY}")
	img.line(src = "../assets/image/Accounting/ListLine.png")
	p 請選擇分類
	.sort_bar


#popup(:style="{display: popup_dis}")
	#background 
		.box_regular
			.message
				p(v-text="popmes")
				figure
					img(:src="pop_img_path" :style="{width: '58%'}")
			p.confirm(@click="close_pop") 確認

#navbar
	img(src = "../assets/image/navbar/unselect/barcode_unselect.png")
	img(src = "../assets/image/navbar/unselect/account_unselect.png")
	img(src = "../assets/image/navbar/unselect/mainpage_unselect.png" @click="skip_mainpage")
	img(src = "../assets/image/navbar/selected/accounting_select.png")
	img(src = "../assets/image/navbar/unselect/project_unselect.png" @click="skip_project") 
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue'
import mod from './module.vue'
import axios from 'axios'
import Cookies from 'js-cookie'
const port = 7764
const IP_address = 'http://luffy.ee.ncku.edu.tw'

const IncomeSortName = ['薪水', '獎金', '投資', '還款', '中獎', '利息', '其他']
const IncomeSortImage = ['salary', 'bonus', 'investment', 'repayment', 'win', 'intersest', 'other']
export default{
    name: "AccounTing",
		components:{
			Datepicker
		},
		setup(){
			const date = ref(new Date());
        	const format = (date) => {
            	const day = date.getDate()
           	 	const month = date.getMonth() + 1
            	const year = date.getFullYear()

            	return `Selected date is ${month}/${day}/${year}`;
        	}

    		return {
            	date,
            	format
        	}
		},
		data(){
			return{
				open_page_flag: 'none',
				transX: 'translateX(100%)',
				open_keyboard: 'none',
				transY: 'translateY(100%)',
				money: '0',
				sort_flag: 'none',
				sort_transY: 'translateY(100%)',
				ExpendSortName: ['飲食', '購物', '家居', '個人', '交通', '娛樂', '醫療', '其他'],
				ExpendSortImage: ['food', 'shopping', 'house', 'personal', 'transport', 'entertainment', 'hospital', 'other'],
				inborbot: 'none',
				outborbot: '2px solid #410ADF',
				transborbot: 'none',
				saveborbot: 'none',
				click_op: 0,
				fin_name: 'flex',
				popup_dis: 'none',
				PopUpTital: ['恭喜本月已存下xx元', '恭喜完成專案！', '請輸入完整資訊', '功能待開發！'],
        		PopUpGif: ['pig', 'congrate', 'eye', 'glasses'],
				popmes: 'Hi',
				pop_img_path: '',
				note_data: '',
				item_data: ''
			}
		},
		methods:{
			save_accounting(month, day, year){
				month = mod.methods.datetransfer(month)
				day = mod.methods.datetransfer(day)
				console.log(date)
				if(this.click_op !== 2){
					axios.get(`${IP_address}:${port}/record`, {params:{
						id: JSON.parse(Cookies.get('logindata')).username,
						date: `${month}/${day}/${year}`,
						cost: this.money,
						sort: document.getElementById('sort').innerHTML,
						items: this.item_data,
						account: document.getElementById('acc').innerHTML,
						note: this.note_data,
						type: this.click_op
            		}}).then((res)=>{
						if(res.data === '0'){
							this.money = "0"
							this.item_data = ""
						if(click_op === 0){
							document.getElementById('sort').innerHTML = "飲食"
						}
						else{
							document.getElementById('sort').innerHTML = "薪水"
						}
							document.getElementById('acc').innerHTML = "現金"
						}
						else{
							//mod.PopUpMessage(2)
						}
            		})
				}
				else{
					axios.get(`${IP_address}:${port}/record`, {params:{
						id: JSON.parse(Cookies.get('logindata')).username,
						date: `${this.month}/${this.day}/${this.year}`,
						cost: this.money,
						sort: document.getElementById('sort').innerHTML,
						account: document.getElementById('acc').innerHTML,
						note: this.note_data,
						type: this.click_op
            		}}).then((res)=>{
            		})
				}
			},
			close_pop(){
				this.popup_dis = 'none'
			},
			income_set(){
				this.inborbot = '2px solid #410ADF'
				this.click_op = 1
				document.getElementById('sort').innerHTML = '薪水'
				this.fin_name = 'flex'
				this.outborbot = 'none'
				this.saveborbot = 'none'
				this.transborbot = 'none'
			},
			save_set(){
				this.saveborbot = '2px solid #410ADF'
				this.click_op = 2
				document.getElementById('sort').innerHTML = '每月儲蓄'
				this.fin_name = 'none'
				this.inborbot = 'none'
				this.outborbot = 'none'
				this.transborbot = 'none'
			},
			out_set(){
				this.outborbot = '2px solid #410ADF'
				this.click_op = 0
				document.getElementById('sort').innerHTML = '飲食'
				this.fin_name = 'flex'
				this.inborbot = 'none'
				this.saveborbot = 'none'
				this.transborbot = 'none'
			},
			pop_message(num){
				this.popup_dis = 'flex'
				this.popmes = this.PopUpTital[num]
				this.pop_img_path = require(`../assets/image/PopUpMessage/PopUpMessage_${this.PopUpGif[num]}.gif`)
			},
			skip_mainpage(){
				this.$router.push('/mainpage')
			},
			openpage(){
				this.open_page_flag = 'flex'
				this.CreateSortBox()
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
			skip_project(){
				this.$router.push('/project')
			},
			open_keyboard_selector(){
				document.activeElement.blur()
				this.open_keyboard = 'flex'
				setTimeout(()=>{
					this.transY = 'translateY(0%)'
				}, 100)
			},
			check_zero(){
				if(this.money === '0') return true
				else return false
			},
			enter_number(number){
				if(this.check_zero() === true) this.money = `${number}`
				else this.money = this.money + `${number}`
			},
			slice_number(){
				this.money = this.money.slice(0, -1)
			},
			close_keyboard_selector(){
				this.transY = 'translateY(100%)'
				setTimeout(()=>{
					this.open_keyboard = 'none'
				}, 500)
			},
			open_cls(){
				this.sort_flag = 'flex'
				setTimeout(() => {
				this.sort_transY = 'translateY(0%)'
				document.addEventListener("click", this.close_cls);
  			}, 100)			
			},
			close_cls(eve){
			  if( eve.target.class != "sort_select_box" ){
					this.sort_transY = 'translateY(100%)'
					setTimeout(() => {
						this.sort_flag = 'none'
					}, 500)
  			}
  			document.removeEventListener("click", this.close_cls);
			},
			CreateSortBox(){
				const container = document.querySelector('.sort_select_box .sort_bar')
  				container.innerHTML = '<div></div>'
				var image_path
				for(let i=0;i<this.ExpendSortImage.length;i++){
					const block = document.createElement('div')
					const ImageBox = document.createElement('img')
					const NameBox = document.createElement('p')
					block.setAttribute("class", "sort_box")
					image_path = require(`../assets/image/Accounting/${this.ExpendSortImage[i]}_icon.png`)
					ImageBox.setAttribute("src", image_path)
					ImageBox.setAttribute("width", "100%")
					NameBox.textContent = this.ExpendSortName[i]
					container.appendChild(block)
					block.appendChild(ImageBox)
					block.appendChild(NameBox)
					
					block.onclick = function(){
						var sort_word = document.querySelector(`.sort_select_box .sort_bar .sort_box:nth-child(${i+2}) p`).innerHTML
						document.getElementById('sort').innerHTML = sort_word
					}
					
				}
			},
		}
}
</script>

<style lang="sass">
@font-face 
    font-family: "Roboto Regular"
    src: url(../assets/image/font/Roboto-Regular.ttf)

@font-face 
    font-family: "Roboto Bold"
    src: url(../assets/image/font/Roboto-Bold.ttf)

#btn_back
	height: 2.8325% !important

#back
	height: 2.8325% !important

#add_deals_btn
	height: 19.355% !important

#accounting
		display: flex
		flex-direction: column
		align-items: center
		background-color: #F4F4F4
		width: 100vw
		height: 100vh
		font-family: Roboto Regular
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
						left: 6.6667vw
						top: 6.0345vh

				p
						font-size: 1.97vh
						position: relative
						top: 6.0345vh
						margin: 0    
			
		#everyday_earn
				display: flex
				flex-direction: column
				align-items: center
				width: 60vw
				height: 22.91vh
				margin-top: 2.59vh
				margin-bottom: 3.325123vh
				img
						margin-bottom: 2vh
						height: 30.10752688%
				#today_earn
						display: flex
						flex-direction: row
						justify-content: center
						align-items: end
						width: 100vw
						height: 10vh
		
						p:nth-child(1)
								font-size: 1.601vh
								margin: 0 10px 10px 0
						p:nth-child(2)
								font-size: 4.4335vh
								margin: 0
								color: #8E5FF4
						img:nth-child(2)
								margin-top: 3.694vh
		#today_detail
				background-color: white
				border-radius: 10px
				width: 92vw
				.income,.expenditure
						background-color: white
						
						border-radius: 10px
						margin: 0 0 0 0
						border-bottom: 0.3px solid #B3B3B3
						
						p
								margin: 0 0 0 0

						a
								display: flex
								flex-direction: row
								justify-content: space-between
								margin: 0 8.53vw 0 0

								p
								width: 85.87%
								font-size: 2vh !important
								margin: 1.36vh 0 2.09vh 8.53vw
								
				.bars
						display: flex
						background-color: white
						border-radius: 10px
						margin: 0 0 0 0
						p
								font-size: 2vh
								margin: 2.09vh 0 2.09vh 8.53vw
								color: #8E5FF4
								font-family: 'Roboto Bold'
#add_deals
		display: none
		flex-direction: column
		align-items: center
		width: 100vw
		height: auto
		min-height: 100vh
		background-color: #F4F4F4
		transform: translateX(100%)
		transition: 0.5s
		position: absolute
		top: 0vh
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
						left: 6.6667vw
						top: 6.0345vh

				p
						font-size: 1.97vh
						position: relative
						top: 6.0345vh
						margin: 0
						
		#type
				display: flex
				flex-direction: row
				justify-content: space-between
				width: 80.026vw
				height: auto
				margin: 3.69458vh 0 3.202vh 0
				p
						padding: 0 0 12px 0
						margin: 0

		#fin
				display: flex
				flex-direction: column
				align-items: center
				width: 72vw
				height: auto

				.datebox
						display: flex
						flex-direction: row
						justify-content: center
						align-items: center
						background-color: white
						border-radius: 50px
						height: 3.325vh
						width: 37.6vw
						margin: 0 0 26px 0

						input
								min-height: 2vh
								border-style: none
								border-radius: 10px
								width: 22.133vw
								font-family: Roboto Bold
								font-size: 1.4778vh
								text-align: center
								color: black
								padding: 0
								margin: 0 9px 0 0
						img
							  width: 5.0667%
				
				.box
						display: flex
						flex-direction: row
						justify-content: space-between
						align-items: center
						height: 4.31vh
						width: 100%
						margin: 0 0 2.586vh 0

						.input_div
								display: flex
								flex-direction: row
								justify-content: space-between
								align-items: center
								width: 57vw
								height: 5.216vh
								background-color: white
								border-radius: 10px

								p
										color: #737474
										font-size: 15px
										margin: 0 0 0 5vw
								
								img
										margin: 0 5vw 0 0
										width: 4%

						input
								min-height: 5.216vh
								border-style: none
								border-radius: 10px
								width: 52vw
								font-size: 1.4778vh
								text-align: left
								color: #737474
								padding: 0 0 0 5vw

				.box:nth-child(2)
						justify-content: right
						height: 7.68vh
						width: 100%

						input
								min-height: 7.68vh
								width: 50vw
								font-family: Roboto Bold
								font-size: 36px
								text-align: right
								padding: 0 26px 0 0

				.box:nth-child(6)
						height: 7.68vh
						margin: 0 0 5.2167vh 0

						input
								min-height: 7.68vh

.NumKeyBoard_select_box
		flex-direction: column
		align-items: center
		width: 100vw
		height: 43.596vh
		position: fixed
		bottom: 0
		background: #FFFFFF
		transition: 0.5s
		box-shadow: 3px 0px 5px 2px rgba(100, 98, 98, 0.25)
		border-radius: 20px 20px 0px 0px
		z-index: 1

		img
				margin: 17px 0 27px 0

		.board_box
				display: flex
				flex-direction: row
				justify-content: space-between
				align-items: center
				width: 59.4667vw
				height: auto

				p
						font-size: 24px
						color: #737474
						margin: 20px 0 20px 0

				img
						width: 20.39%
		
		.board_box:nth-child(5)
				width: 69vw


.sort_select_box
		flex-direction: column
		align-items: center
		width: 100vw
		height: 39vh
		position: fixed
		bottom: 0
		background: #FFFFFF
		transition: 0.5s
		box-shadow: 3px 0px 5px 2px rgba(100, 98, 98, 0.25)
		border-radius: 20px 20px 0px 0px
		z-index: 1

		img
				margin: 17px 0 20px 0

		p
				font-size: 16px
				color: #8E5FF4
				margin: 0 0 30px 0

		.sort_bar
				display: flex
				flex-direction: row
				align-items: center
				flex-wrap: wrap
				width: 84vw
				height: auto
		
				.sort_box
						display: flex
						flex-direction: column
						align-items: center
						width: 13.0667vw
						height: 9vh
						margin: 10px 39px 15px 0

						img
								margin: 0

						p
								font-size: 15px
								color: #737474
								margin: 5px 0 0 0

				.sort_box:nth-child(4n+1)
						margin: 10px 0 15px 0

.line
	width: 20.8vw

#popup
    flex-direction: column
    justify-content: center
    align-items: center
    position: absolute
    top: 0
    left: 0
    height: 100vh
    width: 100vw
    backdrop-filter: blur(5px)
    z-index: 2

    #background
        display: flex
        justify-content: space-around
        align-content: space-around
        align-items: center
        height: 100vh
        width: 100vw
        background-color: rgba(0, 0, 0, 0.5)
        
        .box_regular
            display: flex
            align-items: center
            flex-direction: column
            width: 65.6vw
            height: 34vh
            border-radius: 12px
            background-color: white
            opacity: 1

.message
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	width: 100%
	height: 84.78%
	border-bottom: 0.3px solid #B3B3B3
	
	p
		color: black
		font-size: 12px
		margin: 3px

	p:nth-child(1)
		font-size: 17px
		margin: 15px 0

	figure
		display: flex
		justify-content: center
		align-items: center
		width: 100%
		height: auto
		margin: 0

.confirm
        color: #474EF2
        font-size: 16px
        margin: auto 0

#save_btn
	margin: 0
	height: 100%
	background-color: #F4F4F4
	display: flex
	align-items: center
	height: 3.94vh
	border: none
	padding: 0

#navbar
	img
		height: 77.647%
</style>