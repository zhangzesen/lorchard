var api = require('../config/api.js');
//日期格式化
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//数字格式化
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// get 请求
function requestByGet(req) {
  wx.request({
    url: req.url,
    data: req.data,
    method: 'GET',
    success: function (res) {
      req.success(res.data)
    },
    fail: function (res) {
      console.log(res);
    }
  })

}

// post 请求
function requestByPost(req) {
  wx.request({
    url: req.url,
    data: req.data,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    method: 'POST',
    success: function (res) {
      req.success(res.data)
    },
    fail: function (res) {
      console.log(res);
    }
  })
}

//json格式的post请求
function requestJsonByPost(req) {
  wx.request({
    url: req.url,
    data: req.data,
    header: {
      "content-type": "application/json;charset=utf-8"
    },
    method: 'POST',
    dataType: 'json',
    success: function (res) {
      req.success(res.data)
    },
    fail: function (res) {
      console.log(res);
    }
  })
}

//delete请求
function requestByDelete(req) {
  wx.request({
    url: req.url,
    data: req.data,
    method: 'DELETE',
    success: function (res) {
      req.success(res.data)
    },
    fail: function (res) {
      console.log(res);
    }
  })
}

//put请求
function requestByPut(req) {
  wx.request({
    url: req.url,
    data: req.data,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    method: 'PUT',
    success: function (res) {
      req.success(res.data)
    },
    fail: function (res) {
      console.log(res);
    }
  })
}

function multiply(n, m) {
  n = typeof n == "string" ? n : numToString(n);
  m = typeof m == "string" ? m : numToString(m);
  var F = n.indexOf(".") != -1 ? handleNum(n) : [n, 0, 0],
    S = m.indexOf(".") != -1 ? handleNum(m) : [m, 0, 0],
    l1 = F[2],
    l2 = S[2],
    L = l1 > l2 ? l1 : l2,
    T = Math.pow(10, L);
  return ((F[0] * T + F[1] * T / Math.pow(10, l1)) * (S[0] * T + S[1] * T / Math.pow(10, l2))) / T / T
}

function numToString(tempArray) {
  if (Object.prototype.toString.call(tempArray) == "[object Array]") {
    var temp = tempArray.slice();
    for (var i, l = temp.length; i < l; i++) {
      temp[i] = typeof temp[i] == "number" ? temp[i].toString() : temp[i];
    }
    return temp;
  }
  if (typeof tempArray == "number") {
    return tempArray.toString();
  }
  return []
}

function handleNum(n) {
  n = typeof n !== "string" ? n + "" : n;
  var temp = n.split(".");
  temp.push(temp[1].length);
  return temp
}
/**
 * 检查微信会话是否过期
 */
function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        reject(false);
      }
    })
  });
}

/**
 * 调用微信登录
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          //登录远程服务器
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

function getUserInfo() {
  return new Promise(function (resolve, reject) {
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      }
    })
  });
}

function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  })
}

function showWarn(context, callback) {
  wx.showModal({
    title: '提示',
    content: context,
    confirmColor: "#29aceb",
    showCancel: false,
    success: function () {
      if (typeof callback == 'function') {
        callback();
      }
    }

  });
}

module.exports = {
  formatTime: formatTime,
  requestGet: requestByGet,
  requestPost: requestByPost,
  requestDelete: requestByDelete,
  requestPut: requestByPut,
  requestJson: requestJsonByPost,
  showWarn: showWarn,
  multiply: multiply,
  redirect,
  showErrorToast,
  checkSession,
  login,
  getUserInfo,
}

