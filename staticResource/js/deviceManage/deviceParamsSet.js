$(function () {
    $('#grantTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    $("[data-mask]").inputmask();
    //设备校时
    initCN1001_04();
    //下载人脸信息
    initCN1001_09();
    //更新人脸信息
    initCN1001_10();
    //初始化树形数据
    initTree(0);
    //
    treeControlInit();
    //初始化凭证类型
    initCertificateType();
    //初始化门号
    initDoorNo();
    //初始化时间组编号
    initTimeGroup();

    $("#grantTab a[activecode]").click(function (e) {
        var selectedNode = $('#tree').treeview('getSelected')[0];
        if (selectedNode == undefined) {
            return false;
        }
        var aElement = this;
        var activecode = $(aElement).attr("activecode");
        doTreeNodeSelected(selectedNode.sn, activecode, selectedNode.code, aElement);
    });
});

function genetable_activeinfo(expression) {
    return "<table id=\"sctiveinfoGrid\" class=\"table table-bordered table-hover \" style=\"margin-bottom: 10px;\"><td style='padding: 20px' colspan='2'>报文格式：" + expression + "</td></table>";
}

function deviceSetTab() {
    var selectedNode = $('#tree').treeview('getSelected')[0];
    if (selectedNode == undefined) {
        return false;
    }
    $("#control-sidebar-tab-main2>div").each(function () {
        if ($(this).css("display") == "block") {
            var a = $(this).find("ul>li.active > a");
            doTreeNodeSelected(selectedNode.sn, $(a).attr("activecode"), selectedNode.code, a);
            return;
        }
    })
}

//设备校时
function initCN1001_04() {
    laydate.render({
        elem: '#CN1001_04_timing'
        , type: 'datetime'
    });
}

//下载人脸信息
function initCN1001_09() {
    laydate.render({
        elem: '#CN1001_09_starttime'
        , type: 'datetime'
    });
    laydate.render({
        elem: '#CN1001_09_endtime'
        , type: 'datetime'
    });
}

//更新人脸信息
function initCN1001_10() {
    laydate.render({
        elem: '#CN1001_10_starttime'
        , type: 'datetime'
    });
    laydate.render({
        elem: '#CN1001_10_endtime'
        , type: 'datetime'
    });
    $("#10_avatar").change(function (e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (ev) {
            var dataUrl = reader.result;
            $("#CN1001_10_avatar").val(dataUtl);
        }
    });
    $("#10_facepic").change(function (e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (ev) {
            var dataUrl = reader.result;
            $("#CN1001_10_facepic").val(dataUrl);
        }
    });
}

//排序比较
function compare(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}

//页签节点选中时，初始化设备功能数据
function doTreeNodeSelected(sn, activecode, typecode, a) {
    var jsonData = new Object();
    jsonData.devicetypecode = typecode;
    jsonData.activecode = activecode;
    $("#sctiveinfoGrid").remove();
    $.ajax({
        url: "/active/getActive",
        type: "get",
        dataType: "json",
        data: {"JsonData": JSON.stringify(jsonData)},
        success: function (data) {
            var dt = data;
            //$(genetable_activeinfo(dt.expression)).insertBefore($(a).closest("div").find("div.active >div.box>div.box-body >table"));
        },
        error: function (data) {
            modals.info("加载失败");
        }
    });
    var JsonData = {};
    JsonData.sn = sn;
    JsonData.activecode = activecode;
    $.ajax({
        url: "/device/selectdevParams",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(JsonData),
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var record = data[i].displayname;
                var type = record.substr(record.lastIndexOf("_"));
                switch (type) {
                    case "_radio":
                        var dkey = record.replace("_radio", "");
                        $("#" + dkey).find("label").removeClass("active");
                        var radio = $("#" + dkey).find("input[type='radio'][value='" + data[i].displayvalue + "']")[0];
                        $(radio).prop("checked", true);
                        $(radio).parent("label").addClass("active");
                        break;
                    case "_checkbox":
                        var _checkbox = record.replace("_checkbox", "");
                        break;
                    case "_select2":
                        var _select2 = record.replace("_select2", "");
                        $("#" + _select2).val(eval(data[i].displayvalue)).trigger('change');
                        break;
                    case "_clientAddress":
                        if (data[i].displaykey == "CN1001_09_avatar_clientAddress") {
                            $("#CN1001_09_avatar_clientAddress").prev("div").find("div.file-caption.form-control.kv-fileinput-caption").find("input").prop("placeholder", data[i].displayvalue) && $("#CN1001_09_avatar_clientAddress").val(data[i].displayvalue)
                        }
                        if (data[i].displaykey == "CN1001_10_avatar_clientAddress") {
                            $("#CN1001_10_avatar_clientAddress").prev("div").find("div.file-caption.form-control.kv-fileinput-caption").find("input").prop("placeholder", data[i].displayvalue) && $("#CN1001_10_avatar_clientAddress").val(data[i].displayvalue);
                        }
                        if (data[i].displaykey == "CN1001_09_facepic_clientAddress") {
                            $("#CN1001_09_facepic_clientAddress").prev("div").find("div.file-caption.form-control.kv-fileinput-caption").find("input").prop("placeholder", data[i].displayvalue) && $("#CN1001_09_facepic_clientAddress").val(data[i].displayvalue)
                        }
                        if (data[i].displaykey == "CN1001_10_facepic_clientAddress") {
                            $("#CN1001_10_facepic_clientAddress").prev("div").find("div.file-caption.form-control.kv-fileinput-caption").find("input").prop("placeholder", data[i].displayvalue) && $("#CN1001_10_facepic_clientAddress").val(data[i].displayvalue);
                        }
                        break;
                    case "_json":
                        switch (record) {
                            case "timegroup_json":
                                var timedata = JSON.parse(data[i].displayvalue);
                                timedata.sort(compare("serialnum"));
                                delAllGroupRow();
                                for (var t = 0; t < timedata.length; t++) {
                                    if (t > 0) {
                                        addTimeGroupRow($("#timeGroupDiv>table:eq(" + (t - 1) + ") #tdBtn i:eq(0)"));
                                    }
                                    var tab = $("#timeGroupDiv table:last");
                                    $(tab).find("input[name='CN1001_07_stardate']").val(timedata[t].stardate);
                                    $(tab).find("input[name='CN1001_07_enddate']").val(timedata[t].enddate);
                                    $(tab).find("input[name='CN1001_07_starttime1']").val(timedata[t].starttime1);
                                    $(tab).find("input[name='CN1001_07_endtime1']").val(timedata[t].endtime1);
                                    $(tab).find("input[name='CN1001_07_starttime2']").val(timedata[t].starttime2);
                                    $(tab).find("input[name='CN1001_07_endtime2']").val(timedata[t].endtime2);
                                    $(tab).find("input[name='CN1001_07_starttime3']").val(timedata[t].starttime3);
                                    $(tab).find("input[name='CN1001_07_endtime3']").val(timedata[t].endtime3);
                                    var radio = null;
                                    $(tab).find("label").removeClass("active");
                                    $(tab).find("label").removeClass("focus");
                                    var expression = null;

                                    if (timedata[t].timetype == "1") {
                                        expression = timedata[t].expression;
                                        radio = $(tab).find("div[name='CN1001_07_isweek'] input[type='radio'][value='1']")[0];
                                        $(radio).parent("label").trigger('click');
                                        for (var num = 0; num < expression.length; num++) {
                                            $(tab).find("div[name='CN1001_07_timegroup'] input[type='checkbox']").eq(num).iCheck(expression.substring(num, num + 1) == "1" ? "check" : "uncheck");
                                        }
                                    } else if (timedata[t].timetype == "2") {
                                        expression = timedata[t].expression;
                                        radio = $(tab).find("div[name='CN1001_07_isweek'] input[type='radio'][value='2']")[0];
                                        $(radio).parent("label").trigger('click');
                                        for (var num = 0; num < expression.length; num++) {
                                            $(tab).find("div[name='CN1001_07_timegroup'] input[type='checkbox']").eq(num).iCheck(expression.substring(num, num + 1) == "1" ? "check" : "uncheck");
                                        }
                                    } else {
                                        radio = $(tab).find("div[name='CN1001_07_isweek'] input[type='radio'][value='0']")[0];
                                        $(radio).parent("label").trigger('click');
                                        $(tab).find("input[name=CN1001_8_input]").val(timedata[t].times);
                                        $(tab).find("select[name=CN1001_8_select]").val(timedata[t].timegroup).trigger("change");
                                    }
                                    $(radio).prop("checked", true);
                                    $(radio).parent("label").removeClass("focus");
                                }
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                        $("#" + data[i].displayname).val(data[i].displayvalue);
                        break;
                }
            }
        },
        error: function (data) {
            modals.info("加载失败");
        }
    });
}

