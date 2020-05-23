// pages/classify/classify.js
Page({
  data: {
    // '' | 'blank' | 'tmep/path'
    imagePath: 'blank',
    classifyResult: '',
    // null | loading | successed | failed
    classifyProcess: 'null',
    isTextShown: false,
    textContent: '',
    rankValue: 100,
    isRanked: false,
    failedMsg: '',
    debug: getApp().globalData.debugger,
  },

  onShow(){
    this.getTabBar().setData({_pageName: 'classify'});
  },
  onHide(){
    if(!this.data.imagePath){
      this.setData({imagePath: 'blank'})
    }
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

  chooseText(){
    this.setData({isTextShown: true});
  },
  inputText(event){
    this.setData({textContent: event.detail.value});
  },
  uploadText(){
    this.simpleClassify(this.data.textContent);
    this.completeText();
  },
  completeText(){
    this.setData({isTextShown: false})
  },
  simpleClassify (name) {
    if(this.data.classifyProcess==='loading') return
    var that = this;
    name = encodeURIComponent(name);
    that.setData({classifyProcess:'loading'});
    wx.request({
      url: `https://www.sqwwwok.cn/mini/map?name=${name}`,
      success(res){that.classifySuccessed(res)},
      fail(){that.classifyFailed("服务器繁忙")},
    })
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