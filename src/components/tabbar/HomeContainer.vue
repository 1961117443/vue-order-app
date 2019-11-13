<template>
    <div>
        <h1>首页</h1>
        <router-view></router-view>
        <router-link class="mui-tab-item " to="/goodslist">
            <span class="mui-icon mui-icon-home"></span>
            <span class="mui-tab-label">商品列表</span>
        </router-link>
    </div>
</template>

<script>
    import { Button } from 'mint-ui'
    export default {
        components: {
            Button
        }
    }
</script>

<style lang="scss" scoped>
// .mint-swipe{
//     height: 200px;
    
//     .mint-swipe-item{
//         &:nth-child(1){
//             background-color: red;
//         }
//         &:nth-child(2){
//             background-color: blue;
//         }
//     }
// }
</style>