// pages/index/index.js
Page({
  data: {
    isTapped: false,
  },
  turnToAbout(){
    var that = this;
    if(that.data.isTapped) return;
    that.setData({isTapped: true});
    Promise.all([this.requestRank(),this.requestCount()])
      .then((res)=>{
        var query = `?rank=${res[0]}&count=${res[1]}`;
        wx.navigateTo({url: `../about/about${query}`});  
      }).catch(()=>this.setData({isTapped:false}))
  },
  requestRank () {
    return new Promise ((resolve,reject)=>{
      wx.request({
        url: 'https://www.sqwwwok.cn/mini/rank',
        success(res){resolve(Number(res.data))},
        fail(){reject()},
      })
    });
  },
  requestCount(){
    return new Promise ((resolve,reject)=>{
      wx.request({
        url: 'https://www.sqwwwok.cn/mini/count',
        success(res){resolve(Number(res.data))},
        fail(){reject()}
      })
    });
  },
  turnToClassify(){
    wx.switchTab({
      url: '../classify/classify',
    })
  },
  onShow(){
    this.setData({isTapped:false})
  }
})