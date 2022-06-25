<template>
  <div class = 'search'>
    <div class = 'search-info'>
        <div class = "slogen">Pictures Make the Word Alive</div>
        <div class = 'input-box'>
            <input placeholder="请输入汉语词" v-model= "inputword"/>
            <button @click = "ifsearch">🔍</button>
        </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import useSearch from '../hooks/useSearch'

export default {
    name:'Search',
    setup(){
        let inputword = ref('')
        const { search }  = useSearch()

        function ifsearch(){
            if(inputword.value == ''){
                alert("请输入词语")
            }else{
                search(inputword.value)
            }
        }

        return {
            inputword,ifsearch
        }
    }
}
</script>

<style>
.search{
    width:100%;
    background-image: url('../assets/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
}

.search-info{
    padding-top:30px ;
    background-color: rgba(0,0,0,0.5);
    color:white;
    font-size:30px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.slogen{
    margin-top:30px;
}

.input-box{
    margin:30px 0 30px 0;
    width:300px;
    height: 50px;
    border-radius:10px;
    display:flex;
    flex-direction: row;
    
}

.input-box input{
    width:250px;
    border:none;
    outline: none;
    border-radius:10px 0 0 10px;
    background-color: aliceblue;
    font-size: 18px;
    padding-left: 10px;
}

.input-box button{
    border:none;
    outline: none;
    width:50px;
    font-size:20px;
    background-color: rgb(149, 149, 149);
    border-radius:0 10px 10px 0;
    cursor: pointer;
}

.input-box button:hover{
    background-color: rgb(175, 175, 175);

}
</style>