function Ajax(method, url, param, callback) {
    method = method || "get";/* 设置method属性默认值get*/
    param = param || null;

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    xhr.open(method, url, true);//open方法只是设置了一些请求参数。

    //如果请求方法是post,下面这名必须加
    //if (method.toLowerCase() == "post") {
    //    xhr.setRequestHeader("Content-Type", "multipart/form-data");
    //}
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

function pathChange(p) {
    document.forms[0].fName.value = p.value;
    if (checkText(document.getElementById('photo'))) {
        showImg(p, 'pre');
    };
}

function new_upload() {
    var file = document.getElementById("Doc_Upload");
    var upload_file = file.files[0];
    var formdata = new FormData();
    xhr = new XMLHttpRequest();
    formdata.append("Doc_Upload", upload_file);
    xhr = open('post', 'Analyzer.ashx', true);
    xhr.send(formdata);
    xhr.onreadystatechange = function()
        {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
        xhr.send(formdata);
    }
}

var myfiles = new Array(5);
var myfileslength = 0;
var formdata = new FormData();
myfiles = [{ filename: "wode11.doc", uptime: "111", info: "111", result: { 'sds': 1, '344': 8, '333': 6 } }, { filename: "lll.doc", uptime: "www", info: "1344", result: { 'sds': 1, '344': 8, '333': 6 } }]
myfileslength = 2;

function create_json(param) {
    var new_j = eval("(" + param + ")");

    if (myfileslength == 5) {
        myfiles.pop();
        myfileslength--;
    }
    if (myfileslength < 5) {
        myfiles.unshift({
            filename: new_j["filename"],
            uptime: new_j["uptime"],
            info: new_j["info"],
            result: new_j["result"],
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
    for (var i = 0; i < 5; i++) {
        document.getElementById(String(i)).style.display = i < myfileslength ? "block" : "none";
        if (i < myfileslength) {
            document.getElementById(String(i)).querySelector(".title").innerText = myfiles[i].filename;
            document.getElementById(String(i)).querySelector(".time").innerText = myfiles[i].uptime;
            document.getElementById(String(i)).querySelector(".info").innerText = myfiles[i].info;
        }
    }
}

window.onload = function () {
    judge_json();
    

}