<template>
    <div class="order-item-container">
        <div class="info">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574676955359&di=378e546f52d96e56af062d624da1ac34&imgtype=0&src=http%3A%2F%2Fpics.lideshu.com%2Fupload%2F3917%2Fadmin%2F20191105%2Fb377b75cac2b7ac3807e597eead345da.jpg" alt="">
            <div>
                <h3>型号</h3>
                <h6>重量：{{weight}}kg</h6>
            </div>
        </div>
        
        <p @click="popupPackVisible=true">
            <mt-cell title="颜色" :value="order.surfaceName" is-link></mt-cell>
        </p>
        <p>
            <mt-cell title="包装" :value="order.packingName" is-link></mt-cell>
        </p>
        <p>
            <mt-cell title="">
            <span>理论米重：<input-number v-model="order.llmz" :min="0" size="small" precision="3"></input-number></span>
            </mt-cell>
        </p>
        <p>
            <mt-cell title="">
            <span>长度：<input-number v-model="order.length" :min="0" size="small" precision="4"></input-number></span>
            </mt-cell>
        </p>
        <p>
            <mt-cell title="">
            <span>数量：<input-number v-model="order.totalQuantity" :min="1" size="small"></input-number></span>
            </mt-cell>
        </p>
        
        
        <div class="footer">
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button id="btn-add-to-shop" type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
        </div>
        

        <mt-popup class="popup-choose" v-model="popupPackVisible" 
        popup-transition="popup-fade" position="right"
        :modal=false closeOnClickModal=false>
             <mt-button @click="chooseClose">关闭</mt-button>
        </mt-popup>
    </div>
</template>

<script>
import { InputNumber } from 'element-ui';
    export default {
        data(){
            return{
                popupPackVisible:false,
                order:{
                    packingName:"纸质12",
                    surfaceName:"隔热料测试",
                    totalQuantity:1,
                    length:6,
                    llmz:0
                }
            }
        },
        methods:{
            chooseClose(){ 
                this.popupPackVisible=false;
            }
        },
        components:{
            InputNumber
        },
        computed:{
            weight(){
                return (this.order.llmz * this.order.length * this.order.totalQuantity).toFixed(3)
            }
        }
    }
</script>

<style lang="scss" scoped>
.order-item-container{
    .info{
        img{
            height: 60px;
            width: 60px;
        }
    } 
    .info{
        display: flex;
    }
    .popup-choose{
        width: 100%;
        height: 150vh; //popup-order 是50vh
    }
    p{
        margin: 0 0
    }
    .footer{
        width: 100%; 
        // background-color: #ddd; 
        position: fixed; 
        bottom: 0;
        display: flex; 
        justify-content: space-between;

        button{
            margin: 3px 3px;
            padding: 0 60px;
        }
    }
}
    
</style>