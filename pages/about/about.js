Page({
  data: {
    rank: 0,
    count: 0
  },
  onLoad(query){
    this.setData({
      rank: query.rank,
      count: query.count
    })
  }
})