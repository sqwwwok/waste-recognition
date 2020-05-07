Page({
  data: {
    rank: 0,
    count: 0,
  },
  onLoad(){
    var that = this;
    wx.showLoading({title: '统计数据中'});
    Promise.all([that.requestRank(),that.requestCount()])
      .then(res=>{
        that.setData({rank: res[0], count: res[1]});
        wx.hideLoading();
      }).catch(()=>wx.hideLoading({}))
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
})