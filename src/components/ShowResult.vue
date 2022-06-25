<template>
<div class='show-result'>
  <div 
    class = "tips"
    v-if = "data.Imagedatalist.length==0">
    {{data.tip1}}
    <br><br>
    {{data.tip2}}
  </div>
  <div v-else 
    >
    <SingleResult
      v-for = "(imagedata,index) in data.Imagedatalist"
      :key = "index"
      :imagedata = "imagedata"
    />
  </div>
</div>
</template>

<script>
import { ref,reactive } from '@vue/reactivity'
import SingleResult from './SingleResult.vue'
import { onMounted } from 'vue'
import emitter from '../bus/eventbus.js'

export default {
    name:'ShowResult',
    components:{
        SingleResult
    },
    setup(){
        let data = reactive({
            tip1:'本网站可供检索的词语有限，可尝试检索基础词：鸟、猫、人等名词。当鼠标移动到红色放大加粗字体时，可以看见canvas中绘制的标注区域。',
            tip2:'点击右上方可视化按钮可查看汉化后COCO数据集可解释汉语词的数量与占比。',
            Imagedatalist:[],
        })

        function showImageInfo(imageinfo){
            data.Imagedatalist = []
            //缓解数据变化过快
            setTimeout(()=>{
                data.Imagedatalist = imageinfo
            },200)
        }

        onMounted(()=>{
            emitter.on('broadcastImagedatalist',showImageInfo)
        })

        return {
           data,showImageInfo
        }
    }

}
</script>

<style>
.show-result{
    justify-content: center;
    display: flex;
    width: 100%;
    margin-bottom: 20px;
}    

.tips{
    margin-top: 15px;
    font-size:18px;
    padding: 20px;
    width:95%;
    background-color: aliceblue;
}

</style>