// pages/sign/sign.js
Page({

  name: function (e) {   //获取input输入的值
    var that = this;
    that.setData({
      name: e.detail.value
    })
  },
  tel: function (e) {    //获取input输入的值
    var that = this;
    that.setData({
      tel: e.detail.value
    })
    var tel = that.data.tel
    if (!(tel.length === 11)) {
      wx.showToast({
        title: '请输入11位的手机号码',
        image: '../Image/error.png',
        duration: 2000
      })
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    imgs: []
  },
  
  chooseImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        // console.log(tempFilePaths + '----');
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        // console.log(imgs);
        that.setData({
          imgs: imgs
        });
      }
    });
  },
  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },

  formSubmit: function (e) {
    var that = this;
    var tokend = wx.getStorageSync('tokend')
    var name2 = e.detail.value.name2;         //获取input初始值
    var tel2 = e.detail.value.tel2;    //获取input初始值
    var name = that.data.name ? that.data.name : name2    //三元运算，如果用户没修改信息，直接提交原来的信息，如果用户修改了信息，就将修改了的信息和未修改过的信息一起提交
    var tel = that.data.tel ? that.data.tel : tel2
    wx.request({
      method: 'POST',
      url: 'https://....?token=' + tokend, //接口地址
      data: {
        'name': name,
        'tel': tel
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        wx.showToast({
          title: '资料修改成功',
          image: '../Image/suess.png',
          duration: 2000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../index/index',
          })
        }, 2000)

      },
      fail: function (res) {
        console.log('cuowu' + ':' + res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})