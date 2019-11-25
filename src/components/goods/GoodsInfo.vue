<template>
  <div class="goodsinfo-container">
       <transition
        @before-enter="beforeEnter"
        @enter = "enter"
        @after-enter="afterEnter"
      >
          <div class="ball" v-show="ballFlag" ref="ball"></div>
      </transition>
    <!-- 商品轮播区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <swiper :lunbotuList="lunbotuList" :isFull=false></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品标题</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner"> 
            <p class="price">
                市场价：<del>￥2399</del>&nbsp;&nbsp;销售价：<span class="now_price">￥2199</span>
            </p>
            <p>购买数量：<input-number v-model="order.quantity" :min="1" label="数量：" size="small"></input-number><p/>
            <p>
                <mt-button type="primary" size="small">立即购买</mt-button>
                <mt-button id="btn-add-to-shop" type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            </p> 
        </div>
      </div>
    </div>
    <!-- 商品购买区域2 -->
    <div class="mui-card">
      <div class="mui-card-header">商品标题</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner order-info">
            <div class="order">
                <div class="title">
                    <mt-cell title="已选"></mt-cell>
                </div>
                <div @click="popupVisible=true" class="choose">
                    <mt-cell title="" is-link></mt-cell>
                </div> 
            </div> 
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
        <div class="mui-card-header">商品参数</div>
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <p>商品货号：</p>
                <p>库存情况：</p>
                <p>上架时间：</p>
            </div>
        </div>
        <div class="mui-card-footer">
            <mt-button type="primary" size="large" plain>图文介绍</mt-button>
            <mt-button type="danger" size="large" plain>商品评论</mt-button>
        </div>
    </div>

    <mt-popup class="popup-order" v-model="popupVisible" popup-transition="popup-fade" position="bottom" modal="true">
        <order-item></order-item>    
    </mt-popup>
  </div>
</template>

<script>
import Swiper from '@/components/Swiper/index.vue'
import OrderItem from '@/components/goods/OrderItem.vue'
import { InputNumber } from 'element-ui';
export default {
    components:{
       Swiper,
       InputNumber,
       OrderItem
    },
    data(){
        return{
            id:this.$route.params.id,
            lunbotuList:[],
            ballFlag:false,
            popupVisible:false,
            order:{
                quantity:1
            }
        }
    },
    created(){
        this.getLunbotu()
    },
    methods:{
        getLunbotu(){
            this.lunbotuList.push({url:1,img:"http://pzm01awax.bkt.clouddn.com/000e180582054df2bacaaa9500c326db"})
            this.lunbotuList.push({url:2,img:"http://pzm01awax.bkt.clouddn.com/03c073bab204483895d8aa7000ecd937"})
        },
        showPopup(){
            console.log("showPopup")
        },
        addToShopCar(){
            //添加购物车
            this.ballFlag = !this.ballFlag
            let goodsinfo = {id:this.id,count:this.order.quantity,price:1000,selected:true}
            this.$store.commit('order/addToCar',goodsinfo)
        },
        beforeEnter(el){
            //获取按钮的位置
        //    const ballPosition = document.getElementById('btn-add-to-shop').getBoundingClientRect();
        //     console.log(ballPosition)
        // //   // console.log(el.style)
        //      el.style.transform=`translate(${ballPosition.left}px,${ballPosition.top}px)`
           el.style.transform = "translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;
            //小球在页面中的位置
           const ballPosition = this.$refs.ball.getBoundingClientRect();
           
            //购物车徽标的位置
            const badgePosition = document.getElementById('shop-car-badge').getBoundingClientRect();
            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            // console.log(`x${xDist}-y${yDist}`);

            el.style.transform=`translate(${xDist}px,${yDist}px)`
            el.style.transition="all 1s cubic-bezier(.4,-0.3,1,.68)";
            // el.style.transition="all 2s cubic-bezier(.4,-0.3,1,.68)";
            done()
        },
        afterEnter(el){
           this.ballFlag =!this.ballFlag
        }
    }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;

    .now_price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    p{
        button{
            margin: 0 3px;
        }
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 10px 0;
        }
    }

    .ball{
        height: 18px;
        width: 18px;
        border-radius: 50%;
        background-color: red;
        position: absolute ;
        z-index: 99;
        top: 100px;
        left: 150px;
    }

    .order-info{
        padding: 0;
        .order{
            font-size: 16px; 
                display: flex;
            .title{
                font-weight: bold; 
                width: 80px;
            }
            .choose{
                width: 100%;
            }
        }
    }
    
    .popup-order{
        width: 100%;
        height: 50vh;
    }
}
</style>