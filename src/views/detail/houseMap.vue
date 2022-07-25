<template>
  <div class="houseMap-page">
    <div id="allmap" ref="allmap" class="map"></div>
  </div>
</template>

<script>
export default {
  props: ['coord'],
  data() {
    return {
      map: null
    }
  },
  methods: {
    createdMap(x, y) {
      // 百度地图API功能
      this.map = new window.BMap.Map(this.$refs.allmap) // 创建Map实例
      this.map.centerAndZoom(new window.BMap.Point(x, y), 17) // 初始化地图,设置中心点坐标和地图级别 116.404, 39.915北京天安门
      this.map.setCurrentCity(this.$store.state.cityName) // 设置地图显示的城市 此项是必须设置的
      this.map.enableScrollWheelZoom(true) // 开启鼠标滚动缩放
      const point = new window.BMap.Point(x, y)
      // 创建点标记
      const marker = new window.BMap.Marker(point)
      // 在地图上添加点标记
      this.map.addOverlay(marker)
    }
  },
  async mounted() {
    console.log(this.coord)
    await this.createdMap(this.coord.longitude, this.coord.latitude)
  }
}
</script>

<style lang="less" scoped>
.houseMap-page {
  width: 100%;
  height: 145px;
  #allmap {
    width: 100%;
    height: 145px;
  }
}
</style>