//自定义日期选中行为
function layDone(value, inputID) {
    if (!value) {
        return;
    }
    var arr = [];
    var newArr = [];
    if ($(inputID).val().trim().length == 0) {
        arr.push(value);
    } else {
        arr = $(inputID).val().split(",");
        var isExists = false;
        $(arr).each(function (index, data) {
            if (data == value.toString()) {
                isExists = true;
            }
        })
        if (isExists) {
            arr = getNewArr(arr, value)
        } else {
            arr.push(value);
        }
    }
    arr.sort();
    $(inputID).val(arr.join(","));
}

//初始日期选择框内容
function layReady(inputID) {
    $("div.layui-laydate-content table tbody tr td").removeClass();
    var dtArr = $(inputID).val().split(",");
    var tdList = $("div.layui-laydate-content table tbody tr td");
    $(dtArr).each(function () {
        var dt = this.toString();
        $(tdList).each(function () {
            if (dateFtt('yyyy-mm-dd', new Date(dt)) == dateFtt('yyyy-mm-dd', new Date($(this).attr("lay-ymd")))) {
                $(this).addClass("layui-this");
                return false;
            }
        });
    });
}

//数组处理
function getNewArr(fm, val) {
    var t = [];
    $(fm).each(function () {
        if (this.toString() != val) {
            t.push(this);
        }
    })
    return t;
}

/*******************************************以下为业务数据*************************************************/

//修改设备IP地址
function Save() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "changedevip";
    JsonData.CN1001_01_ipaddress$ipaddress = $("#CN1001_01_ipaddress").val();
    JsonData.CN1001_01_maskaddress$maskaddress = $("#CN1001_01_maskaddress").val();
    JsonData.CN1001_01_gateway$gateway = $("#CN1001_01_gateway").val();
    SaveCommand(JsonData);
}

