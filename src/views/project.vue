<template lang="pug">
#project
	.bar
		img(src = "../assets/image/btn/btn_arrow_back.png", height = "2.8325%")
		img(src = "../assets/image/btn/btn_search.png", height = "2.8325%")
		p 儲蓄專案
	#type_bar 
		p 一般儲蓄
		p 個人專案
		p 共同專案
		p 達成成就
	#project_list
	#no_project
		p 尚未建立專案
	img#add_project_btn(src = "../assets/image/btn/btn_AddProject.png", height = "32px")

#add_project
	.bar
		img(src = "../assets/image/btn/btn_arrow_back.png", height = "2.8325%")
		img(src = "../assets/image/btn/btn_close.png", height = "2.8325%")
		p 新增專案
	form#project_form
		.box
			p 專案名稱
			input(type = "text", name = "project_name")
		.box
			p 分類顏色
			.color_selector
				img(src = "../assets/image/project/Project_colordot_orange.png", height = "50.535%")
				img(src = "../assets/image/btn/btn_arrow_down.png", height = "17.836%")
		.box
			p 日期
			.date_box 
				input(type = "text", name = "start_date", class = "calendar")
				p -
				input(type = "text", name = "end_date", class = "calendar")
		.box
			p 目標金額
			input(type = "text", name = "target_number")
		.box
			p 參與成員
			p#member
			img#add_mem(src = "../assets/image/MainPage/addcircle.png", height = "85.7%")
		.box
			p 分配設定
			#distribute_setting
				p （預設）均分
				img(src = "../assets/image/btn/btn_arrow_down.png", height = "17.836%")
		.box
			p 提醒
			img(src = "../assets/image/project/btn_switch.png", height = "68.57%")
		.box
			p 備註
			textarea(name = "note")
		button(type="submit")
			img(src = "../assets/image/btn/btn_save.png", height = "100%")
		#add_project-output

#add_member
	.bar
		img(src = "../assets/image/btn/btn_arrow_back.png", height = "2.8325%")
		img(src = "../assets/image/btn/btn_close.png", height = "2.8325%")
		p 新增成員
	#search_box 
		p 請輸入好友ID 
		#id_box 
			input(type = "text", name = "userid")
			img(src = "../assets/image/btn/btn_search.png", height = "47.56%")
	#result
		img(src = "../assets/image/project/project_adduser_laila.png", height = "28.2667%")
		p USER
		img#add_mem_btn(src = "../assets/image/btn/btn_save.png", width = "52%")
	#wrong
		p 查無此人

#show_personal_project
	.bar
		img(src = "../assets/image/btn/btn_arrow_back.png", height = "2.8325%")
		img(src = "../assets/image/btn/btn_close.png", height = "2.22167%")
		p 個人專案
	#graph_box 
		img(src = "../assets/image/project/Project_month-bg.png", height = "25px")
		img#graph(src = "../assets/image/project/Project_personalProject_graph.png", height = "67%")
	.project_detail
		.title 
			p#item 一般儲蓄
			img(src = "../assets/image/btn/btn_edit.png", height = "18px")
		.planned_speed_graph
			img(src = "../assets/image/project/Project_progressBar-bg.png", width = "82%")
			p#money $800
		.complete_percent 
			p#percent 35%
			p Completed
		.date_box 
			p 儲蓄時間
			p#date 2022.04.28-2022.06.14
		.target_money
			p 目標金額
			p#money $800
		
#show_joint_project
	.bar
		img(src = "../assets/image/btn/btn_arrow_back.png", width = "6.4%")
		img(src = "../assets/image/btn/btn_close.png", width = "5.33333%")
		p 共同專案
	img#drop_down_btn(src = "../assets/image/project/Project_month-bg.png", width = "22.4%")
	.ranking_list
	.project_detail
		.title 
			p#item 一般儲蓄
			img(src = "../assets/image/btn/btn_edit.png", height = "18px")
		.planned_speed_graph
			img(src = "../assets/image/project/Project_progressBar-bg.png", width = "82%")
			p#money $800
		.complete_percent 
			p#percent 35%
			p Completed
		.date_box 
			p 儲蓄時間
			p#date 2022.04.28-2022.06.14
		.target_money
			p 目標金額
			p#money $800

#navbar
	img(src = "../assets/image/navbar/unselect/barcode_unselect.png")
	img(src = "../assets/image/navbar/unselect/account_unselect.png")
	img(src = "../assets/image/navbar/unselect/mainpage_unselect.png" @click="skip_mainpage")
	img(src = "../assets/image/navbar/unselect/accounting_unselect.png" @click="skip_accounting")
	img(src = "../assets/image/navbar/selected/project_select.png") 
