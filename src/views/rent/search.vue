<template>
  <div>
    <!-- 搜索框部分 -->
    <form action="/">
      <van-search
        class="search"
        v-model="searchIptVal"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="onCancel"
        @focus="fn"
        @blur="fn2"
        @input="iptgetAdvise"
      />
    </form>
    <!-- 搜索提示列表 -->
    <div class="tips" v-if="adviceShow">
      <van-cell
        v-for="(item, index) in communityName"
        :key="index"
        :title="item.communityName"
        @click="goAdd(item.community, item.communityName)"
      />
    </div>
  </div>
</template>

<script>
import { cityIdAPI, communityAPI } from '@/api/index'
export default {
  computed: {
    adviceShow() {
      // 里面没值就不显示
      if (this.searchIptVal.trim() === '') {
        return false
      }
      return true
    }
  },
  created() {
    this.getCityId()
  },
  data() {
    return {
      searchIptVal: '',
      cityValue: '',
      communityName: ''
    }
  },
  methods: {
    // 获取当前城市id
    async getCityId() {
      try {
        const res = await cityIdAPI(this.$store.state.cityName)
        // console.log(res)
        this.cityValue = res.data.body.value
      } catch (err) {
        this.$toast.fail('获取信息失败')
      }
    },
    // 获取建议的方法
    async getAdvise() {
      try {
        const res = await communityAPI({
          name: this.searchIptVal,
          id: this.cityValue
        })
        // console.log(res)
        this.communityName = res.data.body
        this.$toast.clear()
      } catch (error) {
        this.$toast.fail('获取数据失败')
      }
    },
    // 输入时获取搜索建议
    iptgetAdvise() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      this.getAdvise()
    },
    onCancel() {
      this.$router.back()
    },
    // 回到原页面
    goAdd(code, name) {
      this.$router.push({
        name: 'rentadd',
        params: {
          communityName: name,
          community: code
        }
      })
    },
    // 会移动的输入框效果
    fn() {
      const cell = document.querySelector('.van-cell')

      cell.style.paddingLeft = '0px'
    },
    fn2() {
      const cell = document.querySelector('.van-cell')
      cell.style.paddingLeft = '80px'
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .van-cell {
    padding-left: 80px;
    transition: all 0.2s;
  }
}
</style>
