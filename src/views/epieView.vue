<template lang="pug">
</template>

<script>
  export default{
    name: 'EpieView',
    data(){
      return{
        d: 'unknown',
        m: 'unknown',
        y: 'unknown'
      }
    },
    methods:{
      gd(day, month, year){
        this.d = day
        this.m = month + 1
        this.y = year
      }
    },
    setup(){
      const date = ref([])
      return{
        date
      }
    },
    components:{
    }
  }
</script>