</template>

<script>
export default{
    name: "ProJect",
		methods:{
			skip_mainpage(){
				this.$router.push('/mainpage')
			},
			skip_accounting(){
				this.$router.push('accounting')
			}
		}
}
</script>

<style lang="sass">

@font-face 
    font-family: "Roboto Bold"
    src: url(../assets/image/font/Roboto-Bold.ttf)

#project
    display: flex
    flex-direction: column
    align-items: center
    width: 100vw
    height: auto
    min-height: 100vh
    background-color: #F4F4F4
    position: absolute
    top: 0

    .bar
        display: flex
        flex-direction: column
        align-items: center
        width: 100vw
        height: 11.9458vh
        background-color: white
        border-bottom: 0.3px solid #B3B3B3

        img:nth-child(1)
            position: absolute
            left: 6.6667vw
            top: 6.0345vh

        img:nth-child(2)
            position: absolute
            right: 6.9333vw
            top: 6.0345vh

        p
            font-size: 1.97vh
            position: relative
            top: 6.0345vh
            margin: 0

    #type_bar
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
        width: 86.1333vw
        height: 4.187vh
        margin: 3.69vh 0 0 0

        p
            padding: 0 0 12px 0
            border-bottom: none

        p:nth-child(2)
            border-bottom: 2px solid #410ADF

    #no_project
        display: none
        flex-direction: row
        justify-content: center
        align-items: center
        width: 80.2667vw
        height: 10vh
        background-color: white
        box-shadow: 0px 8px 23px rgba(0, 0, 0, 0.1)
        border-radius: 8px
        margin: 0 0 7.88vh 0
    
    #project_list
        display: flex
        flex-direction: column
        align-items: center
        width: 80.2667vw
        height: auto
        margin: 5.17vh 0 0 0

        .project_block
            display: flex
            flex-direction: row
            justify-content: space-between
            align-items: center
            width: 80.2667vw
            height: 13.054vh
            background-color: white
            box-shadow: 0px 8px 23px rgba(0, 0, 0, 0.1)
            border-radius: 8px
            margin: 0 0 7.88vh 0

            #right_btn
                margin: 0 4vw 0 0 

            .project_infor
                display: flex
                flex-direction: column
                align-items: center
                width: 80%
                height: auto
                margin: 0 0 0 5.33vw
                font-size: 12px

                .type_and_date
                    display: flex
                    flex-direction: row
                    justify-content: space-between
                    align-items: center
                    width: 100%
                    height: 1.847vh
                    margin: 0 0 15px 0 

                    img
                        margin: 0 2.133vw 0 0

                    p
                        margin: 0
                    #item
                        margin: 0 auto 0 0
                        
                .plannd_speed_infor
                    display: flex
                    flex-direction: row
                    justify-content: space-between
                    align-items: center
                    width: 100%
                    height: 1.847vh
                    margin: 0 0 15px 5px

                    #percent
                        font-family: Roboto Bold
                        font-size: 24px

    #add_project_btn
        margin: 0 0 20vh 0

#add_project
    display: none
    flex-direction: column
    align-items: center
    width: 100vw
    height: 100vh
    background-color: #F4F4F4
    transform: translateX(100%)
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

        img:nth-child(1)
            position: absolute
            left: 6.6667vw
            top: 6.0345vh

        img:nth-child(2)
            position: absolute
            right: 6.9333vw
            top: 6.0345vh

        p
            font-size: 1.97vh
            position: relative
            top: 6.0345vh
            margin: 0

    #project_form
        display: flex
        flex-direction: column
        align-items: center
        width: 72.2667vw
        height: auto
        margin: 4.31vh 0 0 0

        .box
            display: flex
            flex-direction: row
            justify-content: space-between
            align-items: center
            height: 4.31vh
            width: 100%
            margin: 0 0 2.586vh 0

        .box:nth-child(8)
            align-items: start
            margin: 0 0 6.48vh 0
            height: 7vh

            p 
                margin: 10px 0

            textarea
                width: 40vw
                height: 7vh
                border-style: none
                border-radius: 6px
                padding: 8px

        input
            min-height: 4.31vh
            border-style: none
            border-radius: 6px
            width: 40.16vw
            font-size: 1.4778vh
            text-align: right
            padding: 0 3.733vw 0 0
            color: #737474

        .box:nth-child(3)
            .date_box
                display: flex
                flex-direction: row
                justify-content: space-between
                align-items: center
                width: 50vw
                max-width: 44vw

                input
                    text-align: center
                    padding: 0
                    width: 20vw
        
        .color_selector
            display: flex
            flex-direction: row
            justify-content: center
            align-items: center
            height: 4.31vh
            width: 18.1333vw
            border-style: none
            border-radius: 6px
            background-color: white

            img:nth-child(1)
                margin: 0 3.7333vw 0 0

        #distribute_setting
            display: flex
            flex-direction: row
            justify-content: right
            align-items: center
            height: 4.31vh
            width: 40.16vw
            padding: 0 3.733vw 0 0
            border-style: none
            border-radius: 6px
            background-color: white

            p
                font-size: 12px
                margin: 0 3.2vw 0 0
                color: #CECECE


        button
            background-color: #F4F4F4
            display: flex
            align-items: center
            height: 3.94vh
            border: none
            padding: 0
            
            img
                margin: 0

