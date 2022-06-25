

import axios from 'axios'
import emitter from '../bus/eventbus.js'

export default function(){

    const drawCanvasSeg = function(canvas,segmentation){  //绘制标注区域
        console.log(canvas,segmentation, segmentation instanceof Array,segmentation.length)

        let ctx = canvas.value.getContext('2d')
        segmentation.forEach((segitem)=>{  //有时候可能不只有一个区域被标注，即segmentation.length>=1
            ctx.beginPath()
            ctx.moveTo(segitem[0],segitem[1]) //绘制标注区域起始点

            for(let i=0;i<(segitem.length-2);i+=2){  //移动到每一个标注点
                ctx.lineTo(segitem[i+2],segitem[i+3])   
            }
            //最后移动到原点
            ctx.lineTo(segitem[0],segitem[1])
            //线粗
            ctx.lineWidth = 5
            //闭合路径
            ctx.closePath()
			ctx.stroke()
            //随机上色
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            ctx.fillStyle = 'rgba('+r+','+g+','+b+',0.4)';
            ctx.fill();
        })
    }

    const hideCanvasSeg = function(canvas,img){
        let ctx = canvas.value.getContext('2d')
        ctx.clearRect(0,0,img.height,img.width);
		ctx.drawImage(img,0,0);
    }

    const search = function(value){
        let Imagedatalist = []
        //封装词语请求
        axios.post('http://www.qinsw666.top:5500/search',{
            word:value
        }).then((res)=>{
            if(res.status === 200){  //如果响应正常
                if(res.data.result === 1){ //0:失败/没有对应词 1:成功 
                    let indexarray = res.data.data.index
                    let req = []
                    indexarray.forEach((item)=>{
                        req.push(item['image_id'])
                        let Imagedata = {}
                        Imagedata['image_id'] = item['image_id']
                        Imagedata['caption'] = item['caption'];
                        Imagedatalist.push(Imagedata)
                    })
                    axios.post('http://www.qinsw666.top:5500/solvedata',{
                        imageidarr:req
                    }).then(res =>{
                        let imagesegarr = res.data.segarr
                        imagesegarr.forEach((segitem)=>{
                            Imagedatalist.forEach((imageinfoitem)=>{
                                if(segitem['image_id'] === imageinfoitem['image_id']){
                                    imageinfoitem['instance_index'] = segitem['index']
                                    imageinfoitem['url'] = segitem['url']
                                }
                            })
                        })
                        //传递图片信息列表————包含id、URL、标注区域信息、注释句子
                        emitter.emit('broadcastImagedatalist',Imagedatalist)
                    } )

                }else{
                    alert('没有对应词语的结果！no related result!')
                }
            }else{
                alert('请求好像失败了嗷')
            }


        })
    }

    return {
        search,drawCanvasSeg,hideCanvasSeg
    } 
} 