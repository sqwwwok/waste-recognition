Page({
  data: {
    tipContent: ''
  },
  onShow(){
    this.getTabBar().setData({_pageName: 'tip'});
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var randomIndex = Math.floor(100*Math.random()); 
    wx.request({
      url: `https://www.sqwwwok.cn/mini/tip?index=${randomIndex}`,
      success(res){that.getTipSuccessed(res);},
      fail(){that.getTipFailed()},
      complete(){wx.hideLoading();}
    })
  },
  getTipSuccessed(res){
    this.setData({tipContent: res.data});
  },
  getTipFailed(){
    this.setData({tipContent: '服务器繁忙...'})
  }
})