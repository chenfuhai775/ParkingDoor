$(function () {
    //时间组权限
    initCN1001_07();
    initHoliday();
});

//假日组权限集合
var powerArr = [];

//初始化假日组日期控件
function initHoliday() {
    for (var i = 0; i < 5; i++) {
        var opn = new Object();
        opn.id = i;
        if (i == 0)
            opn.text = "全开";
        else if (i == 4)
            opn.text = "全关";
        else
            opn.text = "时间段" + i;
        powerArr.push(opn);
    }
    $("select[name='CN1001_8_select']").select2({
        data: powerArr,
        placeholder: 0
    });
    ///假日组0
    laydate.render({
        elem: '#CN1001_08_0_laydate'
        , theme: 'grid'
        , calendar: true
        , done: function (value, date, endDate) {
            layDone(value, "#CN1001_08_0_HolidayPower");
            return;
        },
        ready: function (date) {
            layReady("#CN1001_08_0_HolidayPower");
            return false;
        }
    });
}

//时间组权限
function initCN1001_07() {
    $("#control-sidebar-tab1-7 input[CN100107DateTime]").each(function () {
        laydate.render({
            elem: this
            , type: 'time'
        });
    });
    $("#control-sidebar-tab1-7 input[CN100107Date]").each(function () {
        laydate.render({
            elem: this
        });
    });
}

//clone时间组
function addTimeGroupRow(row) {
    var cloneTable = $(row).closest("table").clone();
    $("#timeGroupDiv").append(cloneTable);
    $(row).closest("#tdBtn").html("");
    var lstb = $("#timeGroupDiv>table:last");

    $(lstb).find("#ddldiv span").remove();
    $(lstb).find("select").select2({
        data: powerArr,
        placeholder: '全开'
    });
    //修改lay-key的值，如有两个相同的lay-key时间控件弹出框闪退，循环绑定时间控件
    $(lstb).find("input.layui-input").each(function (index, input) {
        $(input).attr("lay-key", getGuid());
        if ($(input).attr("CN100107DateTime") == "") {
            laydate.render({
                elem: this
                , type: 'time'
            });
        }
        if ($(input).attr("CN100107Date") == "") {
            laydate.render({
                elem: this
            });
        }
    });

    var index = $("table[name=dategroup]").length - 1;
    $(lstb).find("tr:eq(0) td:eq(0)").html("第N组".replace("N", index + 2));
    var inputId = "CN1001_08_num_HolidayPower".replace("num", index);
    var chooeseId = "CN1001_08_num_laydate".replace("num", index);
    $(lstb).find("input[name='CN1001_8_input']").attr("id", inputId).val("");
    $(lstb).find("input[name='CN1001_8_selectDate']").attr("id", chooeseId).val("");
    $(lstb).find("input[lay-key]:eq(0)").attr("lay-key", getGuid());
    initHolidayInput(chooeseId, inputId);


    setgroupControl(lstb);

}

//假日组的时间控件绑定
function initHolidayInput(chooese_id, text_id) {
    laydate.render({
        elem: "#" + chooese_id
        , theme: "grid"
        , calendar: true
        , done: function (value, date, endDate) {
            layDone(value, "#" + text_id);
            return;
        },
        ready: function (date) {
            layReady("#" + text_id);
            return;
        }
    });
}

//设置clone后的数据
function setgroupControl(table) {
    $(table).find("tr:first td:eq(0)").html("第N组".replace("N", $("#timeGroupDiv table").length - 1));
    $(table).find("div[name='CN1001_07_monthday']").html(checkBoxBuilder());
    $(table).find("div[name='CN1001_07_weekday']").html(weekList());

    $(table).find("div[name='CN1001_07_weekday']").show();
    $(table).find("div[name='CN1001_07_monthday']").show();

    $(table).find("div[name='CN1001_07_isweek'] label").removeClass("active");
    $(table).find("div[name='CN1001_07_isweek'] label:eq(0)").addClass("active");

    $(table).find("div[name='CN1001_07_ismonth'] label").removeClass("active");
    $(table).find("div[name='CN1001_07_ismonth'] label:eq(0)").addClass("active");
    $(table).find('input[type="checkbox"].square').iCheck({
        checkboxClass: 'icheckbox_square-grey'
    });

    $(table).find("input[type='text']").val("");

}

function changeGroup(object) {
    var radioval = $(object).find("input[type='radio']")[0].value;
    if (radioval == "1") {
        $(object).closest("tr").next("tr").find("div[name='CN1001_07_timegroupholiday']").hide();
        initWeekday(object);
    } else if (radioval == 2) {
        $(object).closest("tr").next("tr").find("div[name='CN1001_07_timegroupholiday']").hide();
        initMonthday(object);
    } else {
        $(object).closest("tr").next("tr").find("div[name='CN1001_07_timegroup']").empty();
        $(object).closest("tr").next("tr").find("div[name='CN1001_07_timegroupholiday']").show();
    }

    $('input[type="checkbox"].square').iCheck({
        checkboxClass: 'icheckbox_square-grey'
    });
    var ckball = $(object).closest("tr").next("tr").find("input[type=checkbox][name=all]");
    $(ckball).on("ifChecked", function () {
        $(this).closest("div[name='CN1001_07_timegroup']").find("input").iCheck("check");
    });
    $(ckball).on("ifUnchecked", function () {
        $(this).closest("div[name='CN1001_07_timegroup']").find("input").iCheck("uncheck");
    });
}

