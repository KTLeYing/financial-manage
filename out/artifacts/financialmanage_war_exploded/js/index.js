//开启jquery学习之旅

//在文档加载（就绪）之后运行下面这些jquery代码
//即在 DOM 加载完成后才可以对 DOM 进行操作。
$(document).ready(function(){
	//开始jquery代码
	
	//1、登录框的事件
	//loginbtn按钮添加点击事件  --验证非空
	$("#loginbtn").click(function(){//验证 用户名或者密码是否为空
		var username=$("#username").val();//表单值
		var password=$("#password").val();
		var checkCode=$("#checkCode").val();
		if (username == null || username== ""  || password == null || password== "") {
			$("#msgLabel").text("用户名或者密码不能为空");
	        //alert("用户名或者密码不能为空...");
	        return false;
	    }else {
			if (checkCode == null || checkCode == ""){
				$("#msgLabel").text("验证码不能为空");
				return false; //不能提交表单
			}else {
				return true;  //能提交表单
			}
		}
	});
	
	//2、忘记密码框的相关事件
	//【1】用户名  失去焦点时，进行用户名是否存在的判断  （1）存在，什么都不做  （2）不存在，提示"用户名不存在"，清空输入框
	$("#form2-username").blur(function(){
		var username=$("#form2-username").val();
		if(username==null||username==""){
			$("#forgetmsg").text("用户名不能为空");
			//return true;
		}
		else{//用户名不为空时，进行上述的判定 --通过ajax进行实现
			
			$.ajax({
				//请求资源路径
				url:"/" + window.document.location.pathname.split("/")[1] + "/user/findUserByNameAndAjax.action",
				async:true,
				//规定请求的类型（GET 或 POST）
				type:"post",
				//规定要发送到服务器的数据（json格式）
				//js格式的数据     {a:"b"   ,  a2:"b2" }
				//json格式的数据{"a":"b" , "a2":"b2"}
//				data:JSON.stringify({"username":$(this).val()}),
				data:JSON.stringify({"username":$(this).val()}),
				//发送数据到服务器时所使用的内容类型
				contentType:"application/json;charset=utf-8",
				dataType:"json",//返回时的数据类型json
				//当请求成功时运行的函数
				success:function(data){
					//alert(data.name);
					//返回的data是 exit 或者 notexit
					if(data.name=="notexit"){//用户不存在
						$("#forgetmsg").text("当前用户不存在，请重新输入");
						$("#form2-username").val("");//清空值
						$("#form2-username").focus();
					}
					else{
						$("#forgetmsg").text("");
					}
				},
				//当请求失败时运行的函数
				error:function(data){
					$("#forgetmsg").text("失败");
				}
			
			});
			//$("#forgetmsg").val("用户名不存在，请重新输入");
		}
	});
	
	//【2】新密码框获取焦点时的事件
	$("#form2-password").focus(function(){
		var username=$("#form2-username").val();
		if(username==null||username==""){
			$("#forgetmsg").text("用户名不能为空");
			$("#form2-username").focus();
		}
	});
	//【3】新密码框失去焦点时的事件
	$("#form2-password").blur(function(){
		// alert("33");
		var password=$("#form2-password").val();
		if(password==null||password==""){
			$("#forgetmsg").text("新密码不能为空");
			$("#form2-password").focus();
		}else{
			$("#forgetmsg").text("");//清空
		}
	});
	
	//【4】确认密码框失去焦点时的事件
	$("#form2-repassword").blur(function(){
		// alert("ww");
		var password=$("#form2-password").val();
		var repassword=$("#form2-repassword").val();
		if(repassword==null||repassword==""){
			$("#forgetmsg").text("确认密码不能为空");
			$("#form2-repassword").focus();
		}
		else{
			if(password!=repassword){
				$("#forgetmsg").text("两次输入密码不一致，请重新输入新密码");
				$("#form2-password").val("");
				$("#form2-repassword").val("");
			}
		}
	});

	//手机号框失去焦点时的事件
	$("#phone").blur(function(){
		// alert("kk");
		var phone = $("#phone").val();
		var regExp =/^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
		if(phone==null||phone==""){
			$("#forgetmsg").text("手机号不能为空");
			$("#phone").focus();
		}else{
			if(!regExp.test(phone)){
				$("#forgetmsg").text("不是一个有效的手机号码，请修改phone");
				$("#phone").focus();
			} else{
				$("#forgetmsg").text("");//清空
			}
		}
	});

	//验证码框失去焦点时的事件
	$("#msgcode").blur(function(){
		// alert("gg");
		var msgCode = $("#msgcode").val();
		if(msgCode==null||msgCode==""){
			$("#forgetmsg").text("验证码不能为空");
			$("#msgcode").focus();
		}else{
			$("#forgetmsg").text("");//清空
		}
	});

	//3、找回密码 的 关闭事件
	$(".myclosebtn").click(function(){//清空数据
		$("#forgetmsg").text("");
		$("#form2-username").val("");
		$("#form2-repassword").val("");
		$("#form2-password").val("");
		$("#form2-repassword").val("");
		$("#phone").val("");
		$("#msgcode").val("");
	});

	//发送手机验证码事件
	$("#msgcodebt").click(function () {
		var phone = $("#phone").val();
		if (phone == null || phone == ""){
			$("#forgetmsg").text("请先输入手机号");
		} else {
				//发送验证码
				var date = new Date().getTime();
				$.post( "/" + window.document.location.pathname.split("/")[1] + "/sendMsg.action?date=" + date, {phone: phone}, function (data) {
					console.info("kkk");
					alert("发送成功");
					// $("#msgcodebt").val("重新发送");
					setTime($("#msgcodebt"));
					console.info("jjj");

					// $("#disappare").show().delay(3000).hide(300);
				}, "text");
			}
	});

	//60s倒计时实现逻辑
	var countdown = 60;
	function setTime(obj) {
		console.info("jjj");
		if (countdown == 0) {
			console.info("uuu");
			obj.prop('disabled', false);
			obj.val("获取验证码");
			countdown = 60;//60秒过后button上的文字初始化,计时器初始化;
			return;
		} else {
			console.info("ttt");
			obj.prop('disabled', true);
			obj.val("(" + countdown + "s)后重新发送") ;
			countdown--;
		}
		setTimeout(function() { setTime(obj) },1000) //每1000毫秒执行一次
	}
	
	//4、找回密码的按钮提交事件
	$("#changePasswordbtn").click(function(){
		var label=$("#forgetmsg").text();//消息提示框内容为空
		var phone=$("#phone").val();//最后一个输入框phone的判断  是否为空，极为重要
		var username=$("#form2-username").val();
		var password=$("#form2-password").val();
		var repassword=$("#form2-repassword").val();
		var msgCode = $("#msgcode").val();
		if(label==""||label==null){
			if(phone!="" && phone!=null && username!=""&&username!=null && password!="" && password!=null &&
				repassword!="" && repassword!=null && msgCode!="" && msgCode!=null){
				return true;
			}else {
				$("#forgetmsg").text("请输入用户所有信息");
				return false;
			}
		}
		return false;//表单不提交
	});
	
});

/*
* jquery代码代替了  js代码

//验证 用户名或者密码是否为空
function validateForm() {
    var username = document.forms["myform"]["username"].value;
    var password = document.forms["myform"]["password"].value;
    console.log(username+"::需要输入名字");
    if (username == null || username== ""  || password == null || password== "") {
        alert("用户名或者密码不能为空");
        return false;
    }
}
*/