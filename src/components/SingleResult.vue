<template>
  <div class = 'single-result'>
     <div class = "info-area">
      <canvas 
            :width = "canvasstyle.width" 
            :height= "canvasstyle.height"
            ref = "canvas"
      />
      <span class = "caption-area">
        <SegWord
          v-for = "(word,index) in data.caption"
          :key = "index"
          :word = "word"
          :imageid = "imagedata['image_id']"
        />
      </span>
     </div>
  </div>
</template>

<script>
import { ref,reactive,onMounted } from 'vue'
import { COCOdata } from '../dataset/COCOdata.js'
import SegWord from './SegWord.vue'
import emitter from '../bus/eventbus.js'
import useSearch from '../hooks/useSearch.js'

export default {
    name:'SingleResult',
    props:["imagedata"],
    components:{
      SegWord
    },
    setup(props){
      const canvas = ref(null)
      let canvasstyle = reactive({
        width:400,
        height:400,
      })

      let data = reactive({
        caption:[],
      })

      const { drawCanvasSeg,hideCanvasSeg } = useSearch()

      onMounted(()=>{
        //实现加载caption标注
        props.imagedata['caption'].forEach((word)=>{
          let flag = 0
          for(let key in COCOdata){
            if(COCOdata[key].includes(word)){
              data.caption.push([word,true,key])
              flag = 1
            }
          }
          if(flag==0){
            data.caption.push([word,false,null])
          }
        })
        //加载图片 实现canvas绘制图片
        let image = new Image()
        image.src = props.imagedata['url']
        let ctx = canvas.value.getContext('2d')

        let p = new Promise((res)=>{
          image.onload = function(){
            canvasstyle.height = image.height
            canvasstyle.width = image.width
            res()
          }
        })

        p.then(()=>{
            ctx.drawImage(image,0,0)
        })

        //准备绘制图片标注
        emitter.on(String(props.imagedata['image_id'])+'showseg',(categoryid)=>{
          props.imagedata['instance_index'].forEach((item)=>{
            if(item['category_id'] === parseInt(categoryid)){
              drawCanvasSeg(canvas,item['segmentation'])
            }
          })
        })

        //去除图片标注 = 重新绘图
        emitter.on(String(props.imagedata['image_id'])+'hideseg',()=>{
          hideCanvasSeg(canvas,image)
        })
      })
      
      return {
        data,canvas,canvasstyle
      }
    }
}
</script>

<style>
.single-result{
  margin-top: 20px;
  width:100%;
  display: flex;
  justify-content: center;
}

.info-area{
  padding: 10px;
  width:95%;
  background-color: white;
  display: flex;
}

.info-area canvas{
  margin-left:20px;
  width:400px;
}

.info-area .caption-area{
  font-size: 20px;
  margin:10px 20px;
}
</style>