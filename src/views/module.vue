<script>
export default{
    methods:{
        datetransfer(date){
            if(this.StringtoInt(date)<10){
                date=`0${date}`
            }
            else{
                date=date
            }
            return date
        },
        StringtoInt(x) {
            const parsed = parseInt(x, 10)
            if (isNaN(parsed)) { return 0; }
            return parsed
        }
    }
}
</script>