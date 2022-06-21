<template>
    <input type="text" v-model="message" />
    <p>{{ message }}</p>
    <button @click="init">Draw</button>
    <div id="echartss" style="width: 600px;height:400px;"></div>
</template>

<script>
import * as echarts from 'echarts'
import pert from '../views/test_fun.vue'
export default{
  name: 'PiePies',
  data(){
    return {
      message: 'binding'
    }
  },
  /*
  mounted(){
    this.init()
  },
  */
  methods:{
    init(){
      let myChart = echarts.init(document.getElementById('echartss'))
      var option
      const gaugeData = [
    {
      value: 0,
      name: 'Perfect',
      title: {
        offsetCenter: ['0%', '-20%']
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '0%']
      }
    },
    /*
    {
      value: 40,
      name: 'Good',
      title: {
        offsetCenter: ['0%', '0%']
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '10%']
      }
    },
    {
      value: 60,
      name: 'Commonly',
      title: {
        offsetCenter: ['0%', '30%']
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '40%']
      }
    }
    */
  ];
  option = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: '#464646'
          }
        },
        axisLine: {
          lineStyle: {
            width: 40
          }
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          distance: 50
        },
        data: gaugeData,
        title: {
          fontSize: 14
        },
        detail: {
          width: 50,
          height: 14,
          fontSize: 14,
          color: 'auto',
          borderColor: 'auto',
          borderRadius: 20,
          borderWidth: 1,
          formatter: '{value}%'
        }
      }
    ]
  };
  setInterval(function () {
    gaugeData[0].value = pert.methods.per()
    //gaugeData[0].value = +(Math.random() * 100).toFixed(2);
    //gaugeData[1].value = +(Math.random() * 100).toFixed(2);
    //gaugeData[2].value = +(Math.random() * 100).toFixed(2);
    myChart.setOption({
      series: [
        {
          data: gaugeData,
          pointer: {
            show: false
          }
        }
      ]
    });
  }, 2000);

  option && myChart.setOption(option);

    }
  }
}
</script>