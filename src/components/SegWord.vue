<template>
  <span 
    v-if = "data.ifseg"
    @mouseenter = "emitshowseg"
    @mouseleave = "hideseg"
    class = "segword"
   >
    {{data.word}}
  </span>
  <span v-else>
    {{data.word}}
  </span>
</template>

<script>
import { onMounted,reactive } from 'vue'
import emitter from '../bus/eventbus.js'

export default {
    props:['word',"imageid"],
    setup(props){
        let data = reactive({
            word:props.word[0], //注释词
            ifseg:props.word[1],    //是否有对应图片标注
            categoryid:props.word[2]   //若有对应图片标注，则为对应的注释下标，反则为null
        })

        function emitshowseg(){ //告知拥有对应imageid的标注的id
            emitter.emit(String(props.imageid)+'showseg',data.categoryid)
        }

        function hideseg(){
            emitter.emit(String(props.imageid)+'hideseg',data.categoryid)
        }

        onMounted(()=>{

        })
        return {
            data,emitshowseg,hideseg
        }
    }
}
</script>

<style>
.segword{
    font-size:28px;
    font-style: bold;
    color:brown;
    cursor: pointer;
}
</style>