<template>
  <div class="houseItem-page">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <div
        class="home-item"
        v-for="(item, index) in houseArr"
        :key="index"
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
    </van-list>
  </div>
</template>

<script>
import { cityIdAPI, filterHouseAPI } from '@/api/index'

export default {
  props: ['curAreaValue', 'curWayValue', 'curMoneyValue', 'curMoreValue'],
  data() {
    return {
      cityValue: '',
      houseArr: [],
      loading: false,
      finished: false,
      num: 11
    }
  },
  watch: {
    async curAreaValue(val) {
      // console.log(val)
      this.num = 11
      this.houseArr = []
      await this.filterHouse(this.cityValue, 1, 20, val)
    },
    async curWayValue(val) {
      // console.log(val)
      this.num = 11
      this.houseArr = []
      await this.filterHouse(this.cityValue, 1, 20, this.curAreaValue, val)
    },
    async curMoneyValue(val) {
      console.log(val)
      this.num = 11
      this.houseArr = []
      await this.filterHouse(
        this.cityValue,
        1,
        20,
        this.curAreaValue,
        this.curWayValue,
        val
      )
    },
    async curMoreValue(val) {
      console.log(val)
      this.num = 11
      this.houseArr = []
      await this.filterHouse(
        this.cityValue,
        1,
        20,
        this.curAreaValue,
        this.curWayValue,
        this.curMoneyValue,
        val
      )
    }
  },
  methods: {
    // 获取当前城市id的方法
    async getCityId() {
      try {
        const res = await cityIdAPI(this.$store.state.cityName)
        // console.log(res)
        this.cityValue = res.data.body.value
      } catch (err) {
        this.$toast.fail('获取信息失败')
      }
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
    },
    // 筛选房屋的方法
    async filterHouse(cityId, stat, end, area, rentType, price, more) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await filterHouseAPI(
          cityId,
          stat,
          end,
          area,
          rentType,
          price,
          more
        )
        // console.log(res)
        if (res.data.body.list.length === 0) {
          return (this.finished = true)
        }
        this.houseArr.push(...res.data.body.list)
        this.loading = false
        this.$toast.success('获取信息成功')
      } catch (error) {
        this.$toast.fail('获取房源失败')
      }
    },
    // 加载更多数据
    async onLoad() {
      this.num += 10
      await this.filterHouse(
        this.cityValue,
        this.num,
        this.num + 9,
        this.curAreaValue,
        this.curWayValue,
        this.curMoneyValue,
        this.curMoreValue
      )
    }
  },
  async created() {
    // 获取请求列表
    await this.getCityId()
    await this.filterHouse(this.cityValue, 1, 20)
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
.houseItem-page {
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
