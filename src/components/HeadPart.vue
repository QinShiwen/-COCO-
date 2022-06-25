<template>
    <div class="headpart">
        <div class = "title">
            图解汉语词平台
        </div>    
        <div class = "bar-info">
            <span @click = "toVisualize">可视化</span>
            <span @click = "toHome">home</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'HeadPart',
    setup(){
        function toVisualize(){
            window.open("http://www.qinsw666.top/picforword/visualize/visualize.html")
        }

        function toHome(){
            location.reload() 
            //window.location.href = "http://www.qinsw666.top/picforword/picforword.html"
        }
        return{
            toVisualize,toHome
        }
    }
}
</script>

<style>
.headpart{
    width:100%;
    height: 50px;
    background-color: #000000;
    display:flex;
    flex-direction: row;
    align-items: center;
}

.title{
    color:white;
    flex:0.5;
    margin-left:20px;
    font-size:25px;
    font-family: '宋体';
}

.bar-info{
    flex:0.5;
    display:flex;
    flex-direction: row-reverse;
} 

.bar-info span{
    cursor: pointer;
    color:white;
    padding:5px;
    border-right:1px solid white;
}

.bar-info span:first-child{
    border:none;
    margin-right: 30px;
}

.bar-info span:hover{
    color:rgb(139, 228, 255);
}
</style>