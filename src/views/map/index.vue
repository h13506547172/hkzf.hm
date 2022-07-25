<template>
  <div class="map-page">
    <div id="allmap" ref="allmap" class="map"></div>
    <van-popup
      v-model="showHouseList"
      position="top"
      :style="{ height: '30%' }"
    >
      <houseList :houseID="houseID" v-if="showHouseList"></houseList>
    </van-popup>
  </div>
</template>

<script>
import { cityIdAPI } from '@/api/rentSearch'
import { getMapAPI } from '@/api/map'
import houseList from './houseList.vue'
export default {
  components: {
    houseList
  },
  data() {
    return {
      // 地图实例
      map: null,
      // 当前位置
      cityValue: null,
      cityLevel1: [],
      num: 11,
      // 房源信息
      showHouseList: false,
      houseID: null
    }
  },
  methods: {
    createdMap(x, y) {
      // 百度地图API功能
      this.map = new window.BMap.Map(this.$refs.allmap) // 创建Map实例
      this.map.centerAndZoom(new window.BMap.Point(x, y), 11) // 初始化地图,设置中心点坐标和地图级别 116.404, 39.915北京天安门
      // 添加地图类型控件
      this.map.addControl(
        // 比例尺
        new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_BOTTOM_LEFT })
      )
      this.map.addControl(
        // 放大缩放组件
        new window.BMap.NavigationControl()
      )
      this.map.setCurrentCity(this.$store.state.cityName) // 设置地图显示的城市 此项是必须设置的
      this.map.enableScrollWheelZoom(true) // 开启鼠标滚动缩放
    },
    // 添加标记点
    async addCoord(obj) {
      // console.log(obj)

      const x = obj.coord.longitude
      const y = obj.coord.latitude
      const cityVlaue2 = obj.value
      const point = await new window.BMap.Point(x, y)
      const opts = {
        position: point,
        offset: new window.BMap.Size(0, 0)
      }
      // 当显示的是第三层的小区时
      if (this.num === 17) {
        const text = `<div><span>${obj.label}</span><span>${obj.count}套</span></div>`
        const label = new window.BMap.Label(text, opts)
        // 自定义文本标注样式
        label.setStyle({
          height: '20px',
          lineHeight: '19px',
          width: '100px',
          padding: '0 3px',
          borderRadius: '3px',
          position: 'absolute',
          background: 'rgba(12,181,106,.9)',
          cursor: 'pointer',
          whiteSpace: 'nowrap'
        })
        // 给标记添加点击事件
        label.addEventListener('click', () => {
          // console.log(obj)
          this.showHouseList = true
          this.houseID = obj.value
        })
        // 在地图上添加点标记
        this.map.addOverlay(label)
        return
      }
      // 不是小区时的情况
      const text = `<div><p>${obj.label}</p><p>${obj.count}套</p></div>`
      const label = new window.BMap.Label(text, opts)
      // 自定义文本标注样式
      label.setStyle({
        width: '70px',
        height: '70px',
        lineHeight: '1',
        display: 'inline-block',
        position: 'absolute',
        borderRadius: '100%',
        background: 'rgba(12,181,106,.9)',
        color: '#fff',
        border: '2px solid hsla(0,0%,100%,.8)',
        textAlign: 'center',
        cursor: 'pointer'
      })
      // 给标记添加点击事件
      label.addEventListener('click', () => {
        this.num += 3
        // 重新设置中心点并跳转层级
        this.map.centerAndZoom(new window.BMap.Point(x, y), this.num)
        // 删除所有标注物
        this.map.clearOverlays()
        this.getMap(cityVlaue2)
      })

      // 在地图上添加点标记
      this.map.addOverlay(label)
    },
    // 获取本地地址信息
    async cityId() {
      const res = await cityIdAPI(this.$store.state.cityName)
      // console.log(res)
      this.cityValue = res.data.body.value
    },
    // 获取1、2级房源经纬度信息
    async getMap(cityValue) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await getMapAPI(cityValue)
        // console.log(res)
        this.cityLevel1 = res.data.body
        // console.log(this.cityLevel1)
        this.$toast.success('获取数据成功')
      } catch (error) {
        this.$toast.fail('获取数据失败')
      }
    }
  },
  async mounted() {
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    await this.cityId()
    await this.getMap(this.cityValue)
    // 循环城市列表并添加房源标注
    this.cityLevel1.forEach((item) => {
      this.addCoord(item)
    })
    // 生成地图
    const x = this.cityLevel1[0].coord.longitude
    const y = this.cityLevel1[0].coord.latitude
    await this.createdMap(x, y)
  },
  watch: {
    cityLevel1: {
      deep: true,
      handler(val, oldval) {
        if (oldval === []) {
          return
        }
        // 循环城市列表并添加房源标注
        this.cityLevel1.forEach((item) => {
          this.addCoord(item)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
#allmap {
  height: 667px;
  width: 100%;
  overflow: hidden;
}
</style>