//保存服务器地址
function SaveService() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "changeservice";
    JsonData.CN1001_02_service$service = $("#CN1001_02_service").val();

    SaveCommand(JsonData);
}

function SendService() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "changeservice";
    var data = []
    var params = {}
    params.service = $("#CN1001_02_service").val();
    data.push(params);
    JsonData.data = data;
    sendCommand(JsonData);
}

//保存出厂设置
function SaveVersion() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "initdev";
    JsonData.CN1001_03_version$version = $("#CN1001_03_version").val();
    SaveCommand(JsonData);
}

function SendVersion() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "initdev";
    var data = []
    var params = {}
    params.version = $("#CN1001_03_version").val();
    data.push(params);
    JsonData.data = data;
    sendCommand(JsonData);
}

//保存设备校时！！！！！
function SaveTiming() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "timeing";
    JsonData.CN1001_04_timing$timing = $("#CN1001_04_timing").val();

    SaveCommand(JsonData);
}

function SendTiming() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "timeing";
    var data = [];
    var params = {}
    params.timing = $("#CN1001_04_timing").val();
    data.push(params);
    JsonData.data = data;
    sendCommand(JsonData);
}

//保存MAC地址
function SaveMacaddr() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "changemac";
    JsonData.CN1001_05_macaddr$macaddr = $("#CN1001_05_macaddr").val();
    SaveCommand(JsonData);
}

function SendMacaddr() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "changemac";
    var data = []
    var params = {}
    params.macaddr = $("#CN1001_05_macaddr").val();
    data.push(params);
    JsonData.data = data;
    sendCommand(JsonData);
}

//保存下载人脸信息
function SaveDownfaceinfo() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "downfaceinfo";
    JsonData.CN1001_09_name$name = $("#CN1001_09_name").val();
    JsonData.CN1001_09_subjecttype_radio$subjecttype = $("#CN1001_09_subjecttype > label.active input:eq(0)").val();
    JsonData.CN1001_09_gender_radio$gender = $("#CN1001_09_gender > label.active input:eq(0)").val();
    JsonData.CN1001_09_starttime$starttime = $("#CN1001_09_starttime").val();
    JsonData.CN1001_09_endtime$endtime = $("#CN1001_09_endtime").val();
    JsonData.CN1001_09_email$email = $("#CN1001_09_email").val();
    JsonData.CN1001_09_phone$phone = $("#CN1001_09_phone").val();
    JsonData.CN1001_09_avatar_clientAddress$avatar_clientAddress = $("#CN1001_09_avatar_clientAddress").val();
    JsonData.CN1001_09_avatar_serverAddress$avatar_serverAddress = $("#CN1001_09_avatar_serverAddress").val();
    JsonData.CN1001_09_department$department = $("#CN1001_09_department").val();
    JsonData.CN1001_09_title$title = $("#CN1001_09_title").val();
    JsonData.CN1001_09_description$description = $("#CN1001_09_description").val();
    JsonData.CN1001_09_interviewee$interviewee = $("#CN1001_09_interviewee").val();
    JsonData.CN1001_09_comefrom$comefrom = $("#CN1001_09_comefrom").val();
    JsonData.CN1001_09_jobnumber$jobnumber = $("#CN1001_09_jobnumber").val();
    JsonData.CN1001_09_remark$remark = $("#CN1001_09_remark").val();
    JsonData.CN1001_09_facepic_clientAddress$facepic_clientAddress = $("#CN1001_09_facepic_clientAddress").val();
    JsonData.CN1001_09_facepic_serverAddress$facepic_serverAddress = $("#CN1001_09_facepic_serverAddress").val();
    SaveCommand(JsonData);
}

function SendDownfaceinfo() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "downfaceinfo";
    var data = []
    var params = {}
    params.name = $("#CN1001_09_name").val();
    params.subjecttype = $("#CN1001_09_subjecttype input[name='subjecttype']:checked").val();
    params.gender = $("#CN1001_09_gender input[name='gender']:checked").val();
    params.starttime = $("#CN1001_09_starttime").val();
    params.endtime = $("#CN1001_09_endtime").val();
    params.email = $("#CN1001_09_email").val();
    params.phone = $("#CN1001_09_phone").val();
    params.avatar_clientAddress = $("#CN1001_09_avatar_clientAddress").val();
    params.avatar_serverAddress = $("#CN1001_09_avatar_serverAddress").val();
    params.department = $("#CN1001_09_department").val();
    params.title = $("#CN1001_09_title").val();
    params.description = $("#CN1001_09_description").val();
    params.interviewee = $("#CN1001_09_interviewee").val();
    params.comefrom = $("#CN1001_09_comefrom").val();
    params.jobnumber = $("#CN1001_09_jobnumber").val();
    params.remark = $("#CN1001_09_remark").val();
    params.facepic_clientAddress = $("#CN1001_09_facepic_clientAddress").val();
    params.facepic_serverAddress = $("#CN1001_09_facepic_serverAddress").val();
    data.push(params);
    JsonData.data = data;
    sendCommand(JsonData);
}

