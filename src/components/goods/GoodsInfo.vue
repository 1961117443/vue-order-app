<template>
  <div class="goodsinfo-container">
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
                市场价:<del>￥2399</del>&nbsp;&nbsp;销售价:<span class="now_price">2199</span>
            </p>
            <p>购买数量:<number></number><p/>
            <p>
                <mt-button type="primary" size="small">立即购买</mt-button>
                <mt-button type="danger" size="small">加入购物车</mt-button>
            </p>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
        <div class="mui-card-header">页眉</div>
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）
            </div>
        </div>
        <div class="mui-card-footer">页脚</div>
    </div>
  </div>
</template>

<script>
import Swiper from '@/components/Swiper/index.vue'
import Number from '@/components/FormComponents/number.vue'
// import { Swipe, SwipeItem } from 'mint-ui';
export default {
    components:{
       Swiper,
       Number
        // Swipe,
        // SwipeItem
    },
    data(){
        return{
            id:this.$route.params.id,
            lunbotuList:[]
        }
    },
    created(){
        this.getLunbotu()
    },
    methods:{
        getLunbotu(){
            this.lunbotuList.push({url:1,img:"http://pzm01awax.bkt.clouddn.com/000e180582054df2bacaaa9500c326db"})
            this.lunbotuList.push({url:2,img:"http://pzm01awax.bkt.clouddn.com/03c073bab204483895d8aa7000ecd937"})
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
}
</style>