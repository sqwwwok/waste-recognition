// pages/classify/classify.js
Page({
  data: {
    imagePath: '',
    classifyResult: '',
    resultToDesc: {
      'glass':'玻璃属于可回收垃圾',
      'paper': '卫生纸类属于干垃圾（其他垃圾），书写纸属于可回收垃圾',
      'metal': '金属属于可回收垃圾',
      'plastic': '塑料属于可回收垃圾，塑料袋属于不可回收垃圾',
      'cardboard': '纸板箱属于可回收垃圾'
    },
    // null | loading | successed | failed
    classifyProcess: 'null',
    rankValue: 100,
    isRanked: false,
    failedMsg: "",
    debug: getApp().globalData.debugger,
  },

  // 选择图片
  chooseImage(){
    // 防抖
    if(this.data.classifyProcess==='loading') return this.classifyFailed('操作过快');
    var that  = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed','original'],
      sourceType: ['album','camera'],
      success(res){
        let imagePath = res.tempFilePaths[0];
        that.chooseImageSuccessed(imagePath);
      },
      fail(){that.chooseImageFailed()},
    })
  },
  takePhoto(){
    var that = this;
    if(that.data.imagePath){
      that.setData({imagePath: ''});
    }else{
      const ctx = wx.createCameraContext();
      ctx.takePhoto({
        quality:'high',
        success(res){
          that.setData({takePhotoTitle: '重新拍照'})
          that.chooseImageSuccessed(res.tempImagePath);
        }
      })
    }
  },
  chooseImageSuccessed (imagePath) {
    this.setData({imagePath});
    this.classify();      
  },
  chooseImageFailed () {
    console.log('chooseImageFailed');
  },

  // 向后端发送图片请求
  classify(){
    // 防抖
    if(this.data.classifyProcess==='loading') return
    var that = this;
    that.setData({classifyProcess:'loading'});
    wx.uploadFile({
      filePath: that.data.imagePath,
      name: 'pic',
      url: 'https://www.sqwwwok.cn/mini/classify',
      success(res){that.classifySuccessed(res)},
      fail(){that.classifyFailed("服务器繁忙")},
    });
  },
  classifySuccessed (res) {
    if(res.statusCode===200){
      this.setData({
        classifyResult: res.data,
        classifyProcess: "successed",
        isRanked: false
      });
    }else{
      this.classifyFailed('识别失败');
    }
  },
  classifyFailed (failedMsg) {
    this.setData({
      classifyProcess: "failed",
      failedMsg: failedMsg
    });
  },

  // 获取地理位置
  getLocation(){
    var that = this;
    var bmap = require('../../libs/bmap-wx.min.js');
    var BMap = new bmap.BMapWX({ak:'sEBEHSsmOAcMDlxIIrshDymVcbOmPezA'});
    BMap.regeocoding({
      success(res){
        var province = res.originalData.result.addressComponent.province;
        console.log(province);
        that.getLocationSuccessed(province)
      },
      fail(){
        that.getLocationFailed()
      },
    })
  },
  getLocationSuccessed(province){
    var that = this;
    wx.navigateTo({url: `../rule/rule?province=${province}`});
  },
  getLocationFailed(){

  },


  // 评分
  changeSlider(event){
    this.setData({
      rankValue: event.detail.value
    })
  },
  rank(){
    var that = this;
    wx.request({
      url: `https://www.sqwwwok.cn/mini/rank?rank=${that.data.rankValue}`,
      success(res){that.rankSuccessed(res)},
      fail(){that.rankFailed()},
      complete(){that.rankCompleted()}
    });
  },
  rankSuccessed(res){

  },
  rankFailed(){

  },
  rankCompleted(){
    this.setData({
      isRanked: true,
      rankValue: 100,
    })
  },

  test(){
    this.getLocationSuccessed('安徽省')
  },
})