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
    <van-dropdown-menu
      :class="{
        currentMenu1: curAreaValueArr,
        currentMenu2: curWayValue !== '',
        currentMenu3: curMoneyValue,
        currentMenu4: curMoreValue
      }"
      active-color="#21b97a"
    >
      <!-- 区域地铁 -->
      <van-dropdown-item title="区域" ref="areaAndSub">
        <template #default>
          <van-area
            title=""
            confirm-button-text=" "
            cancel-button-text=" "
            :area-list="areaList1"
            @confirm="confirmAreaFn"
            id="area"
          />
          <div>
            <van-button
              type="default"
              style="width: 40%"
              @click="$refs.areaAndSub.toggle(false)"
              >取消</van-button
            >
            <van-button type="primary" style="width: 60%" @click="fnxxx"
              >确认</van-button
            >
          </div>
        </template>
      </van-dropdown-item>
      <!-- 方式 -->
      <van-dropdown-item title="方式" ref="way">
        <template #default>
          <van-area
            title=""
            confirm-button-text=" "
            cancel-button-text=" "
            :columns-num="1"
            :area-list="areaList2"
            @confirm="confirmWayFn"
            id="way"
          />
          <div>
            <van-button
              type="default"
              style="width: 40%"
              @click="$refs.way.toggle(false)"
              >取消</van-button
            >
            <van-button type="primary" style="width: 60%" @click="fnxxx1"
              >确认</van-button
            >
          </div>
        </template>
      </van-dropdown-item>
      <!-- 租金 -->
      <van-dropdown-item title="租金" ref="money">
        <template #default>
          <van-area
            title=""
            confirm-button-text=" "
            cancel-button-text=" "
            :columns-num="1"
            :area-list="areaList3"
            @confirm="confirmMoneyFn"
            id="money"
          />
          <div>
            <van-button
              type="default"
              style="width: 40%"
              @click="$refs.money.toggle(false)"
              >取消</van-button
            >
            <van-button type="primary" style="width: 60%" @click="fnxxx2"
              >确认</van-button
            >
          </div>
        </template>
      </van-dropdown-item>
      <!-- 筛选 -->
      <van-dropdown-item title="筛选" @open="showFn"> </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 右边弹出筛选 -->
    <van-popup
      duration="0"
      v-model="filterShow"
      position="right"
      :style="{ height: '100%', width: '70%' }"
      class="FilterMore"
    >
      <div class="title">户型</div>
      <div class="box">
        <div
          class="tag"
          v-for="item in condition.roomType"
          :key="item.value"
          :class="{
            current: curNameArr.some((ite) => ite === item.label)
          }"
          @click="addCondition(item)"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="title">朝向</div>
      <div class="box">
        <div
          class="tag"
          v-for="item in condition.oriented"
          :key="item.value"
          :class="{
            current: curNameArr.some((ite) => ite === item.label)
          }"
          @click="addCondition(item)"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="title">楼层</div>
      <div class="box">
        <div
          class="tag"
          v-for="item in condition.floor"
          :key="item.value"
          :class="{
            current: curNameArr.some((ite) => ite === item.label)
          }"
          @click="addCondition(item)"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="title">房屋亮点</div>
      <div class="box">
        <div
          class="tag"
          v-for="item in condition.characteristic"
          :key="item.value"
          :class="{
            current: curNameArr.some((ite) => ite === item.label)
          }"
          @click="addCondition(item)"
        >
          {{ item.label }}
        </div>
      </div>
    </van-popup>
    <!-- 按钮 -->
    <div class="btn-box" v-show="filterShow">
      <van-button type="default" style="width: 40%">取消</van-button>
      <van-button type="primary" style="width: 60%" @click="moreFilter"
        >确认</van-button
      >
    </div>
    <!-- 列表 -->
    <houseItem
      ref="houseList"
      :curAreaValue="curAreaValueArr"
      :curWayValue="curWayValue"
      :curMoneyValue="curMoneyValue"
      :curMoreValue="curMoreValue"
    ></houseItem>
  </div>
</template>

