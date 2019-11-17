<template>
  <div id="app" class="app-container">
    <router-view></router-view>
    <!--底部 Tabbar 区域-->
    <nav class="mui-bar mui-bar-tab"> 
			<router-link class="mui-tab-item-abc" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-abc" to="/cateory">
				<span class="mui-icon mui-icon-extra mui-icon-extra-class"></span>
				<span class="mui-tab-label">分类</span>
			</router-link>
			<router-link class="mui-tab-item-abc" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          		<span class="mui-badge" id="shop-car-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-abc" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">我的</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
/* .main-app-container1{
	padding-bottom: 40px;
	overflow-x: hidden;
} */
* { touch-action: none; }
    .mui-bar-tab .mui-tab-item-abc.mui-active {
    	color: #007aff;
	}
	.mui-bar-tab .mui-tab-item-abc {
		display: table-cell;
		overflow: hidden;
		width: 1%;
		height: 50px;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #929292;
	}
	.mui-bar-tab .mui-tab-item-abc .mui-icon {
		top: 3px;
		width: 24px;
		height: 24px;
		padding-top: 0;
		padding-bottom: 0;
	}
	.mui-bar-tab .mui-tab-item-abc .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
