var axios = (function () {
  function formate(data) {
    var str = '';
    for (var key in data) {
      str += key + '=' + data[key] + '&';
    }
    return str.slice(0, -1)
  }
  function ajax(opt) {
    var defaults = {
      method: 'get',
      url: '',
      data: {},
      async: true,
      success: function () { },
      error: function () { }
    }
    var data = Object.assign({}, defaults, opt);
    var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.onload = function () {
        if (xhr.status == 200) {
          var res = JSON.parse(xhr.responseText);
          data.success(res);
      } else {
        data.error(new Error('this is error message'))
      }
    }
    var url = data.data?data.url + '?':data.url;
    if (data.method == 'get') {
      xhr.open(data.method, url + formate(data.data), data.async)
      xhr.send()
    } else if (data.method == 'post') {
      xhr.open(data.method, data.url, data.async)
      xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
      xhr.send(formate(data.data))
    }
  }
  return ajax;
})()