<script>
import { cityIdAPI, filtrateAPI } from '@/api/index'
import houseItem from './houseItem.vue'
export default {
  components: {
    houseItem
  },
  data() {
    return {
      // house列表
      houseArr: [],
      // 城市id
      cityValue: '',
      // 所有查询条件
      condition: {},
      // 弹出层
      filterShow: true,
      // 区域和地铁
      areaList1: {
        province_list: {
          110000: '区域',
          120000: '地铁'
        },
        city_list: {
          110100: ''
        },
        county_list: {
          110101: '',
          110102: ''
        }
      },
      // 方式
      areaList2: {
        province_list: {}
      },
      // 租金
      areaList3: {
        province_list: {}
      },
      // 右边弹出层选中的数组
      curNameArr: [],
      curValueArr: [],
      // 选中的area或地铁的值
      curAreaValueArr: '',
      // 选中方式的值
      curWayValue: '',
      // 选中租金的值
      curMoneyValue: '',
      curMoreValue: ''
    }
  },
  methods: {
    // 筛选按钮
    showFn() {
      console.log(11)
      this.filterShow = true
    },
    // 点击筛选中的项添加筛选条件
    addCondition(obj) {
      // 如果存在数组中就删除
      const rem = this.curNameArr.some((item) => item === obj.label)
      if (rem) {
        return (this.curNameArr = this.curNameArr.filter(
          (item) => item !== obj.label
        ))
      }
      this.curNameArr.push(obj.label)
      this.curValueArr.push(obj.value)
    },
    goCity() {
      this.$router.push('/city')
    },
    clickLeftFn() {
      this.$router.back()
    },
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
    // 获取筛选条件
    async getFiltrate() {
      try {
        const res = await filtrateAPI(this.cityValue)
        const { data } = res
        this.condition = data.body
        // console.log(this.condition)
        // 方式
        this.areaList2.province_list['110000'] =
          this.condition.rentType[0].label
        this.areaList2.province_list['120000'] =
          this.condition.rentType[1].label
        this.areaList2.province_list['130000'] =
          this.condition.rentType[2].label
        // 租金
        let num = 100000
        this.condition.price.forEach((item) => {
          num += 10000
          this.areaList3.province_list[num] = item.label
        })
        // 区域
        let num2 = 110000
        this.condition.area.children.forEach((item) => {
          num2 += 100
          this.areaList1.city_list[num2] = item.label
        })
        // 嵌套太深先把第二层拿出来，再拿到显示数组的key值
        const keyArr = Object.keys(this.areaList1.city_list)
        const er = this.condition.area.children
        // console.log(er)
        // 循环第二层拿到第二层的所有对象
        er.forEach((children, index) => {
          let num3 = keyArr[index]
          num3 = parseInt(num3)
          if (!children.children) {
            return false
          }
          // 如果第二层的对象有children就循环取出
          children.children.forEach((item) => {
            num3 += 1
            this.areaList1.county_list[num3] = item.label
          })
        })
        // 地铁
        let subnum2 = 120000
        this.condition.subway.children.forEach((item) => {
          subnum2 += 100
          this.areaList1.city_list[subnum2] = item.label
        })
        // 筛选出以12开头的数组
        const keyArr12 = Object.keys(this.areaList1.city_list).filter(
          (item) => {
            return /^12/.exec(item)
          }
        )
        const subEr = this.condition.subway.children
        subEr.forEach((children, index) => {
          let num3 = keyArr12[index]
          num3 = parseInt(num3)
          if (!children.children) {
            return false
          }
          // 如果第二层的对象有children就循环取出
          children.children.forEach((item) => {
            num3 += 1
            this.areaList1.county_list[num3] = item.label
          })
        })

        this.$toast.success('获取信息成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取信息失败')
      }
    },
    // 点击确认，取到vant的确认按钮
    async fnxxx() {
      const confirmBtn = document.querySelector('#area .van-picker__confirm')
      await confirmBtn.click()
      this.$refs.areaAndSub.toggle(false)
    },
    async fnxxx1() {
      const confirmBtn = document.querySelector('#way .van-picker__confirm')
      await confirmBtn.click()
      this.$refs.way.toggle(false)
    },
    async fnxxx2() {
      const confirmBtn = document.querySelector('#money .van-picker__confirm')
      await confirmBtn.click()
      this.$refs.money.toggle(false)
    },
    // 得到筛选后的地铁或区域的值
    getValue(arr) {
      this.curAreaValueArr = ''
      if (arr[0].name === '区域') {
        // 如果第三项有值,就找到对应的值
        if (arr[2].name && arr[2].name !== '不限') {
          // 第二级
          const er = this.condition.area.children
          const curEr = er.find((item) => {
            return item.label === arr[1].name
          })
          const curSan = curEr.children.find(
            (item) => item.label === arr[2].name
          )
          return (this.curAreaValueArr = curSan.value)
        }
        // 如果第二项有值
        if (arr[1].name && arr[1].name !== '不限') {
          const er = this.condition.area.children
          const curEr = er.find((item) => {
            return item.label === arr[1].name
          })
          // 返回选中二的值
          return (this.curAreaValueArr = curEr.value)
        }
        return (this.curAreaValueArr = '')
      } else {
        // 地铁项 如果第三项有值,就找到对应的值
        if (arr[2].name && arr[2].name !== '不限') {
          // 第二级
          const er = this.condition.subway.children
          const curEr = er.find((item) => {
            return item.label === arr[1].name
          })
          const curSan = curEr.children.find(
            (item) => item.label === arr[2].name
          )
          return (this.curAreaValueArr = curSan.value)
        }
        // 如果第二项有值
        if (arr[1].name && arr[1].name !== '不限') {
          const er = this.condition.subway.children
          const curEr = er.find((item) => {
            return item.label === arr[1].name
          })
          // 返回选中二的值
          return (this.curAreaValueArr = curEr.value)
        }
        return (this.curAreaValueArr = '')
      }
    },
    // 筛选区域地铁
    confirmAreaFn(arr) {
      // console.log(arr)
      this.getValue(arr)
    },
    // 筛选 整租合租
    confirmWayFn(arr) {
      // console.log(arr)
      if (arr[0].name === '整租') {
        this.curWayValue = true
      } else if (arr[0].name === '合租') {
        this.curWayValue = false
      } else {
        this.curWayValue = ''
      }
    },
    // 筛选租金
    confirmMoneyFn(arr) {
      // console.log(arr)
      if (arr[0].name !== '不限') {
        this.curMoneyValue = this.condition.price.find(
          (item) => arr[0].name === item.label
        ).value
      } else {
        this.curMoneyValue = ''
      }
    },
    // 筛选更多
    moreFilter() {
      // console.log(this.curValueArr)
      this.curMoreValue = this.curValueArr.join(',')
      console.log(this.curMoreValue)
    }
  },
  async created() {
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    // 先获取id，在请求数据
    await this.getCityId()
    await this.getFiltrate()
  }
}
</script>

