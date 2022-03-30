// pages/system/pact/toPlan.js
var config = require('../../../config')
import toast from '../../../dist/toast/toast';
var util = require('../../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allData:[],
    details:[],
    show: false,
    finishTime:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.request({
        url: config.service.paymentList,    
        method:"GET",    
        header:{
          "content-type":"application/json",
          'Authorization': 'Bearer '+config.service.token,
        },     
        success:function(res){ 
          if(res.data?.data?.records){
              toast.success('查询成功');
              _this.setData({
                allData:res.data.data.records,
            })
          }
          else{
            toast.fail('查询失败');
          } 
        }
      })
  },
  showPopup(e) {
    let index = e.target.dataset.index;
    this.setData({
        details:this.data.allData[index],
        show:true,
        finishTime:util.formatTime(new Date(this.data.details.finishTime))
    })
  },
  onTap:function(e){
    wx.navigateTo({
      url: 'payList?list='+JSON.stringify(e.target.dataset.id),
    })
  }
})