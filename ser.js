// 載入 express, 現在可以放心使用 import 了
import express from 'express'

import { dirname } from 'path'
import { fileURLToPath } from 'url'

import config from './config.js'
import mysql from 'mysql'

// 載入 body-parser
import bodyParser from 'body-parser'

//import fs from 'fs';

//import mod from ''

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 建立一個 express (也就是網頁伺服器)實體
const app = express()
const port = 7764

import mod from './module.js'

var connection = mysql.createConnection(config.mysql)
// connect to database
connection.connect(function(err){
  if(err) console.log(err)
})



// 處理其它網址
// http://localhost:7764/exercise.html
app.use(express.static(`${__dirname}/dist`))

// 設定 body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/login',(req,res) => {
  connection.query('CREATE TABLE IF NOT EXISTS user (id VARCHAR(30), name VARCHAR(30), password VARCHAR(30))')

  let UID = "'"+`${req.query.id}`+"'"
  let PWD = "'"+`${req.query.password}`+"'"

  const search_user = `
    SELECT id FROM user
    WHERE id = ${UID} and password = ${PWD}`
  connection.query(search_user, (err, row, fields) => {
    if (err)
      console.log('fail to search: ', err)
    if (row[0] === undefined) {
      res.send("failed,try again")
    }
    else{
      res.send(mod.gettabledata(row, 'id', 0))
    }
  })
})

app.get('/username',(req,res) => {
  let UID = "'"+`${req.query.id}`+"'"

  const search_username = `
    SELECT name FROM user
    WHERE id = ${UID}`
  connection.query(search_username, (err, row, fields)   => {
    if (err)
      console.log('fail to search: ', err)
    if (row[0] === undefined) {
      res.send("failed,try again")
    }
    else{
      res.send(mod.gettabledata(row, 'name', 0))
    }
  })
})

// sign up
app.get('/signup', (req, res) => {
  // create table
  connection.query('CREATE TABLE IF NOT EXISTS user (id VARCHAR(30), name VARCHAR(30), password VARCHAR(30))')

  //change to string
  let UID = "'" + `${req.query.id}` + "'"
  let NAME = "'" + `${req.query.name}` + "'"
  let PWD = "'" + `${req.query.password}` + "'"
   
  let add_user = false
  const search_id = `
    SELECT id FROM user
    WHERE id = ${UID}`
  const add = `INSERT INTO user (id, name, password) VALUES (${UID}, ${NAME}, ${PWD})`
  connection.query(search_id, (err, rows, fields) => {
    if (err)
      console.log('fail to search: ', err)
    console.log(rows)
    if (rows[0] === undefined) {
      add_user = true
    }
    else{
      res.send("Signup faild.")
    }
  })
  
  setTimeout(() => {
    if (add_user){
      console.log(add_user)
      connection.query(add, (err, result) => {
        if (err) console.log('fail to insert: ', err)
      })
      res.send("signup")
    }
  }, 100)
  
  
})

app.get('/record',(req,res) => {
  connection.query('CREATE TABLE IF NOT EXISTS account(id VARCHAR(30), year VARCHAR(4), month VARCHAR(2), day VARCHAR(2), cost VARCHAR(30), sort VARCHAR(30), items VARCHAR(30), account VARCHAR(30), type VARCHAR(1))')
  
  let id = "'"+`${req.query.id}`+"'"
  let temp_date = `${req.query.date}`
  let cost = "'" + `${req.query.cost}` + "'"
  let sort = "'"+`${req.query.sort}`+"'"
  var items = ""
  if(req.query.type!=='2'){
    items = "'" + `${req.query.items}` + "'"
  }
  else{
    items = "'儲蓄'"
  }

  let account = "'" + `${req.query.account}` + "'"
  let type = "'" + `${req.query.type}` + "'"
  
  let year = "'" + `${temp_date[6]}` + `${temp_date[7]}` + `${temp_date[8]}` + `${temp_date[9]}` + "'"
  let month = "'" + `${temp_date[0]}` + `${temp_date[1]}` + "'"
  let day = "'" + `${temp_date[3]}` + `${temp_date[4]}` + "'"

  if(mod.checkBlank('record', items,temp_date,cost,sort,account,type)===1){
    const add_record = `INSERT INTO account (id, year, month, day, cost, sort, items, account, type) VALUES (${id}, ${year}, ${month}, ${day}, ${cost}, ${sort}, ${items}, ${account}, ${type})`
    connection.query(add_record, (err) => {
      if (err) console.log('fail to insert: ', err)
    })
    res.send('0')
  }
  else{
    console.log("success")
    res.send(mod.checkBlank('record',items,temp_date,cost,sort,account,type))
  }
})

// 啟動伺服器
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})