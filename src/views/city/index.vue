<template>
  <div class="city-page">
    <!-- 顶部标题 -->
    <van-nav-bar
      title="城市列表"
      left-arrow
      @click-left="clickLeftFn"
      :fixed="true"
    />
    <van-index-bar
      :index-list="indexList"
      highlight-color="#fff"
      :sticky="false"
    >
      <div v-for="(arr, key) in xxobj" :key="key">
        <van-index-anchor :index="key">{{ key }}</van-index-anchor>
        <van-cell
          :title="item"
          v-for="(item, index) in arr"
          :key="index"
          @click="pass(item)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { getCityAPI, hotCityAPI } from '@/api/index'
export default {
  async created() {
    try {
      const res = await getCityAPI({
        level: 1
      })
      const res2 = await hotCityAPI()
      // console.log(res)
      // console.log(res2)
      this.cityList = res.data.body
      const hotList = res2.data.body
      // 遍历城市数据并进行分组
      this.cityList.forEach((item) => {
        const key = item.short.substr(0, 1).toUpperCase()
        if (key in this.firList) {
          this.firList[key].push(item.label)
        } else {
          this.firList[key] = []
          this.firList[key].push(item.label)
        }
      })
      // 所在城市
      this.firList['#'] = []
      this.firList['#'].push(this.cityList[0].label)
      // 热门城市
      this.firList['热'] = []
      hotList.forEach((item) => {
        this.firList['热'].push(item.label)
      })
      // console.log(this.firList)
      this.xxobj = this.firList
    } catch (err) {
      // console.log(err)
      this.$toast.fail('获取城市列表失败，请重试')
    }
  },
  data() {
    return {
      // 最后要循环的对象
      xxobj: {},
      // 城市列表
      cityList: [],
      // 首字母
      firList: {
        '#': [],
        热: [],
        A: [],
        B: [],
        C: [],
        D: [],
        F: [],
        G: [],
        H: [],
        J: [],
        K: [],
        L: [],
        M: [],
        N: [],
        Q: [],
        S: [],
        T: [],
        W: [],
        X: [],
        Y: [],
        Z: []
      },
      // 右边索引号
      indexList: [
        '#',
        '热',
        'A',
        'B',
        'C',
        'D',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'M',
        'N',
        'Q',
        'S',
        'T',
        'W',
        'X',
        'Y',
        'Z'
      ]
    }
  },
  methods: {
    clickLeftFn() {
      this.$router.back()
    },
    pass(name) {
      // console.log(name)
      this.$store.commit('setCityName', name)
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.city-page {
  padding-top: 1.22667rem;
  .van-nav-bar {
    z-index: 10;
    background-color: #21b97a;
    /deep/ .van-nav-bar__title {
      color: #fff;
      font-size: 18px;
    }
    /deep/ .van-icon {
      color: #fff;
    }
  }
  // 列表
  /deep/ .van-index-anchor {
    font-size: 14px;
    padding: 10px 15px;
    color: #999;
  }
  .van-cell {
    width: 100%;
    height: 50px;
    padding: 0 15px;
    line-height: 50px;
    border-bottom: 1px solid #eee;
    font-size: 16px;
    color: #333;
    background: #fff;
    cursor: pointer;
  }
  /deep/ .van-index-bar__sidebar {
    padding-top: 20px;
    .van-index-bar__index {
      padding: 0;
      height: 20px;
      width: 20px;
      line-height: 20px;
      font-size: 14px;
      border-radius: 50%;
      margin: 4px 5px;
    }
    .van-index-bar__index--active {
      background-color: #21b97a;
    }
  }
}
</style>
