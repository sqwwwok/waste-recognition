Component({
  properties: {
    pageName: {
      type: String
    },
  },
  data: {
    selected: true,
    classifySelected: true,
    isTappedOnce: false,
  },
  observers: {
    'selected': function (selected){
      var that = this;
      this.setData({classifySelected: that.properties.pageName==='classify' ? selected : !selected})
    }
  },
  pageLifetimes: {
    show(){
      this.setData({selected: true});
    },
    hide(){
      this.setData({selected: false})
    }
  },
  methods: {
    toIndex(){
      var that = this;
      if(this.properties.pageName==='index') return;
      if(this.data.isTappedOnce) return wx.navigateBack();
      wx.navigateTo({
        url: '../index/index',
        success(){that.setData({isTappedOnce: true})}
      });
    },
    toClassify(){
      var that = this;
      if(this.properties.pageName==='classify') return;
      if(this.data.isTappedOnce) return wx.navigateBack();
      return wx.navigateTo({
        url: '../classify/classify',
        success(){that.setData({isTappedOnce: true})}
      });
    }
  }
})