//删除时间组
function delTimeGroupRow(row) {
    if ($("#timeGroupDiv>table").length == 1) {
        modals.info("不能删除最后一行");
        return false;
    }
    var dt = $(row).closest("td").html();
    $(row).closest("table").remove();
    $("#timeGroupDiv>table:last").find("#tdBtn").html(dt);
}

//删除全部时间组
function delAllGroupRow() {
    var rows = $("#timeGroupDiv table #tdBtn");
    for (var i = rows.length - 1; i > 0; i--) {
        delTimeGroupRow(rows[i]);
    }
    var firtRow = $("#timeGroupDiv table:eq(0)");
    setgroupControl(firtRow);
}

//初始化月份的日期
function initMonthday(object) {
    $(object).closest("tr").next("tr").find("div[name='CN1001_07_timegroup']").html(checkBoxBuilder());
}

//初始化周
function initWeekday(object) {
    $(object).closest("tr").next("tr").find("div[name='CN1001_07_timegroup']").html(weekList());
}

//拼接 day checkbox
function checkBoxBuilder() {
    var monthcheckbox = "";
    for (var i = 0; i < 31; i++) {
        var dayNum = (i + 1) > 9 ? (i + 1) : "0" + (i + 1);
        monthcheckbox += "<input type=\"checkbox\" name=\"" + i + "\" class=\"square\">" + dayNum + "&nbsp;&nbsp;";
    }
    monthcheckbox += "<input type=\"checkbox\" name=\"all\"  class=\"square\" >全选&nbsp;";
    return monthcheckbox;
}

//拼接week checkbox
function weekList() {
    var weekArr = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"];
    var weekName = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var buildStr = "";
    $(weekArr).each(function (index, value) {
        buildStr += '<input type="checkbox" name="' + weekName[index] + '" class="square">' + value + '</input>';
    })
    buildStr += "<input type=\"checkbox\" name=\"all\"  class=\"square\" >全选&nbsp;";
    return buildStr;
}

//保存时间组权限！！！！！
function SaveDowntimepower() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "downtimepower";
    var arr = [];
    $("#control-sidebar-tab1-7 table[name=dategroup]").each(function (index, data) {
        var timegroup = new Object();
        timegroup.serialnum = index;
        timegroup.startdate = $(this).find("input[name='CN1001_07_stardate']")[0].value;
        timegroup.enddate = $(this).find("input[name='CN1001_07_enddate']")[0].value;
        timegroup.starttime1 = $(this).find("input[name='CN1001_07_starttime1']")[0].value;
        timegroup.endtime1 = $(this).find("input[name='CN1001_07_endtime1']")[0].value;
        timegroup.starttime2 = $(this).find("input[name='CN1001_07_starttime2']")[0].value;
        timegroup.endtime2 = $(this).find("input[name='CN1001_07_endtime2']")[0].value;
        timegroup.starttime3 = $(this).find("input[name='CN1001_07_starttime3']")[0].value;
        timegroup.endtime3 = $(this).find("input[name='CN1001_07_endtime3']")[0].value;
        timegroup.timetype = $(this).find("div[name='CN1001_07_isweek'] > label.active >input").val();
        var strDate = "";
        if (timegroup.timetype == 0) {
            timegroup.timegroup = $(this).find("select[name=CN1001_8_select]").val();
            timegroup.times = $(this).find("input[name=CN1001_8_input]").val();
        } else {
            $(this).find("div[name='CN1001_07_timegroup'] input[type='checkbox']").each(function () {
                if ($(this).attr("name") != "all")
                    strDate += $(this).prop("checked") ? "1" : "0";
            });
            timegroup.expression = strDate;
        }
        arr.push(timegroup);
    })
    JsonData.timegroup_json$data = arr;
    SaveCommand(JsonData);
}

function SendDowntimepower() {
    var selected = $('#tree').treeview('getSelected');
    if (0 == selected.length) {
        modals.info("请先选择设备!");
        return false;
    }
    var JsonData = {};
    JsonData.sn = selected[0].sn;
    JsonData.activeCode = "downtimepower";
    var arr = [];
    $("#control-sidebar-tab1-7 table[name=dategroup]").each(function (index, data) {
        var timegroup = new Object();
        timegroup.serialnum = index;
        timegroup.startdate = $(this).find("input[name='CN1001_07_stardate']")[0].value;
        timegroup.enddate = $(this).find("input[name='CN1001_07_enddate']")[0].value;
        timegroup.starttime1 = $(this).find("input[name='CN1001_07_starttime1']")[0].value;
        timegroup.endtime1 = $(this).find("input[name='CN1001_07_endtime1']")[0].value;
        timegroup.starttime2 = $(this).find("input[name='CN1001_07_starttime2']")[0].value;
        timegroup.endtime2 = $(this).find("input[name='CN1001_07_endtime2']")[0].value;
        timegroup.starttime3 = $(this).find("input[name='CN1001_07_starttime3']")[0].value;
        timegroup.endtime3 = $(this).find("input[name='CN1001_07_endtime3']")[0].value;
        timegroup.timetype = $(this).find("div[name='CN1001_07_isweek'] > label.active >input").val();
        var strDate = "";
        if (timegroup.timetype == 0) {
            timegroup.timegroup = $(this).find("select[name=CN1001_8_select]").val();
            timegroup.times = $(this).find("input[name=CN1001_8_input]").val();
        } else {
            $(this).find("div[name='CN1001_07_timegroup'] input[type='checkbox']").each(function () {
                if ($(this).attr("name") != "all")
                    strDate += $(this).prop("checked") ? "1" : "0";
            });
            timegroup.expression = strDate;
        }
        arr.push(timegroup);
    })
    JsonData.data = arr;
    sendCommand(JsonData);
    SaveDowntimepower();
}