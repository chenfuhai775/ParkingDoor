$(function () {
    var arrString = GetRequest();
    $.ajax({
        datetype: "json",
        async: false,
        data: {"phone": arrString["phone"]},
        url: "/api/getlistbyPhone",
        success: function (json) {
            json = JSON.parse(json);
            if (json.result) {
                var jsonArr = eval(json.data);
                $.each(jsonArr, function (i) {
                    if (this.devicetypecode == "CN1002") {
                        $("<div onclick='OpenDoor(\" + this.sn + \")' style='cursor:pointer;text-align:center;margin:10px;float:left;height: 80px;font-size: 16px'>" +
                            "<image src='../staticResource/image/timg.jpg' >" + "</br>" + this.devicename + "</image>").appendTo("body");
                    }
                });
            } else
                modals.info(json.msg);
        },
        error: function (data) {
        }
    });
});

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function OpenDoor(sn) {
    var arrString = GetRequest();
    $.ajax({
        datetype: "json",
        async: false,
        data: {"phone": arrString["phone"], "sn": sn},
        url: "  /api/door/opendoor",
        success: function (json) {
            modals.info("操作成功");
            setTimeout(function () {
                $("#modal-tips-div").trigger("click");
            }, 1000);
        },
        error: function (data) {
        }
    });
}