#add_member
    display: none
    flex-direction: column
    align-items: center
    width: 100vw
    height: 100vh
    background-color: #F4F4F4
    transform: translateX(100%)
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

        img:nth-child(1)
            position: absolute
            left: 6.6667vw
            top: 6.0345vh

        img:nth-child(2)
            position: absolute
            right: 6.9333vw
            top: 6.0345vh

        p
            font-size: 1.97vh
            position: relative
            top: 6.0345vh
            margin: 0

    #search_box
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
        width: 72.2667vw
        height: 4.187vh
        margin: 6.28vh 0 9.65vh 0

        p
            font-size: 13px

        #id_box
            display: flex
            flex-direction: row
            justify-content: space-between
            align-items: center
            width: 46.4vw
            height: 4.187vh
            background-color: white
            border-radius: 6px

            input
                min-height: 4.31vh
                border-style: none
                border-radius: 6px
                width: 30vw
                font-size: 1.4778vh
                padding: 0 0 0 3.733vw
                color: #737474

            img
                margin: 0 2.3vw 0 0

    #result
        display: none
        flex-direction: column
        align-items: center
        width: 100vw
        height: auto

        p
            font-size: 16px
            margin: 2.09vh 0 3.85vh 0

    #wrong
        display: none
        flex-direction: column
        align-items: center
        width: 100vw
        height: auto

        p
            font-size: 16px 

    

#show_personal_project
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

        img:nth-child(1)
            position: absolute
            left: 6.6667vw
            top: 6.0345vh

        img:nth-child(2)
            position: absolute
            right: 6.9333vw
            top: 6.0345vh

        p
            font-size: 1.97vh
            position: relative
            top: 6.0345vh
            margin: 0
    
    #graph_box
        display: flex
        flex-direction: column
        align-items: center
        width: 100vw
        height: 28.82vh
        margin: 2.955vh 0 0 0

        #graph
            margin: 3.394vh 0 0 0
    
    #project_detail
        display: flex
        flex-direction: column
        align-items: center
        width: 90vw
        height: 38vh
        background-color: white
        margin: 2.894vh 0 0 0
        border-radius: 10px

        #title
            display: flex
            flex-direction: row
            justify-content: space-between
            align-items: center
            width: 74.6667vw
            height: 2.463vh
            margin: 3.2vh 0 0 0

            p
                font-size: 15px

        #planned_speed_graph
            display: flex
            flex-direction: row
            justify-content: space-between
            align-items: center
            width: 74.6667vw
            height: 2.1vh
            margin: 7.635vh 0 0 0

        #complete_percent
            display: flex
            flex-direction: row
            justify-content: start
            align-items: end
            width: 74.6667vw
            height: 4.9vh
            margin: 1.724vh 0 0 0

            p
                font-size: 12px
                margin: 0 0 2px

            #percent
                font-size: 24px
                margin:  0 10px 0 0

        #date_box
            display: flex
            flex-direction: row
            justify-content: space-between
            align-items: center
            width: 74.6667vw
            height: 2.463vh
            margin: 2vh 0 0 0
            padding: 2vh 0
            border-top: 0.2px solid #B3B3B3 

        #target_money
            display: flex
            flex-direction: row
            justify-content: space-between
            align-items: center
            width: 74.6667vw
            height: 2.463vh
            margin: 0
            padding: 2vh 0
            border-top: 0.2px solid #B3B3B3
#navbar
	img
		height: 77.647%
</style>