//保存更新人脸信息
function SaveUpdatefaceinfo() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "updatefaceinfo";
    JsonData.CN1001_10_faceid$faceid = $("#CN1001_10_faceid").val();
    JsonData.CN1001_10_name$name = $("#CN1001_10_name").val();
    JsonData.CN1001_10_subjecttype_radio$subjecttype = $("#CN1001_10_subjecttype > label.active input:eq(0)").val();
    JsonData.CN1001_10_gender_radio$gender = $("#CN1001_10_gender > label.active input:eq(0)").val();
    JsonData.CN1001_10_starttime$starttime = $("#CN1001_10_starttime").val();
    JsonData.CN1001_10_endtime$endtime = $("#CN1001_10_endtime").val();
    JsonData.CN1001_10_email$email = $("#CN1001_10_email").val();
    JsonData.CN1001_10_phone$phone = $("#CN1001_10_phone").val();
    JsonData.CN1001_10_avatar_clientAddress$avatar_clientAddress = $("#CN1001_10_avatar_clientAddress").val();
    JsonData.CN1001_10_avatar_serverAddress$avatar_serverAddress = $("#CN1001_10_avatar_serverAddress").val();
    JsonData.CN1001_10_department$department = $("#CN1001_10_department").val();
    JsonData.CN1001_10_title$title = $("#CN1001_10_title").val();
    JsonData.CN1001_10_description$description = $("#CN1001_10_description").val();
    JsonData.CN1001_10_interviewee$interviewee = $("#CN1001_10_interviewee").val();
    JsonData.CN1001_10_comefrom$comefrom = $("#CN1001_10_comefrom").val();
    JsonData.CN1001_10_jobnumber$jobnumber = $("#CN1001_10_jobnumber").val();
    JsonData.CN1001_10_remark$remark = $("#CN1001_10_remark").val();
    JsonData.CN1001_10_facepic_clientAddress$facepic_clientAddress = $("#CN1001_10_facepic_clientAddress").val();
    JsonData.CN1001_10_facepic_serverAddress$facepic_serverAddress = $("#CN1001_10_facepic_serverAddress").val();
    SaveCommand(JsonData);
}

function SendUpdatefaceinfo() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "updatefaceinfo";
    var data = []
    var params = {}
    params.faceid = $("#CN1001_10_faceid").val();
    params.name = $("#CN1001_10_name").val();
    params.subjecttype = $("#CN1001_10_subjecttype > label.active input:eq(0)").val();
    params.gender = $("#CN1001_10_gender > label.active input:eq(0)").val();
    params.starttime = $("#CN1001_10_starttime").val();
    params.endtime = $("#CN1001_10_endtime").val();
    params.email = $("#CN1001_10_email").val();
    params.phone = $("#CN1001_10_phone").val();
    params.avatar_clientAddress = $("#CN1001_10_avatar_clientAddress").val();
    params.avatar_serverAddress = $("#CN1001_10_avatar_serverAddress").val();
    params.department = $("#CN1001_10_department").val();
    params.title = $("#CN1001_10_title").val();
    params.description = $("#CN1001_10_description").val();
    params.interviewee = $("#CN1001_10_interviewee").val();
    params.comefrom = $("#CN1001_10_comefrom").val();
    params.jobnumber = $("#CN1001_10_jobnumber").val();
    params.remark = $("#CN1001_10_remark").val();
    params.facepic_clientAddress = $("#CN1001_10_facepic_clientAddress").val();
    params.facepic_serverAddress = $("#CN1001_10_facepic_serverAddress").val();
    data.push(params);
    JsonData.data = data;
    sendCommand(JsonData);
}

//下发开门指令
function SendOpenDoornum() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "opendoor";
    var data = [];
    var params = {};
    data.push(params);
    JsonData.data = data;
    sendCommand(JsonData);
}

//保存通道参数
function SavePassinfo() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "setpassinfo";
    JsonData.CN1002_02_doorno_select2$doorno = $('#CN1002_02_doorno').val();
    JsonData.CN1002_02_doorno_select2$timegroup = $('#CN1002_02_timegroup').val();
    JsonData.CN1002_02_doorflag_radio$doorflag = $("#CN1002_02_doorflag > label.active > input:eq(0)").val();
    JsonData.CN1002_02_opendoortimeout$opendoortimeout = $('#CN1002_02_opendoortimeout').val();
    JsonData.CN1002_02_isfirstcard_radio$isfirstcard = $("#CN1002_02_isfirstcard > label.active > input:eq(0)").val();
    JsonData.CN1002_02_firstcardtime$firstcardtime = $('#CN1002_02_firstcardtime').val();
    JsonData.CN1002_02_ismulticard_radio$ismulticard = $("#CN1002_02_ismulticard > label.active > input:eq(0)").val();
    JsonData.CN1002_02_multicardnum$multicardnum = $('#CN1002_02_multicardnum').val();
    JsonData.CN1002_02_multicardtime$multicardtime = $('#CN1002_02_multicardtime').val();
    JsonData.CN1002_02_opendoormode_radio$opendoormode = $("#CN1002_02_opendoormode > label.active > input:eq(0)").val();
    JsonData.CN1002_02_certificatetype_select2$certificatetype = $('#CN1002_02_certificatetype').val();
    SaveCommand(JsonData);
}

