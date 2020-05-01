Page({
  data: {
    province: '',
    rules: [
      {type: '', desc: ''}
    ],
    postscripts: '',
    errorInfo: '',
    debug: getApp().globalData.debugger,
  },
  onLoad(query){
    this.onLoadCb(query);
  },

  onLoadCb(query){
    console.log(query)
    this.getRule(query.province);
    wx.showLoading({
      title: '获取当地规范中',
    })
  },

  // 获取当地规范
  getRule(province){
    var that = this;
    wx.request({
      url: `https://www.sqwwwok.cn/mini/rule?province=${province}`,
      success(res){
        if(res.statusCode===200){
          console.log(res.data);
          let data = {
            rules: res.data.rule, 
            postscripts: res.data.postscripts, 
            province: province
          };
          that.getRuleSuccessed(data);
        }else{
          that.getRuleFailed(province,false)
        }
      },
      fail(){
        that.getRuleFailed(null,true)
      },
      complete(){
        wx.hideLoading();
      }
    })
  },
  getRuleSuccessed(data){
    this.setData(data);
  },
  getRuleFailed(province,isServerError){
    if(isServerError){
      this.setData({errorInfo: `服务器维护中...`})
    }else{
      this.setData({errorInfo: `您所在的${province}没有相关数据`})
    }
  },

  test(){
    // this.getRuleFailed('安徽',false)
    this.getRuleSuccessed({
      province: '安徽省',
      rules: [
        {type: '可回收垃圾',desc: '这是一段描述'},
        {type: '不可回收垃圾',desc: '这是第二段描述'},
      ],
      postscripts: '这个城市和其他城市不同'
    })
  }
})