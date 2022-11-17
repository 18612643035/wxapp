var config = require('../../../config')
import toast from '../../../dist/toast/toast';
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allData:[],
    curpage:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.request({
        url: config.service.cservicePage,    
        method:"GET",
        data:{
          current:_this.data.curpage,
        },     
        header:{
          "content-type":"application/json",
          'Authorization': 'Bearer '+config.service.token,
        },     
        success:function(res){ 
            console.log(res) 
            if(res.data?.data?.records){
              toast.success('查询成功');
              let db =  app.filter(res.data.data.records);
              _this.setData({
                  curpage:res.data.data.current,
                  allData:_this.data.allData.concat(db),
                  dictList:app.dict
              })
            }else{
              toast.fail(res.data.msg);
            }
        }
      })
  },
  onReachBottom: function () { //下拉刷新
    app.onReach(this);
  },
})