//下发通道参数
function SendPassinfo() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "setpassinfo";
    var data = []
    var params = {};
    params.doorno = $("#CN1002_02_doorno").val();
    //是否启用开门
    params.doorflag = $("#CN1002_02_doorflag > label.active > input:eq(0)").val();
    //开门时间
    params.opendoortimeout = $('#CN1002_02_opendoortimeout').val();
    //是否首卡
    params.isfirstcard = $("#CN1002_02_isfirstcard > label.active > input:eq(0)").val();
    //首卡时长
    params.firstcardtime = $('#CN1002_02_firstcardtime').val();
    //是否多卡
    params.ismulticard = $("#CN1002_02_ismulticard > label.active > input:eq(0)").val();
    //多卡人数
    params.multicardnum = $('#CN1002_02_multicardnum').val();
    //多卡时长
    params.multicardtime = $('#CN1002_02_multicardtime').val();
    //开门模式
    params.opendoormode = $("#CN1002_02_opendoormode > label.active > input:eq(0)").val();
    //凭证类型
    params.certificatetype = $('#CN1002_02_certificatetype').val();
    //时间组编号
    params.timegroup = $("#CN1002_02_timegroup").val();
    data.push(params);
    JsonData.data = data;
    sendCommand(JsonData);
}

function commandChangeIPaddress() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "changedevip";
    var data = []
    var params = {}
    params.CN1001_01_ipaddress = $("#CN1001_01_ipaddress").val();
    params.CN1001_01_maskaddress = $("#CN1001_01_maskaddress").val();
    params.CN1001_01_gateway = $("#CN1001_01_gateway").val();
    data.push(params);
    JsonData.data = data;
    sendCommand(JsonData);
}

function commandCreatefacedev() {
    var selected = $('#tree').treeview('getSelected');
    var parentNode = $('#tree').treeview('getParent', selected[0]);
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "createfacedev";
    var data = []
    var params = {}
    params.username = $("#CN1003_01_username").val();
    params.password = $("#CN1003_01_password").val();
    params.boxipaddress = $("#CN1003_01_boxipaddress").val();
    params.boxport = $("#CN1003_01_boxport").val();
    params.cameraipaddress = $("#CN1003_01_cameraipaddress").val();
    params.cameraport = $("#CN1003_01_cameraport").val();
    params.parentsn = parentNode.sn;
    data.push(params);
    JsonData.data = data;
    sendCommand(JsonData);
    SaveCreatefacedev();
}

function SaveCreatefacedev() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "createfacedev";
    JsonData.CN1003_01_username$username = $('#CN1003_01_username').val();
    JsonData.CN1003_01_password$password = $("#CN1003_01_password").val();
    JsonData.CN1003_01_boxipaddress$boxipaddress = $("#CN1003_01_boxipaddress").val();
    JsonData.CN1003_01_boxport$boxport = $("#CN1003_01_boxport").val();
    JsonData.CN1003_01_cameraipaddress$cameraipaddress = $("#CN1003_01_cameraipaddress").val();
    JsonData.CN1003_01_cameraport$cameraport = $("#CN1003_01_cameraport").val();
    SaveCommand(JsonData);
}

/*
*下发LED信息
 */
function commandShowLed() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.activeCode = "led";
    JsonData.sn = selected[0].sn;
    var data = [];
    var params = {};
    params.type = $("#CN1004_01_type input[name=type]:checked").val();
    params.lednum = $("#CN1004_01_lednum").val();
    params.dptimes = $("#CN1004_01_dptimes").val();
    params.duration = $("#CN1004_01_duration").val();
    params.ledstring = $("#CN1004_01_ledstring").val();
    data.push(params);
    JsonData.data = data;
    sendCommand(JsonData);
}

function commandPlaySound() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.activeCode = "playsound";
    JsonData.sn = selected[0].sn;
    var data = [];
    var params = {};
    params.soundstring = $("#CN1005_01_soundstring").val();
    data.push(params);
    JsonData.data = data;
    sendCommand(JsonData);
}

function commandSoundVolumn() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.activeCode = "soundvolumn";
    JsonData.sn = selected[0].sn;
    var data = [];
    var params = {};
    params.volumn = $("#CN1005_01_volumn").val();
    data.push(params);
    JsonData.data = data;
    sendCommand(JsonData);
}

function sendCommand(JsonData) {
    $.ajax({
        datetype: "json",
        async: false,
        data: {"JsonData": JSON.stringify(JsonData)},
        url: "/device/sendCommand",
        success: function (result) {
            var result = JSON.parse(result);
            modals.info(result.msg);
        },
        error: function (result) {
        }
    });
}

function SaveCommand(JsonData) {
    $.ajax({
        datetype: "json",
        async: false,
        data: {"JsonData": "[" + JSON.stringify(JsonData) + "]"},
        url: "/device/devParamsSet",
        success: function (result) {
            var result = JSON.parse(result);
            modals.info(result.msg);
        },
        error: function (result) {
        }
    });
}


