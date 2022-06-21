"use strict";
import 'regenerator-runtime/runtime.js'

var today = new Date();

export function gettabledata(table, parameter, row){
    let result=JSON.stringify(table[row])
    result=JSON.parse(result)
    result=result[parameter]
    
    return result;
}

export function getTodayMoney(ID,table,year,month,date,selection,type){
    var result= caldaymoney(ID,table,year,month,date,selection,type)
    return result
}

export async function caldaymoney(ID,table,year,month,date,selection,type){
    var results=0
    await $.get('./todaymoney',{
        ID:ID,
        table:table,
        selection:selection,
        month:month,
        date:date,
        year:year,
        type:type
    },(data) =>{
        var result=0;
        if(typeof(data)!=String){
            var total=0
            for (var i in data){
                total+=StringtoInt(gettabledata(data, `${selection}`, i))
                i++;
            }
            result=total
        }
        else{
            result=0;
        }
        results=result
    });
    
    return results;
}

export function getMonthlyMoney(ID,table,selection,type){
    var result= caltotalmoney(ID,table,selection,type)
    return result
}

export async function caltotalmoney(ID,table,selection,type){
    var results=0
    var today= new Date()
    await $.get('./monthlymoney',{
        ID:ID,
        table:table,
        selection:selection,
        month:datetransfer(today.getMonth()+1),
        year:StringtoInt(today.getFullYear()),
        type:type
    },(data) =>{
        var result=0;
        if(typeof(data)!=String){
            var total=0
            for (var i in data){
                total+=StringtoInt(gettabledata(data, `${selection}`, i))
                i++;
            }
            result=total
        }
        else{
            result=0;
        }
        results=result

    });
    return results;
}
//need to check what is the detail in table

export async function getProjectMoney(ID){
    var results=0
    await $.get('./getProject',{
        ID:ID,
    },(data) =>{
        var totalremain = 0
        for (let i in data){
            let lastday = new Date(`${gettabledata(data, `end_month`, i)}/${gettabledata(data, `end_day`, i)}/${gettabledata(data, `end_year`, i)}`)
            let startday = new Date()
            if(lastday-startday<0){
                continue;
            }
            var remainday= Math.abs(lastday-startday)
            
            if(remainday>0 || remainday !== undefined){
                remainday= Math.ceil(remainday/(1000*3600*24))+1
                let money= StringtoInt(gettabledata(data, `target_number`,i))-StringtoInt(gettabledata(data, `saved_money`,i))//0 is for simulating money already save for this project
                money= money/remainday
                totalremain+=money
            }
            else continue
        }
        results=totalremain
    });
    return results;
}
export async function calprojectpercent(ID, project_name){
    var result=0
    await $.get('./getproject', {
        ID:ID
    },(data) =>{
        for(var i in data){
            if(project_name === data[i].project_name){
                result=StringtoInt(gettabledata(data, 'saved_money', i))/StringtoInt(gettabledata(data, 'target_number', i))
                result=result/100
            }
        }
    })
    
    return Math.round(result,-1)
}
export function StringtoInt(x) {
    const parsed = parseInt(x, 10)
    if (isNaN(parsed)) { return 0; }
    return parsed
}

export function datetransfer(date){
    if (StringtoInt(date)<10){
        date=`0${date}`
    }
      else{
        date=date
      }
    return date
}

export function checkBlank(page, ...input){
    var lengths = 1
    var recordmessage = ["項目", "日期", "金額", "分類", "帳戶", "類別"]
    var projectmessage = ["專案名稱", "日期", "目標金額"]
    var financial = ["type", "ITEM", "YEAR", "MONTH", "DAY", "MONEY", "REPEAT"]
    var account = ["NAME", "CURRENCY", "MONEY"]
    var pages = []
    
    switch(page){
        case 'record':
            pages = recordmessage
            break
        case 'project':
            pages = projectmessage
            break
        case 'financial':
            pages = financial
        case 'account':
            pages = account
            break
    }

    for (var j =0; j<input.length; j++){
        lengths=lengths*(input[j].length-2)
        if(lengths===0){
            return pages[j];
        }
        if(lengths>1&&j===input.length-1){
            return 1;
        }
    }
}

export function PopUpMessage(type){
    if(type < 4){
        const PopUpTital = ['恭喜本月已存下xx元', '恭喜完成專案！', '請輸入完整資訊', '功能待開發！']
        const PopUpGif = ['pig', 'congrate', 'eye', 'glasses']
        
        $('#popup .box_login, #popup .box_delete').css('display','none')
        $('#popup .box_regular').css('display','flex')
        $('#popup').css('display','flex')
        $('#popup #background .box_regular .message p').html(`${PopUpTital[type]}`)
        $('#popup #background .box_regular .message figure img').attr("src",
        `./image/PopUpMessage/PopUpMessage_${PopUpGif[type]}.gif`)
    }
    else if(type == 4){
        $('#popup .box_regular, #popup .box_delete').css('display','none')
        $('#popup .box_login').css('display','flex')
        $('#popup').css('display','flex')
    }
    else{
        console.log('delete')
        $('#popup .box_regular, #popup .box_login').css('display','none')
        $('#popup .box_delete').css('display','flex')
        $('#popup').css('display','flex')
    }
}

export async function getAllUser(){
    var all_user=[]
    await $.get('./getAllUser',{}
        ,(data) =>{
            all_user = data
        })
    return all_user
}

export async function sergetProject(user){
    var all_project
    await $.get('./sergetProject',{
        user : user
    },(data) => {
        all_project = data
        all_project = all_project.sort(function(a,b){
            return a.remainday - b.remainday
        })
        
    })
    return all_project
}

export function getColor(color){
    const ColorCode = ['#F42850', '#F6A93B', '#F4EC28', '#7ED321', '#4A90E2', '#8E5FF4', '#FC75CE']
    const ColorImgSrc = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink']
    for(let i=0;i<7;i++){
        if(color === ColorCode[i]){
            return ColorImgSrc[i]
        }
    }
}

export function detailpicture(data, type){
    var exptype = ['飲食', '購物', '家居', '個人', '交通', '娛樂', '醫療', '其他']
    var intype = ['薪水', '獎金', '投資', '還款', '中獎', '利息', '其他']
    var exppicture = ['food', 'shopping', 'house', 'personal', 'transport', 'entertainment', 'hospital', 'other']
    var inpicture = ['salary', 'bonus', 'investment', 'repayment', 'win', 'intersest', 'other']
    if(type == '0'){
        for (var i in exptype){
            if (exptype[i] == data){
                return exppicture[i]
            }
        }
    }
    if(type == '1'){
        for (var i in intype){
            if (intype[i] == data){
                return inpicture[i]
            }
        }
    }
}

export default{
    gettabledata, // get id inside the row of column select from database
    getMonthlyMoney, // get money in each table, remember to use caltotalmoney to get in integer
    caltotalmoney, // calculate total money
    getProjectMoney, // get daily project saving
    calprojectpercent, // calculate project complete %(in .1f )
    StringtoInt, // transfer string to integer
    datetransfer, // tranfer date to 0date if date<10
    checkBlank, // check if there is a blank in input. Need to input all input to check, and it will return 1 for all inputs are filled
    getAllUser, // get all users' id
    sergetProject, // FOR SERVER TO GET PROJECT
    PopUpMessage, // popup message, need to input the word you want to show
    getColor, // turn the color code into the color, need to input the color code of the project
    detailpicture, //return detail's picture's name
} 