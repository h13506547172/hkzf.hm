<template>
  <div class="zf-page">
    <!-- 顶部标题 -->
    <van-nav-bar left-arrow @click-left="clickLeftFn">
      <template #title>
        <!-- 搜索框 -->
        <div class="search-box">
          <van-search
            input-align="left"
            placeholder="  请输入小区或地址"
            background="rgba(0,0,0,0)"
            class="search"
          >
            <template #left-icon>
              <div class="leftbox" @click="goCity">
                <span>{{ $store.state.cityName }}</span>
                <van-icon name="arrow-down" />
              </div>
            </template>
          </van-search>
          <div class="icon-map">
            <van-icon name="aim" />
          </div>
        </div>
      </template>
    </van-nav-bar>
    <!-- 筛选标签 -->
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    goCity() {
      this.$router.push('/city')
    },
    clickLeftFn() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.zf-page {
  .van-nav-bar {
    background-color: #21b97a;
    /deep/ .van-nav-bar__title {
      color: #fff;
      font-size: 18px;
    }
    /deep/ .van-icon {
      color: #7f7f80;
    }
    /deep/ .van-nav-bar__left {
      padding-left: 5px;
    }
    /deep/ .van-nav-bar__arrow {
      color: #fff;
    }
  }
  .search-box {
    display: flex;
    position: absolute;
    top: 5px;
    left: 20px;
    padding: 0 10px;
    z-index: 2;
    /deep/ .van-search {
      width: 300px !important;
    }
    .search {
      flex: 1;
      height: 34px;
      padding: 5px 5px 5px 8px;
      border-radius: 3px;
      background-color: #21b97a;
      .icon-map {
        font-size: 25px;
        color: #fff;
      }
    }
    /deep/ .van-field__left-icon {
      width: 40px;
      .leftbox {
        display: flex;
        font-size: 12px;
      }
    }
    // 细节微调
    /deep/ .van-icon-aim::before {
      padding-top: 8px;
      padding-left: 8px;
      color: #fff !important;
    }
    /deep/ .van-field__control {
      border-left: 1px solid #ccc;
    }
  }
}
</style>
