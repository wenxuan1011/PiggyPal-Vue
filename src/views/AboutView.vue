<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>Count: {{Count}}</p>
    <button v-on:click="plus">Plus</button>
    <br><br>
    <button v-on:click="axios_test">Click me</button>
    <p>{{msg}}</p>
    <button @click="Minus">Click me</button>
    <p>{{test_function}}</p>
    <button @click="sql_test">Mysql test</button>
    <p>{{sqlll}}</p>
    <router-link to ="/">test_router</router-link>
  </div>
</template>

<script>
import axios from 'axios'
import t from './test_fun.vue'
const port = 7764
export default{
  data(){
    return{
      Count: 0,
      msg: 'Unsuccessful',
      test_function: 'test_function',
      sqlll: 'Unknown',
      test_fun: 'test_fun'
    }
  },
  methods:{
    plus(){
      this.Count = this.Count + 1
    },
    axios_test(){
      axios.get(`http://luffy.ee.ncku.edu.tw:${port}/step1`).then((res)=>{
        this.msg = res.data
      })
    },
    sql_test(){
      axios.get(`http://luffy.ee.ncku.edu.tw:${port}/sq`).then((res)=>{
        this.sqlll = res.data
      })
    },
    Minus(){
      this.test_function = t.methods.minus(5, 3)
    },
  }
}
</script>
