<template>
    <div class="goods-list">
       <goods-item :goods="item" v-for="item in goodsList" :key="item.id" ></goods-item>
    </div>
</template>

<script>
    import GoodsItem from '@/components/goods/GoodsItem.vue';
    export default {
        components: {
            GoodsItem
        },
        data(){
            return{
                goodsList:[
                    { id: 1,src:"http://pzm01awax.bkt.clouddn.com/000e180582054df2bacaaa9500c326db",title:"型号A01",stock_quantity:60,sell_price:2199,market_price:2499 },
                    { id: 2,src:"http://pzm01awax.bkt.clouddn.com/000e180582054df2bacaaa9500c326db",title:"型号A02",stock_quantity:60,sell_price:2199,market_price:2499 },
                    { id: 3,src:"http://pzm01awax.bkt.clouddn.com/000e180582054df2bacaaa9500c326db",title:"型号A03",stock_quantity:60,sell_price:2199,market_price:2499 },
                    { id: 4,src:"http://pzm01awax.bkt.clouddn.com/000e180582054df2bacaaa9500c326db",title:"型号A04",stock_quantity:60,sell_price:2199,market_price:2499 },
                    { id: 5,src:"http://pzm01awax.bkt.clouddn.com/000e180582054df2bacaaa9500c326db",title:"型号A05",stock_quantity:60,sell_price:2199,market_price:2499 },
                    { id: 6,src:"http://pzm01awax.bkt.clouddn.com/000e180582054df2bacaaa9500c326db",title:"型号A06",stock_quantity:60,sell_price:2199,market_price:2499 },
                    { id: 7,src:"http://pzm01awax.bkt.clouddn.com/000e180582054df2bacaaa9500c326db",title:"型号A07",stock_quantity:60,sell_price:2199,market_price:2499 },
                    { id: 8,src:"http://pzm01awax.bkt.clouddn.com/000e180582054df2bacaaa9500c326db",title:"型号A08",stock_quantity:60,sell_price:2199,market_price:2499 },
                    { id: 9,src:"http://pzm01awax.bkt.clouddn.com/000e180582054df2bacaaa9500c326db",title:"型号A09",stock_quantity:60,sell_price:2199,market_price:2499 },
                ]
            }
        },
        methods:{

        }
    }
</script>

<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
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
                font-size: 5px;
            }
        }
    }
}
</style>