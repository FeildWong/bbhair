var app = getApp()

Page({
  data: {
    mapWidth: app.globalData.screen_width
    , mapHeight: app.globalData.screen_height
  }
  //show current position
  , onLoad: function (options) {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        that.setData({
          mapLongitude: res.longitude
          , mapLatitude: res.latitude
          , markers: [
            {
              id: 0
              , iconPath: "../../images/mapMarks/bbShopLocation.png"
              , longitude: res.longitude
              , latitude: res.latitude
              , width: 30
              , height: 30
              , callout: {
                content: "BBShop-时尚造型"
                , color: "#d4237a"
                , bgColor: "#00000000"
              }
              ,label: {
                content:"BBShop-时尚造型"
                , color: "#d4237a"
              }
            }
          ]
        })
      },
    })
  }
  //获取中间点的经纬度，并mark出来
  , getLngLat: function () {
    var that = this;
    this.mapCtx = wx.createMapContext("map4select");
    this.mapCtx.getCenterLocation({
      success: function (res) {
        that.setData({
          longitude: 112.33
          , latitude: 23.099994
        })
      }
    })
  }
  , regionchange(e) {
    // 地图发生变化的时候，获取中间点，也就是用户选择的位置
    if (e.type == 'end') {
      this.getLngLat()
    }
  }
    /**
   * 用户点击右上角分享
   */
  ,onShareAppMessage: function () {

  }
  , markertap(e) {
    console.log(e)
  }
})