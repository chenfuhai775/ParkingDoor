$(function () {
    var table = $("#roleAuthList").dataTable({
        "lengthChange": true,
        "searching": false,
        "ordering": true,
        "info": true,
        "lengthMenu": [10, 15],
        "autoWidth": false,
        "pageLength": 10,
        "pagingType": "full_numbers",
        "serverSide": true,
        "ajax": {
            "url": "/Role/selectList",
            "cache": false,  //禁用缓存
            "data": function (data) {
                return data;
            },
            "dataFilter": function (json) {//json是服务器端返回的数据
                json = JSON.parse(json);
                var returnData = {};
                returnData.draw = json.draw;
                returnData.recordsTotal = json.recordsTotal;//返回数据全部记录
                returnData.recordsFiltered = json.recordsTotal;//后台不实现过滤功能，每次查询均视作全部结果
                returnData.data = json.data;//返回的数据列表
                return JSON.stringify(returnData);//这几个参数都是datatable需要的，必须要
            }
        },
        "language": {
            "lengthMenu": "_MENU_ 条记录每页",
            "zeroRecords": "没有找到记录",
            "info": "当前 _START_ 条到 _END_ 条 共 _TOTAL_ 条 , 第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
            "infoEmpty": "无记录",
            "seach": "",
            "infoFiltered": "(从 _MAX_ 条记录过滤)",
            "paginate": {
                "previous": "上一页",
                "next": "下一页",
                "sFirst": "首页",
                "sLast": "末页"
            }
        },
        "dom": "<'row'<'col-xs-2'l><'#mytool.col-xs-8'><'col-xs-2'f>r>" +
            "t" +
            "<'row'<'col-xs-6'i><'col-xs-6'p>>",
        "initComplete": function () {
            $("#roleAuthList").find("tbody tr[role='row']").closest("tr").eq(0).css("color", "#FFFFFF");
            $("#roleAuthList").find("tbody tr[role='row']").closest("tr").eq(0).css("background-color", "#428bca");
        },
        "columns": [
            {
                "data": null, "orderable": false, "render":
                    function (row) {
                        return "<input type=\"checkbox\" id=\"" + row.guid + "\">"
                    }
            },
            {"data": "rolecode"},
            {"data": "rolename"},
            {
                "data": null, "render": function (row) {
                    return dateFtt("yyyy年MM月dd日", new Date(row.creatdate));
                }
            },
            {
                "data": "active", "render": function (row) {
                    return row ? "启用" : "禁用";
                }
            },
            {"data": "remark"}
        ],
        initComplete: function (settings, data) {
            var rolecode = data.data[0].rolecode;
            $("#searchDiv_roleFunc").prepend("<h5 id='roleName' class='pull-left'>【" + data.data[0].rolename + "】</h5>");
            selectTree(rolecode);
        }
    });

    $("#roleAuthList").delegate("tbody tr[role='row']", "click", function (row) {
        var table = $('#roleAuthList').DataTable();
        var tr = $(this).closest("tr");
        $("#roleAuthList").find("tbody tr[role='row']").closest("tr").css("color", "#000000");
        $("#roleAuthList").find("tbody tr[role='row']").closest("tr").css("background-color", "#FFFFFF");
        tr.css("color", "#FFFFFF");
        tr.css("background-color", "#428bca");
        if (undefined != row) {
            var tds = table.row($(this).closest('tr')).data();
        }
        $("#roleId").val(tds.rolecode);
        $("#roleName").remove();
        $("#searchDiv_roleFunc").prepend("<h5 id='roleName' class='pull-left'>【" + tds.rolename + "】</h5>");
        var rolecode = tds.rolecode;
        selectTree(rolecode);
    });

    //保存授权
    $("#btnSave").click(function () {
        var nodes = $("#Alltree").treeview("getChecked");
        var arr = [];
        if (nodes.length > 0) {
            var obj = null;
            $(nodes).each(function () {
                obj = {};
                obj.guid = getGuid();
                obj.rolecode = $("#roleId").val();
                obj.menuid = this.guid;
                obj.creator = "system";
                obj.creatdate = dateFtt("yyyy-MM-dd", new Date());
                arr.push(obj);
            })
        } else {
            modals.info("请选择一条记录");
            return false;
        }
        var data = {};
        data.rolecode = $("#roleId").val();
        data.roleAuths = arr;
        $.ajax({
            dataType: "json",
            async: false,
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(data),
            url: "/Role/insertAuth",
            success: function () {
                $("#grantModal").modal('hide');
                modals.info("授权成功");
                selectTree($("#roleId").val());
            },
            error: function (msg) {
                modals.info("授权失败" + msg);
            }
        });
    });
    initTree(0);
});

var grantmenu = null;

//显示已授权功能点
function selectTree(roleCode) {
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/json',
        async: false,
        url: "/Role/selectTree/" + roleCode,
        success: function (data) {
            grantmenu = data;
        },
        error: function (data) {
        }
    });
    $("#tree").treeview({
        data: grantmenu,
        showBorder: true,
        showCheckbox: false,
        showIcon: false,
        levels: 3
    });
}

//显示授权树列表
function authRoleFunc() {
    var rolecode = $("#roleId").val();
    if (rolecode == "" || rolecode == null) {
        modals.info("请选择一个角色");
        return false;
    }
    initTree(0);
    bandTree(rolecode);
    $("#grantModal").modal();
}

