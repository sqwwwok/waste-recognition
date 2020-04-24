// pages/classify/classify.js
Page({
  data: {
    imagePath: '',
    classifyResult: '',
    classifyProcess: 'null',
    rankValue: 100,
  },

  // 选择图片
  chooseImage(){
    var that  = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed','original'],
      sourceType: ['album','camera'],
      success(res){that.chooseImageSuccessed(res)},
      fail(){that.chooseImageFailed()},
    })
  },
  chooseImageSuccessed (res) {
    var imagePath = res.tempFilePaths[0];
    this.setData({imagePath});
    this.classify();      
  },
  chooseImageFailed () {
    console.log('chooseImageFailed');
  },

  // 向后端发送图片请求
  classify(){
    var that = this;
    wx.uploadFile({
      filePath: that.data.imagePath,
      name: 'pic',
      url: 'https://www.sqwwwok.cn/mini/classify',
      success(res){that.classifySuccessed(res)},
      fail(){that.classifyFailed()},
    });
    that.setData({classifyProcess:'loading'});
  },
  classifySuccessed (res) {
    if(res.statusCode===200){
      this.setData({
        classifyResult: res.data,
        classifyProcess: "successed",
      });
    }else{
      this.classifyFailed();
    }
  },
  classifyFailed () {
    this.setData({
      classifyProcess: "failed"
    });
  },

  // 评个分
  rank(){
    var that = this;
    wx.request({
      url: `https://www.sqwwwok.cn/mini/rank?rank=${that.data.rankValue}`,
      success(res){that.rankSuccessed(res)},
      fail(){that.rankFailed()},
    })
  },
  rankSuccessed(res){

  },
  rankFailed(){

  },

  test(){
    this.classifySuccessed(
      {
        statusCode: 200,
        data: 'glass'
      }
    )
  },
})