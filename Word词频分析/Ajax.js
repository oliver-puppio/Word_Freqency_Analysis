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

function send_data() {
    var files = document.getElementById("Doc_Upload").files[0];
    var data = new FormData();
    data.append('Doc_Upload', files[0]);
    return data;
}

//function upload() {
//    $.ajax({
//        type: "post",
//        url: "Analyzer.ashx",
//        data: send_data,
//        success: function (data, textStatus) { alert(data); },
//        error: function () {alert("error")}
//    });
//}

function create_json(param) {
    var new_j = eval("(" + param + ")");

    if (myfileslength == 5) {
        myfiles.pop();
        myfileslength--;
    }
    if (myfileslength < 5) {
        myfiles.unshift({
            filename = new_j["filename"],
            uptime = new_j["uptime"],
            result = new_j["result"],
        });
        myfileslength++;
    }
    judge_json();

}

function delete_json(i) {
    if (myfileslength > 0) {
        myfiles.splice(i, 1);
        myfileslength--;
    }
    judge_json();
}

function judge_json() {
    for (i = 0; i < 5; i++) {
        document.getElementById(String(i)).style.display = i < myfileslength ? "block" : "none";
        if (i < myfileslength) {
            document.getElementById(String(i)).getElementsByClassName("title").innerText = myfiles[i].filename;
            document.getElementById(String(i)).getElementsByClassName("time").innerText = myfiles[i].uptime;
            //document.getElementById(String(i)).getElementsByClassName("info").innerText =
        }
    }
}


var myfiles = new Array(5);  
var myfileslength = 0;