$("#CN1001_09_avatar").fileinput({
    theme: "zh",
    uploadUrl: "/paramset/upload",
    type: 'POST',
    enctype: 'multipart/form-data',
    showPreview: false,
    isAjaxUpload: true,
    maxFileCount: 1,
    browseClass: "btn btn-success",
    allowedFileExtensions: ["jpg", "jpeg", "gif", "png"],
    elErrorContainer: "#09_avatar_errorBlock",
    showCancel: false,
    showUpload: false,
    showRemove: false,
    uploadExtraData: {folder: "avatar"}
});
$("#CN1001_09_avatar").on('fileselect', function (event, numFiles, label) {
    $("#CN1001_09_avatar").fileinput('upload');
});
$("#CN1001_09_avatar").on('fileuploaded', function (event, data, previewId, index) {
    $("#CN1001_09_avatar").fileinput({
        uploadExtraData: {folder: "avatar", filename: ""}
    })
    var serveraddress = data.response.serveraddress;
    var substr = serveraddress.substr(serveraddress.indexOf("uploadfile") - 1);
    $("#CN1001_09_avatar_clientAddress").val(data.response.clientaddress);
    $("#CN1001_09_avatar_serverAddress").val(substr);
    console.log('File uploaded triggered');
});
$("#CN1001_09_facepic").fileinput({
    theme: "zh",
    uploadUrl: "/paramset/upload",
    type: 'POST',
    enctype: 'multipart/form-data',
    showPreview: false,
    isAjaxUpload: true,
    maxFileCount: 1,
    browseClass: "btn btn-success",
    allowedFileExtensions: ["jpg", "jpeg", "gif", "png"],
    elErrorContainer: "#09_facepic_errorBlock",
    showCancel: false,
    showUpload: false,
    showRemove: false,
    uploadExtraData: {folder: "facepic"}
});
$("#CN1001_09_facepic").on('fileselect', function (event, numFiles, label) {
    $("#CN1001_09_facepic").fileinput('upload');
});
$("#CN1001_09_facepic").on('fileuploaded', function (event, data, previewId, index) {
    $("#CN1001_09_facepic").fileinput({
        uploadExtraData: {folder: "facepic", filename: ""}
    });
    var serveraddress = data.response.serveraddress;
    var substr = serveraddress.substr(serveraddress.indexOf("uploadfile") - 1);
    $("#CN1001_09_facepic_clientAddress").val(data.response.clientaddress);
    $("#CN1001_09_facepic_serverAddress").val(substr);
    console.log('File uploaded triggered');
});
$("#CN1001_10_avatar").fileinput({
    theme: "zh",
    uploadUrl: "/paramset/upload",
    type: 'POST',
    enctype: 'multipart/form-data',
    showPreview: false,
    isAjaxUpload: true,
    maxFileCount: 1,
    browseClass: "btn btn-success",
    allowedFileExtensions: ["jpg", "jpeg", "gif", "png"],
    elErrorContainer: "#10_avatar_errorBlock",
    showCancel: false,
    showUpload: false,
    showRemove: false,
    uploadExtraData: {folder: "avatar"}
});
$("#CN1001_10_avatar").on('fileselect', function (event, numFiles, label) {
    $("#CN1001_10_avatar").fileinput('upload');
});
$("#CN1001_10_avatar").on('fileuploaded', function (event, data, previewId, index) {
    $("#CN1001_10_avatar").fileinput({
        uploadExtraData: {folder: "avatar", filename: ""}
    })
    var serveraddress = data.response.serveraddress;
    var substr = serveraddress.substr(serveraddress.indexOf("uploadfile") - 1);
    $("#CN1001_10_avatar_clientAddress").val(data.response.clientaddress);
    $("#CN1001_10_avatar_serverAddress").val(substr);
    console.log('File uploaded triggered');
});
$("#CN1001_10_facepic").fileinput({
    theme: "zh",
    uploadUrl: "/paramset/upload",
    type: 'POST',
    enctype: 'multipart/form-data',
    showPreview: false,
    isAjaxUpload: true,
    maxFileCount: 1,
    browseClass: "btn btn-success",
    allowedFileExtensions: ["jpg", "jpeg", "gif", "png"],
    elErrorContainer: "#10_facepic_errorBlock",
    showCancel: false,
    showUpload: false,
    showRemove: false,
    uploadExtraData: {folder: "facepic"}
});
$("#CN1001_10_facepic").on('fileselect', function (event, numFiles, label) {
    $("#CN1001_10_facepic").fileinput('upload');
});
$("#CN1001_10_facepic").on('fileuploaded', function (event, data, previewId, index) {
    $("#CN1001_10_facepic").fileinput({
        uploadExtraData: {folder: "facepic", filename: ""}
    })
    var serveraddress = data.response.serveraddress;
    var substr = serveraddress.substr(serveraddress.indexOf("uploadfile") - 1);
    $("#CN1001_10_facepic_clientAddress").val(data.response.clientaddress);
    $("#CN1001_10_facepic_serverAddress").val(substr);
    console.log('File uploaded triggered');
});

