<template>
    <router-link class="goods-item" :to="'/home/goodsinfo/'+goods.id" tag="div">
        <img :src="goods.src" alt="">
        <h1 class="title">({{ goods.id }}){{ goods.title }}</h1>
        <div class="info">
            <p class="price">
                <span class="now">￥{{ goods.sell_price }}</span>
                <span class="old">￥{{ goods.market_price }}</span>
            </p>
            <p class="sell">
                <span>热卖中</span>
                <span>剩{{ goods.stock_quantity }}件</span>
            </p>
        </div>
    </router-link>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        props:{
            goods:{
                type:Object,
                default:function(){
                   return { id: 1,src:"",title:"",stock_quantity:0,sell_price:0,market_price:0 }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goods-item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 115px;
        img{
            width: 100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #eee;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 8px;
            }
        }
    }
</style>