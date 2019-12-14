$(function () {
    $.ajax({
        datetype: "json",
        async: false,
        url: "/Menu/List",
        data: {"JsonData": ""},
        success: function (result) {
            var result = JSON.parse(result);
            menuInit(result);
        },
        error: function (result) {
        }
    });


});

function menuInit(menuJson) {
    var parentDiv = $(".sidebar .sidebar-menu");
    Init(menuJson,parentDiv);
    //$(".sidebar-menu li:first ul li:first a").click();
}
function Init(menuJson,parentDiv) {
    var menu = null;
    var html = null;
    var chidLen = null;
    var child = null;
    for (var i = 0; i < menuJson.length; i++) {
        menu = menuJson[i];
        html = $(' <li menu-id="' + i + '" class="treeview"><li>');
        parentDiv.append(html);  //fa fa-server
        html = $(' <a href="' + menu.controller + '"> <i class="'+menu.icon+'"></i> <span>' + menu.name + '</span> <span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i> </span> </a> <ul menuUl-id="' + i + '" class="treeview-menu"> </ul>');
        $('[menu-id="' + i + '"]').append(html);
        if(menu.child == undefined)continue;
        chidLen = menu.child.length;
        for (var j = 0; j < chidLen; j++) {
            child = menu.child[j];
            if (i == 0 && j == 0) {
                html = $('<li class=""><a href="' + child.controller + '" data-url="' + child.controller + '"><i class="'+child.icon+'"></i> ' + child.name + '</a></li>');
            } else {
                html = $('<li class=""><a href="' + child.controller + '" data-url="' + child.controller + '"><i class="'+child.icon+'"></i> ' + child.name + '</a></li>');
            }
            $('[menuUl-id="' + i + '"]').append(html);
        }
    }

   //设置选中菜单
     var currentPathName = window.location.pathname;
     $(".sidebar-menu >li.treeview").removeClass("menu-open");
     $(".sidebar-menu >ul.treeview-menu li").removeClass("active");
     $(".sidebar-menu >li.treeview>ul").css("display","none");
     var atg = $(".sidebar .sidebar-menu a[data-url='"+currentPathName+"']")[0];
     $(atg).closest("li.treeview").addClass("menu-open active")
     $(atg).closest("li").addClass("active");
     $(atg).closest("ul").css("display","block");
     // $("li[menu-id].treeview").mouseover(function () {
     //     $(this).addClass("active");
     // });
     // $("li[menu-id].treeview").mouseout(function(){
     //     if($(this).find("ul[menuul-id] >li.active").length == 0){
     //         $(this).removeClass("active");
     //     }
     // });
}

$("#existSytem").click(function () {
   /* modals.confirm("是否退出系统",function () {

    });*/
    window.location.href ="/loginOut";
});


