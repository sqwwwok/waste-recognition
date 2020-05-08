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
  onReady(){
    const query = wx.createSelectorQuery();
    query.select('.canvas')
      .fields({node: true,size: true})
      .exec((res)=>{
        const canvas = res[0].node;
        const width = canvas.width, height = canvas.height, ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(width/2,0,width/2,height);
        gradient.addColorStop(0,'white');
        gradient.addColorStop(1,'black');
        const marginLeft = width/12, marginTop = height/12, lineWidth = width-2*marginLeft, lineHeight = height/40;
        var moveLength = height/50;

        var beforeRect = [marginLeft,marginTop,lineWidth,lineHeight];
        ctx.fillStyle = gradient;
        function drawLine () {
          ctx.clearRect(0,0,width,height);
          if(height-beforeRect[1]<=marginTop) {
            moveLength = -moveLength;
          }else if(beforeRect[1]<marginTop){
            moveLength = -moveLength;
          }
          beforeRect[1]+=moveLength;
          ctx.fillRect(...beforeRect);
          return canvas.requestAnimationFrame(drawLine);
          // return setTimeout(drawLine,1000);
        }
        drawLine();
      })
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