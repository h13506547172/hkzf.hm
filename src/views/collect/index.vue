<template>
  <div class="collect-page">
    <!-- 顶部标题 -->
    <van-nav-bar title="我的收藏" left-arrow @click-left="clickLeftFn" />
    <div
      class="home-item"
      v-for="item in collectArr"
      :key="item.houseCode"
      :id="item.houseCode"
      @click="goDetail(item.houseCode)"
    >
      <div class="pic">
        <img :src="'http://liufusong.top:8080' + item.houseImg" alt="" />
      </div>
      <div class="text">
        <h3 class="mu">{{ item.title }}</h3>
        <p class="mu">{{ item.desc }}</p>
        <van-tag
          type="success"
          v-for="(str, index) in item.tags"
          :key="index"
          >{{ str }}</van-tag
        >
        <div class="mu money">
          <span>{{ item.price }}</span>
          元/月
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collectAPI } from '@/api/index'
export default {
  data() {
    return {
      collectArr: []
    }
  },
  methods: {
    clickLeftFn() {
      this.$router.back()
    },
    // 跳转到详请页面并传值
    goDetail(homeCode) {
      // console.log(homeCode)
      this.$router.push({
        path: '/detail',
        query: {
          homeCode
        }
      })
    }
  },
  async created() {
    // 加载动画
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    try {
      const res = await collectAPI()
      // console.log(res)
      this.collectArr = res.data.body
      this.$toast.clear()
    } catch (err) {
      // console.log(err)
      this.$toast.clear()
      this.$toast.fail('获取数据失败，请重试')
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
}
.mu {
  width: 200px;
  // 单行文本省略
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
.collect-page {
  .van-nav-bar {
    background-color: #21b97a;
    /deep/ .van-nav-bar__title {
      color: #fff;
      font-size: 18px;
    }
    /deep/ .van-icon {
      color: #fff;
    }
  }
  // 收藏项
  .home-item {
    display: flex;
    height: 120px;
    position: relative;
    box-sizing: border-box;
    padding-top: 18px;
    border-bottom: 1px solid #e5e5e5;
    .pic {
      width: 106px;
      height: 80px;
      img {
        width: 106px;
        height: 80px;
      }
    }
    .text {
      padding-left: 12px;
      h3 {
        font-size: 15px;
        color: #394043;
      }
      p {
        font-size: 12px;
        color: #afb2b3;
      }
      .money {
        font-size: 12px;
        color: #fa5741;
        span {
          font-size: 16px;
          font-weight: bolder;
        }
      }
    }
  }
}
</style>
