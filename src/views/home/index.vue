<template>
  <div class="home-page">
    <!--  轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swiprArr" :key="item.id">
        <img :src="'http://liufusong.top:8080' + item.imgSrc" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 搜索框 -->
    <div class="search-box">
      <van-search
        v-model="searchIpt"
        input-align="left"
        placeholder="  请输入小区或地址"
        background="rgba(0,0,0,0)"
      >
        <template #left-icon>
          <div class="leftbox" @click="goCity">
            <span>{{$store.state.cityName}}</span> <van-icon name="arrow-down" />
          </div>
        </template>
      </van-search>
      <div class="icon-map">
        <van-icon name="aim" />
      </div>
    </div>
    <!-- 宫格 -->
    <van-grid class="home-grid" :border="false">
      <van-grid-item text="整租">
        <template #icon>
          <img :src="srcs[0]" alt="" class="grid-img" />
        </template>
      </van-grid-item>
      <van-grid-item text="合租">
        <template #icon>
          <img :src="srcs[1]" alt="" class="grid-img" />
        </template>
      </van-grid-item>
      <van-grid-item text="地图找房">
        <template #icon>
          <img :src="srcs[2]" alt="" class="grid-img" />
        </template>
      </van-grid-item>
      <van-grid-item text="去出租" @click="goAdd">
        <template #icon>
          <img :src="srcs[3]" alt="" class="grid-img" />
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 租房小组 更多 -->
    <van-cell title="租房" value="更多" class="zf-title" />
    <div class="zf">
      <div class="zf-box">
        <img src="http://115.159.87.220:8080/img/groups/1.png" alt="图片" />
        <div class="text">
          <p>家住回龙观</p>
          <p>家住回龙观</p>
        </div>
      </div>
      <div class="zf-box">
        <img src="http://115.159.87.220:8080/img/groups/1.png" alt="图片" />
        <div class="text">
          <p>家住回龙观</p>
          <p>家住回龙观</p>
        </div>
      </div>
      <div class="zf-box">
        <img src="http://115.159.87.220:8080/img/groups/1.png" alt="图片" />
        <div class="text">
          <p>家住回龙观</p>
          <p>家住回龙观</p>
        </div>
      </div>
      <div class="zf-box">
        <img src="http://115.159.87.220:8080/img/groups/1.png" alt="图片" />
        <div class="text">
          <p>家住回龙观</p>
          <p>家住回龙观</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swipeAPI } from '@/api/index'
import { src1, src2, src3, src4 } from '@/assets/image/home'
export default {
  data() {
    return {
      swiprArr: [],
      searchIpt: '',
      srcs: [src1, src2, src3, src4]
    }
  },
  // 获取首页轮播图数据
  async created() {
    try {
      const res = await swipeAPI()
      // console.log(res)
      this.swiprArr = res.data.body
    } catch (err) {
      // console.log(err)
      this.$toast.fail('获取数据失败，请重试')
    }
  },
  methods: {
    goAdd() {
      this.$router.push('/rent/add')
    },
    goCity() {
      this.$router.push('/city')
    }
  }
}
</script>

<style lang="less" scoped>
.home-page {
  // 轮播图样式
  .my-swipe .van-swipe-item {
    width: 100%;
    height: 212px;
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
    img {
      width: 100%;
    }
  }
  .search-box {
    display: flex;
    position: absolute;
    top: 25px;
    padding: 0 10px;
    z-index: 2;
    .search {
      flex: 1;
      height: 34px;
      margin: 0 10px;
      padding: 5px 5px 5px 8px;
      border-radius: 3px;
      background-color: #fff;
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
      padding-top: 13px;
      color: #fff !important;
    }
    /deep/ .van-search {
      width: 330px;
    }
    /deep/ .van-field__control {
      border-left: 1px solid #ccc;
    }
    // 宫格
    /deep/.van-grid-item {
      width: 88px;
      height: 121px;
    }
  }
  .grid-img {
    width: 60px;
  }
  // 租房小组
  .zf-title {
    background-color: rgb(205, 205, 205);
  }
  .zf {
    background-color: #ccc;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: 120px;
    .zf-box {
      border-radius: 5px;
      display: flex;
      // background-color: pink !important;
      margin-bottom: 10px;
      text-align: center;
      width: 172px;
      height: 50px;
      background-color: #fff;
      img {
        font-size: 12px;
        margin: 0 10px;
        width: 50px;
        height: 50px;
      }
      p {
        padding-top: 3px;
        margin: 0;
        font-size: 14px;
      }
    }
  }
}
</style>
