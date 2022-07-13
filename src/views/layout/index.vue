<template>
  <div class="layout-page">
    <!-- 挂载的路由点 -->
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="#21b97a">
      <van-tabbar-item replace to="/">
        <template #icon>
          <i class="iconfont icon-shouye"></i>
        </template>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/zf">
        <template #icon>
          <i class="iconfont icon-sousuo"></i>
        </template>
        <span>找房</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/info">
        <template #icon>
          <i class="iconfont icon-yuedu"></i>
        </template>
        <span>资讯</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/my">
        <template #icon>
          <i class="iconfont icon-wode"></i>
        </template>
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: this.$route.meta.active
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 22px;
}
</style>
