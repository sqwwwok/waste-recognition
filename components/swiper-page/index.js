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
    _pageX: 0,
    // 发生翻页的最小滑动距离
    _MIN_DISTANCE: 30
  },
  methods: {
    touchStart(e){
      // console.log(e)
      this.setData({ _pageX: e.touches[0].pageX});
    },
    touchMove(e){
      if(this.data._direction) return;
      const startPageX = this.data._pageX, minDistance = this.data._MIN_DISTANCE;
      const nowPageX = e.touches[0].pageX;
      if(nowPageX>startPageX+minDistance) this.setData({_direction: 'left'});
      if(nowPageX<startPageX-minDistance) this.setData({_direction: 'right'});
    },
    touchEnd(e){
      var targetPage = '', direction = this.data._direction;
      if(direction) targetPage = (direction==='left' ? this.properties._leftPage : this.properties._rightPage);
      this.setData({_direction: ''});
      if(targetPage) wx.switchTab({url: targetPage})
    },
  }
})