function initTree(selectNodeId) {
    var treeData = null;
    $.ajax({
        datetype: "json",
        async: false,
        data: {},
        url: "/device/selectTreeByClientCode",
        success: function (data) {
            treeData = data;
        },
        error: function (data) {
        }
    });
    var tree = $("#tree").treeview({
        data: treeData,
        showBorder: true,
        expandIcon: "glyphicon glyphicon-plus",
        collapseIcon: "glyphicon glyphicon-minus",
        levels: 4,
        onNodeSelected: function (event, data) {
            clearForm();
            fillDictForm(data);
            formReadonly();
            if (data.code == undefined || data.code == "" || data.code == null) {
                $("#maintab li:eq(1)").hide();
            } else {
                $("#maintab li:eq(1)").show();
                $("#" + data.code).siblings().each(function (i) {
                    $(this).css({"display": "none"});
                })
                $("#" + data.code).css({"display": "block"});
                $("#" + data.code + " > div.tab-content >div").removeClass("active");
                $("#" + data.code + " > div.tab-content >div:eq(0)").addClass("active");
                $("#" + data.code + " > ul > li").removeClass("active");
                $("#" + data.code + " > ul > li:eq(0)").addClass("active");

                //doTreeNodeSelected();
            }

        },
        onNodeUnselected: function (event, data) {
            event.preventDefault();
            return false;
        }
    });
    if (treeData.length == 0)
        return;
    //默认选中第一个节点
    selectNodeId = selectNodeId || 0;
    $("#tree").data('treeview').selectNode(selectNodeId);
    if (selectNodeId == 0) {
        $('#tree').treeview('collapseAll', {silent: true});
    } else {
        $("#tree").data('treeview').expandNode(selectNodeId);
        $("#tree").data('treeview').revealNode(selectNodeId);
    }
}

//树形控件初始化
function treeControlInit() {
    //按钮事件
    var btntype = null;
    $('button[data-btn-type]').click(function () {
        var action = $(this).attr('data-btn-type');
        var selectedArr = $("#tree").data("treeview").getSelected();
        var selectedNode = selectedArr.length > 0 ? selectedArr[0] : null;
        switch (action) {
            case 'addRoot':
                var pnode = $('#tree').data('treeview').getParent(selectedNode.nodeId);
                if (!pnode) {
                    modals.info("该节点不允许添加根目录");
                    return false;
                }
                clearForm();
                formWritable(action);
                if (pnode) {
                    $("#hdPid").val(pnode.id);
                } else {
                    $("#hdPid").val(1);
                }
                $("#parentname").val(pnode.text);
                btntype = 'add';
                break;
            case 'add':
                if (!selectedNode) {
                    modals.info('请先选择上级菜单');
                    return false;
                }
                clearForm();
                formWritable(action);

                var pnode = $('#tree').data('treeview').getParent(selectedNode.nodeId);
                if (pnode) {
                    $("#hdPid").val(selectedNode.id);
                } else {
                    $("#hdPid").val(1);
                }
                $("#parentname").val(selectedNode.text);
                btntype = 'add';
                break;
            case 'edit':
                if (!selectedNode) {
                    modals.info('请先选择要编辑的节点');
                    return false;
                }
                if (btntype == 'add') {
                    fillDictForm(selectedNode);
                }
                formWritable(action);
                btntype = 'edit';
                break;
            case 'delete':
                if (!selectedNode) {
                    modals.info('请先选择要删除的节点');
                    return false;
                }
                if (btntype == 'add')
                    fillDictForm(selectedNode);
                formReadonly();
                $(".box-header button[data-btn-type='delete']").removeClass("btn-default").addClass("btn-primary");
                if (selectedNode.nodes) {
                    modals.info('该节点含有子节点，请先删除子节点');
                    return false;
                }

                modals.confirm('是否删除该节点', function () {
                    var JsonData = {}
                    JsonData.guid = "'" + selectedNode.guid + "'";
                    $.ajax({
                        datetype: "json",
                        async: false,
                        url: "../device/delinfo",
                        data: {"JsonData": JSON.stringify(JsonData)},
                        success: function (data) {
                            var rst = JSON.parse(data);
                            if (rst.result) {
                                modals.correct('删除成功');
                            } else {
                                modals.info(rst.msg);
                            }
                            //定位
                            var brothers = $("#tree").data("treeview").getSiblings(selectedNode);
                            if (brothers.length > 0)
                                initTree(brothers[brothers.length - 1].nodeId);
                            else {
                                var parent = $("#tree").data("treeview").getParent(selectedNode);
                                initTree(parent ? parent.nodeId : 0);
                            }
                        },
                        error: function (result) {
                            modals.info("删除失败");
                        }
                    });
                });
                break;
            case 'cancel':
                if (btntype == 'add')
                    fillDictForm(selectedNode);
                formReadonly();
                break;
            case 'selectIcon':
                var disabled = $(this).hasClass("disabled");
                if (disabled)
                    break;
                var iconName;
                if ($("#icon").val())
                    iconName = encodeURIComponent($("#icon").val());
                modals.openWin({
                    winId: winId,
                    title: '图标选择器（双击选择）',
                    width: '1000px',
                    height: '100%',
                    overflow: 'scroll',
                    url: "/select/icon"
                });
                break;
        }
    });
    $("#btnSaveDevInfo").click(function () {
        saveDevInfo();
    });
    initType();

    $("#ddlSingle").select2({
        data: [{id: 1, text: '根节点'}, {id: 0, text: '叶子节点'}],
        placeholder: '根节点',
        allowClear: false
    });
}

