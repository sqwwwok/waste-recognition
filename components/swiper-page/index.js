Component({
  options: {
    pureDataPattern: /^_/
  },
  properties: {
    // 这两个都是tabURL
    _leftPage: {type: String, value: ''},
    _rightPage: {type: String, value: ''}
  },
  data: {
    // '' | 'left' | 'right'
    _direction: '',
    _pageX: 0
  },
  methods: {
    touchStart(e){
      // console.log(e)
      this.setData({ _pageX: e.touches[0].pageX});
    },
    touchMove(e){
      // console.log(e)
      if(this.data._direction) return;
      var startPageX = this.data._pageX;
      this.setData({
        _direction: e.touches[0].pageX < startPageX ? 'right' : 'left'
      });
    },
    touchEnd(e){
      var targetPage = (this.data._direction==='left' 
        ? this.properties._leftPage 
        : this.properties._rightPage);
      this.setData({_direction: ''});
      if(targetPage) wx.switchTab({url: targetPage})
    },
  }
})