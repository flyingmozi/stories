var $ = {
    axios: function(opts) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        var def = {
            async: true,
            dataType: 'json',
            method: 'get'
        }
        var opts = Object.assign({}, def, opts)
        var data = typeof opts.data == 'string' ? opts.data : this.format(opts.data)
        var url = opts.method == 'get' ? opts.url + '?' + data : opts.url
        xhr.open(opts.method, url, opts.async)
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
        xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    opts.success && opts.success(xhr.responseText)
                } else {
                    opts.error && opts.error()
                }
            }
        xhr.send(opts.method == 'get' ? null : data)
    },
    format: function(data) {
        var str = '';
        for (var key in data) {
            str += key + '=' + data[key] + '&'
        }
        return str.slice(0,-1)
    }
}
