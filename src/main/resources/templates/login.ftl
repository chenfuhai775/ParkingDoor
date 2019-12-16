<!DOCTYPE html>
<html lang="zh-CN" xmlns:th="http://www.thymeleaf.org" xmlns:content-type="http://www.springframework.org/schema/beans">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content-type="application/json">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>登录</title>
    <link href="./staticResource/login/css/login.css" rel='stylesheet'/>
    <script src="staticResource/adminlte/plugins/jQuery/jquery-2.2.3.min.js"></script>
</head>

<body>
<!-----start-main---->
<div class="login">
    <div class="message">物联网设备云平台</div>
    <div id="darkbannerwrap"></div>

    <input id="loginname" placeholder="用户名" required="" type="text">
    <hr class="hr15">
    <input id="password" placeholder="密码" required="" type="password">
    <hr class="hr15">
    <input value="登录" style="width:100%;" type="submit" onclick="LoginIn()">
    <hr class="hr20">
    <p id="errmessage" style="color: red"></p>
    <!-- 帮助 <a onClick="alert('请联系管理员')">忘记密码</a> -->

</div>
<div class="copyright">© 2018 by 基础云</div>
</body>
<script language="JavaScript">
    function LoginIn() {
        var nullArray = ["", null, undefined];
        var JsonData = {};
        JsonData.username = $("#loginname").val();
        JsonData.password = $("#password").val();

        if (nullArray.includes(JsonData.username)) {
            $("#errmessage").text("用户名不能为空");
            return false;
        }
        if (nullArray.includes(JsonData.password)) {
            $("#errmessage").text("密码不能为空");
            return false;
        }
        $.ajax({
            dataType: "json",
            async: false,
            type: "POST",
            data: JSON.stringify(JsonData),
            contentType: 'application/json',
            url: "/Users/login",
            success: function (result) {
                if (0 == result.code) {
                    window.location = "./index";
                }else{
                    $("#errmessage").text(result.message);
                }
            }, error: function () {
                return false;
            }
        });
    }
</script>
</html>