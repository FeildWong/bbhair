//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //set the width and height
    // 动态设置map的宽和高
    
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.screen_width = res.screenWidth;
        that.globalData.screen_height = res.screenHeight;
      }
    })
    // 登录
    wx.login({
      success: res => {
          if (res.code) {
            //发起网络请求 
            console.log(res.code)
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({

      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)

              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    screen_width:300,
    screen_height:400
  }
})