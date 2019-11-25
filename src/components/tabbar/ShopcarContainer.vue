<template>
  <div class="shopcar-container">
    <!-- 商品列表区域 -->
    <div class="goods-list" v-for="(item,i) in goodslist" :key="item.id">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="item.selected"></mt-switch>
            <img src="http://pzm01awax.bkt.clouddn.com/03c073bab204483895d8aa7000ecd937" alt="">
            <div class="info">
                <h1>型号{{item.id}}</h1>
                <p>
                    <span class="price">￥{{item.price}}</span>
                    <input-number size="mini" v-model="item.count" :min="1"></input-number>
                    <a href="#" @click="remove(item.id,i)">删除</a>
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
            <mt-switch @change="onSelected" v-model="isCarSelectedAll"></mt-switch>
            <div class="left">
              <p>总计（不含运费）</p>
              <p>已选型号 <span class="red">{{ getCarSelected.count }}</span> 种，总共 
              <span class="red">{{getCarSelected.quantity}}</span> 支 </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { InputNumber,Switch } from 'element-ui';
import { mapGetters } from 'vuex'
export default {
    data(){
        return { 
          selectedAll:false,
          goodslist: []
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        onSelected(){
         // this.$store.commit('order/selectedAll',{selected: this.selectedAll})
        },
        //获取购物车里面所有的商品
        getGoodsList(){
            //console.log("getGoodsList")
            this.goodslist=this.$store.state.order.car
        },
        //购物车删除商品
        remove(id,index){
          this.goodslist.splice(index, 1)
          this.$store.commit('order/removeFromCar',{id})
        }
    },
    computed:{
      ...mapGetters({
        getCarSelected:'getCarCountAndQuantity'
      }),
      isCarSelectedAll:{
        get(){
          return this.$store.getters.IsCarSelectedAll
        },
        set(newVal){
          console.log(newVal)
          this.$store.commit('order/selectedAll',{selected:newVal})
        }
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
    .jiesuan{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .red{
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
    }
}
</style>