<style lang="less" scoped>
.zf-page {
  padding-bottom: 100px;
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
  // 更多筛选条件
  .FilterMore {
    padding: 0 15px;
    .title {
      margin: 20px 0;
      font-size: 15px;
    }
    .box {
      margin-left: 40px;
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 14px;
      .tag {
        display: inline-block;
        height: 32px;
        width: 70px;
        margin: 0 18px 15px 0;
        border: 1px solid #ddd;
        border-radius: 3px;
        line-height: 32px;
        text-align: center;
        font-size: 12px;
        color: #888;
      }
    }
    .current {
      border: 1px solid #21b97a;
      color: #21b97a;
      background-color: #defaef;
    }
  }
  .btn-box {
    position: fixed;
    display: flex;
    left: 82px;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 9999;
  }
  // 选中时的菜单
  .currentMenu1 {
    /deep/ .van-dropdown-menu__bar .van-dropdown-menu__item:nth-child(1) {
      .van-dropdown-menu__title {
        color: #21b97a;
      }
    }
  }
  .currentMenu2 {
    /deep/ .van-dropdown-menu__bar .van-dropdown-menu__item:nth-child(2) {
      .van-dropdown-menu__title {
        color: #21b97a;
      }
    }
  }
  .currentMenu3 {
    /deep/ .van-dropdown-menu__bar .van-dropdown-menu__item:nth-child(3) {
      .van-dropdown-menu__title {
        color: #21b97a;
      }
    }
  }
  .currentMenu4 {
    /deep/ .van-dropdown-menu__bar .van-dropdown-menu__item:nth-child(4) {
      .van-dropdown-menu__title {
        color: #21b97a;
      }
    }
  }
}
</style>
