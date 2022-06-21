<script>
var p = [30, 60, 90]
var ina = -1
export default{
    methods:{
        minus(a, b){
            return a-b
        },
        per(){
            if(ina != 2) ina = ina + 1
            else ina = 0
            return p[ina]
        }
    }
}
</script>