//设备信息保存
function saveDevInfo() {
    modals.confirm('确定保存？', function () {
        var model = new Object();
        model.guid = $("#hdGuid").val();
        model.devicename = $("#txtDeviceName").val();
        //model.devicecode = $("#txtDeviceCode").val();
        model.ipaddress = $("#txtIPAddress").val();
        model.devicetopic = $("#txtdeviceTopic").val();
        model.single = $("#ddlSingle").val();
        model.deviceport = $("#txtDevicePort").val();
        model.sn = $("#txtSn").val();
        model.devicetypecode = $("#ddldevType").val();
        model.orgcode = $("#ddlCompany").val();
        model.parentid = $("#hdPid").val();
        var data = JSON.stringify(model);
        $.ajax({
            dateType: "json",
            async: false,
            type: "POST",
            url: "/device/createinfo",
            data: {"JsonData": data},
            success: function (data) {
                var selectedArr = $("#tree").data("treeview").getSelected();
                var selectedNodeId = selectedArr.length > 0 ? selectedArr[0].nodeId : 0;
                initTree(selectedNodeId);
            },
            error: function (data) {
            }
        });
    });
}

//设备类型下拉框初始化
function initType() {
    $.ajax({
        datetype: "json",
        async: false,
        url: "/device/devtype",
        success: function (result) {
            var result = JSON.parse(result);
            $("#ddldevType").select2({
                data: JSON.parse(result.data),
                allowClear: false
            });
            $("#ddldevType").val("").trigger("change");
        },
        error: function (msg) {
        }
    });
}

//初始化凭证类型
function initCertificateType() {
    $.ajax({
        url: "/baseMenu/selectDictByPK/107",
        type: "get",
        dataType: "json",
        data: "data",
        success: function (data) {
            $("#CN1002_02_certificatetype").select2({
                data: data,
                placeholder: "- - 凭证类型 - -",
                allowClear: false
            });
        },
        error: function (data) {
            modals.info("加载失败");
        }
    });
}

//初始门号
function initDoorNo() {
    var data = [{id: 1, "text": "一号门"}, {id: 2, "text": "二号门"}, {id: 3, "text": "三号门"}, {id: 4, "text": "四号门"}];
    $("#CN1002_02_doorno").select2({
        data: data,
        placeholder: "- - 凭证类型 - -",
        allowClear: false
    });
}

//初始门号
function initTimeGroup() {
    var data = [{id: 0, "text": "不限制"}, {id: 1, "text": "第一组"}, {id: 2, "text": "第二组"}, {id: 3, "text": "第三组"}, {
        id: 4,
        "text": "第四组"
    }, {id: 5, "text": "第五组"}, {id: 6, "text": "第六组"}, {id: 7, "text": "第七组"}];
    $("#CN1002_02_timegroup").select2({
        data: data,
        placeholder: "- - 时间组编号 - -",
        allowClear: false
    });
}


//填充form
function fillDictForm(node) {
    if (node && node.guid) {
        $.ajax({
            dateType: "json",
            async: false,
            type: "GET",
            url: "/device/getDevice/" + node.guid,
            success: function (data) {
                var dt = JSON.parse(JSON.parse(data).data);
                if (dt == null) return false;
                $("#txtDeviceName").val(dt.devicename);
                if (!dt.single) {
                    var p = $('#tree').treeview('getParent', node.nodeId);
                    $("#parentname").val(p.text);
                }
                $("#hdPid").val(dt.parentid);
                $("#txtIPAddress").val(dt.ipaddress);
                $("#txtdeviceTopic").val(dt.devicetopic);
                $("#ddlSingle").val(dt.single).trigger("change");
                $("#txtDevicePort").val(dt.deviceport);
                $("#txtSn").val(dt.sn);
                $("#ddldevType").val(dt.devicetypecode).trigger("change");
                $("#hdGuid").val(dt.guid);
                $("#ddlSingle").val(dt.single ? 1 : 0).trigger("change");
            },
            error: function (data) {
            }
        });
    }
}

//设置form为只读
function formReadonly() {
    //所有文本框只读
    $("#function-form input[name],textarea[name]").attr("readonly", "readonly");
    //隐藏取消、保存按钮
    $("#funcFooter").hide();
    //还原新增、编辑、删除按钮样式
    $("#funcHeader button").removeClass("btn-primary").addClass("btn-default");
    //选择图标按钮只读
    $("#selectIcon").addClass("disabled");

}

function formWritable(action) {
    $("#function-form input[name],textarea[name]").removeAttr("readonly");
    $("#funcFooter").show();
    $("#funcHeader button").removeClass("btn-primary").addClass("btn-default");
    $("#selectIcon").removeClass("disabled");
    if (action)
        $("#funcHeader button[data-btn-type='" + action + "']").removeClass("btn-default").addClass("btn-primary");
}

//重置
function clearForm() {
    $("#formAll")[0].reset();
    $("#function-form input[type=text]").val("");
    $("#ddldevType").val("").trigger("change");
    $("#hdGuid").val("");

    delAllGroupRow();
    //$("#timeGroupDiv table:gt(0)").remove();

    $("#maintab li").removeClass("active");
    $("#maintab li:eq(0)").addClass("active");
    $("#control-sidebar-tab-main1").addClass("active");
    $("#control-sidebar-tab-main2").removeClass("active");
}