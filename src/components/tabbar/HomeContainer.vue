<template>
    <div class="home-container">
        <mt-search v-model="value" id="test1"></mt-search>
        
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
        },
        data(){
            return {
                value:"",
                popupVisible:false
            }
        }
    }
</script>

<style lang="scss" scoped>
.home-container{
}
</style>