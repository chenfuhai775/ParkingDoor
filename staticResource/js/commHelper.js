$('#msg').on('show.bs.modal', function () {
    setTimeout(function () {
        $("#msg").modal("hide")
    }, 1000);
});

$('#msg').on('hide.bs.modal', function () {
    // 执行一些动作...
});

function showMessage(message) {
    $("#msg .modal-body").text(message);
    $("#msg").modal();
}

function dateFtt(fmt, date) { //author: meizz
    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//生成guid
function getGuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

//时钟
function clock_12h() {
    var today = new Date(); //获得当前时间
    //获得年、月、日，Date()函数中的月份是从0－11计算
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var date = today.getDate();
    var hour = today.getHours();  //获得小时、分钟、秒
    var minute = today.getMinutes();
    var second = today.getSeconds();
    month = parseInt(month) < 10 ? "0" + month : month;
    date = parseInt(date) < 10 ? "0" + date : date;
    hour = parseInt(hour) < 10 ? "0" + hour : hour;
    minute = parseInt(minute) < 10 ? "0" + minute : minute;
    second = parseInt(second) < 10 ? "0" + second : second;
    var apm = "上午"; //默认显示上午: AM
    if (hour > 12) //按12小时制显示
    {
        hour = hour - 12;
        apm = "下午";
    }
    var weekday = 0;
    switch (today.getDay()) {
        case 0:
            weekday = "星期日";
            break;
        case 1:
            weekday = "星期一";
            break;
        case 2:
            weekday = "星期二";
            break;
        case 3:
            weekday = "星期三";
            break;
        case 4:
            weekday = "星期四";
            break;
        case 5:
            weekday = "星期五";
            break;
        case 6:
            weekday = "星期六";
            break;
    }
    document.getElementById("myclock").innerHTML = year + "年" + month + "月" + date + "日&nbsp;" + apm + "&nbsp;" + hour + ":" + minute + ":" + second + "&nbsp;" + weekday;
}

var __sto = setInterval;
window.setInterval = function (callback, timeout, param) {
    callback();
    var args = Array.prototype.slice.call(arguments, 2);
    var _cb = function () {
        callback.apply(null, args);
    }
    __sto(_cb, timeout);
}