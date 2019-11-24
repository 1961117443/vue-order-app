<template>
  <div class="shopcar-container">
    <!-- 商品列表区域 -->
    <div class="goods-list" v-for="item in goodslist" :key="item.id">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch></mt-switch>
            <img src="http://pzm01awax.bkt.clouddn.com/03c073bab204483895d8aa7000ecd937" alt="">
            <div class="info">
                <h1>型号{{item.id}}</h1>
                <p>
                    <span class="price">￥{{item.price}}</span>
                    <input-number size="mini" v-model="item.count"></input-number>
                    <a href="#">删除</a>
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { InputNumber,Switch } from 'element-ui';
export default {
    data(){
        return { 
            goodslist: []
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        //获取购物车里面所有的商品
        getGoodsList(){
            console.log("getGoodsList")
            this.goodslist=this.$store.state.order.car
        }
    },
    components: {
        InputNumber,
        'el-switch':Switch 
    }
};
</script>

<style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
    .goods-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
            width: 60px;
            height: 60px;
        }
        h1{
            font-size: 13px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .price{
                color: red;
                font-weight: bold;
            }
        }
    }
}
</style>