//初始化功能点树
function initTree(selectNodeId) {
    var treeData = null;
    $.ajax({
        datetype: "json",
        async: false,
        url: "/Role/selectAllTree",
        success: function (data) {
            treeData = data;
        },
        error: function (data) {
        }
    });
    $("#Alltree").treeview({
        data: treeData,
        showBorder: true,
        showCheckbox: true,
        showIcon: false,
        levels: 1,
        onNodeSelected: function (event, data) {
            if (data.state.checked) {
                setCheckedNodeMsg(data);
            }
        },
        onNodeChecked: function (event, data) {
            //选中所有子节点
            checkChildren(data, true);
            //点击同时选中
            $("#Alltree").data('treeview').selectNode(data.nodeId, {silent: true});
            //父节点选中
            checkParent(data, true);
        },
        onNodeUnchecked: function (event, data) {
            checkChildren(data, false);
            checkParent(data, false);
        }
    });
    if (treeData.length == 0)
        return;
    //默认选中第一个节点
    selectNodeId = selectNodeId || 0;
    $("#Alltree").data('treeview').selectNode(selectNodeId);
    $("#Alltree").data('treeview').expandNode(selectNodeId);
    $("#Alltree").data('treeview').revealNode(selectNodeId);
}

//绑定已授权节点
function bandTree() {
    $("#tree").treeview("uncheckAll");

    if (grantmenu) {
        checkNodes(grantmenu)
    }
    /*    $.ajax({
            dataType:"json",
            async:"false",
            url:"/Role/selectAuth",
            data:{"JsonData":rolecode},
            success:function (dt) {
                var arr = JSON.parse(JSON.parse(dt).data);
                if(arr.length>0) checkNodes(arr);
            }
        });*/
}

//父节点选中，子节点全部选中
function checkChildren(node, checked) {
    if (node.nodes && node.nodes.length > 0) {
        for (var i = 0; i < node.nodes.length; i++) {
            if (checked)
                $('#Alltree').treeview('checkNode', [node.nodes[i].nodeId, {silent: true}]);
            else
                $('#Alltree').treeview('uncheckNode', [node.nodes[i].nodeId, {silent: true}]);
            checkChildren(node.nodes[i], checked);
        }
    }
}

//子节点选中默认父节点选中
function checkParent(node, checked) {
    var pnode = $('#Alltree').data('treeview').getParent(node.nodeId);
    if (pnode) {
        if (checked) {
            $('#Alltree').treeview('checkNode', [pnode.nodeId, {silent: true}]);
            checkParent(pnode, checked);
        } else {
            //查看兄弟节点状态
            var brothers = $('#Alltree').data('treeview').getSiblings(node.nodeId);
            var flag = true;
            if (brothers && brothers.length > 0) {
                for (var i = 0; i < brothers.length; i++) {
                    if (brothers[i].state.checked) {
                        flag = false;
                    }
                }
            }
            if (flag) {
                $('#Alltree').treeview('uncheckNode', [pnode.nodeId, {silent: true}]);
                checkParent(pnode, checked);
            }
        }

    }
}

//设置选中的节点
function checkNodes(arr) {
    if (arr && arr.length > 0) {
        var nodes = $("#Alltree").data('treeview').findNodes();
        for (var i = 0; i < arr.length; i++) {
            $(nodes).each(function () {
                if (this.guid == arr[i].guid) {
                    $("#Alltree").data('treeview').checkNode(this, {silent: true});
                }
                checkchild(this, arr[i]);
            });
        }
    }
}

function checkchild(node, data) {
    var list = data.nodes;
    $(list).each(function () {
        if (node.guid == this.guid) {
            $("#Alltree").data('treeview').checkNode(node, {silent: true});
            return;
        }
    });
}

function deleteRoleFunc() {
    var node = $("#tree").treeview("getSelected");
    if ($("#roleId").val() == null || $("#roleId").val() == "") {
        modals.info("请选择一个角色");
    }
    if (node == "" || node == []) {
        modals.info("请选择一条记录");
        return false;
    }
    if ($(node)[0].nodes != null) {
        if ($(node)[0].nodes.length > 0) {
            modals.confirm("该目录为父级目录,是否移除此目录下的所有子目录", function () {
                var list = [];
                list.push(node[0].guid);
                for (var i = 0; i < $(node)[0].nodes.length; i++) {
                    list.push($(node)[0].nodes[i].guid);
                }
                var data = new Object();
                data.rolecode = $("#roleId").val();
                data.list = "'" + list.join("','") + "'";
                $.ajax({
                    dataType: "json",
                    async: false,
                    data: {"JsonData": JSON.stringify(data)},
                    url: "/Role/deleteMore",
                    success: function () {
                        modals.info("移除成功");
                        selectTree($("#roleId").val());
                    },
                    error: function () {
                        modals.info("移除失败");
                    }
                });
            });
        }
    } else {
        var menuid = $(node)[0].guid;
        if (menuid == null || menuid == "") {
            modals.info("请选择一条记录");
            return false;
        }
        var obj = {};
        obj.rolecode = $("#roleId").val();
        obj.menuid = menuid;
        $.ajax({
            dataType: "json",
            async: false,
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(obj),
            url: "/Role/deleteByMenuId/",
            success: function () {
                modals.info("移除成功");
                selectTree($("#roleId").val());
            },
            error: function () {
            }
        });
    }
}


