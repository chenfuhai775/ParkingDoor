<!DOCTYPE html>
<html lang="zh-CN" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>登录</title>
    <link href="./staticResource/login/css/login.css" rel='stylesheet'/>
</head>

<body>
<!-----start-main---->
<div class="login">
    <div class="message">物联网设备云平台</div>
    <div id="darkbannerwrap"></div>
    <form method="post" action="/loginAction">
        <input name="loginname" placeholder="用户名" required="" type="text">
        <hr class="hr15">
        <input name="password" placeholder="密码" required="" type="password">
        <hr class="hr15">
        <input value="登录" style="width:100%;" type="submit" onclick="Go()">
        <hr class="hr20">
        <p style="color: red">${message!}</p>
        <!-- 帮助 <a onClick="alert('请联系管理员')">忘记密码</a> -->
    </form>
</div>
<div class="copyright">© 2018 by 基础云</div>
</body>
</html>