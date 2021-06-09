function Ajax(method, url, param, callback) {
    method = method || "get";/* 设置method属性默认值get*/
    param = param || null;

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    xhr.open(method, url, true);//open方法只是设置了一些请求参数。

    //如果请求方法是post,下面这名必须加
    if (method.toLowerCase() == "post") {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }

    xhr.send(param);//发送请求及数据，

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {

                //使用回调函数
                if (callback) {
                    callback(xhr.responseText);
                }
                else {
                    document.write(xhr.responseText);
                }
            }
        }
    }
}

function show_in_div(param) {
    document.getElementById('div1').innerText = param;
}

function Upload() {
    var files = document.getElementById("Doc_Upload").prop("files");
    var data = new FormData();
    data.append('Doc_Upload', files[0]);

    Ajax("post", "Analyzer.ashx", data, show_in_div);
}

function submitForm() {
    document.forms['uploadDOCX'].submit()
}