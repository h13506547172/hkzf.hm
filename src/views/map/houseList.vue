<template>
  <div class="house-list">
    <div class="title">
      <h3>房屋列表</h3>
      <a href="javascript:;">更多房源</a>
    </div>
    <div
      class="home-item"
      v-for="item in houseArr"
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
import { homeDelAPI } from '@/api/map'
export default {
  props: ['houseID'],
  data() {
    return {
      houseArr: []
    }
  },
  methods: {
    async getHouseInfo() {
      const res = await homeDelAPI(this.houseID)
      this.houseArr = res.data.body.list
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
    await this.getHouseInfo()
  }
}
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
.house-list {
  .title {
    position: relative;
    width: 100%;
    background: #c0c0c2;
    border-top: 1px solid #c8c8c8;
  }
  // 列表项
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
