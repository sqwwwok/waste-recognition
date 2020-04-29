Page({
  data: {
    province: '',
    rules: [
      {type: '', desc: ''}
    ]
  },
  // onLoad: this.onLoadCb,

  onLoadCb(query){
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
          let data = JSON.parse(res.data);
          Object.assign(data,{province});
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
      this.setData({province: `服务器维护中...`})
    }else{
      this.setData({province: `您所在的${province}没有相关数据`})
    }
  },

  test(){
    this.getRuleFailed('安徽',false)
    // this.getRuleSuccessed({
    //   province: 'anhui',
    //   rules: [
    //     {type: '可回收垃圾',desc: '这是一段描述'},
    //     {type: '不可回收垃圾',desc: '这是第二段描述'},
    //   ]
    // })
  }
})