$(function(){
    // 点击注册
    $('#gotoRegi').click(function(){
        // 显示注册页面
    $(".register").show();
        // 隐藏登录页面
    $(".login").hide();
    })
    //点击登录
    $('#gotoLogin').click(function(){
         //隐藏注册页面
    $(".register").hide();
         // 显示登录页面
    $(".login").show();
    })
// ========================== 添加自定义校验规则 ==========================
      let form=layui.form
      form.verify({
           // 数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
            // 注意：pass名字需要将其写到密码的输入框的lay-verify属性中
       pass:[/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],


    //    对两次密码是否相同验证
    // repwd 需要对谁做校验：需要对再次输入的密码框做校验

          repwd:function( value,item){
              // value：表单的值（再次输入密码框的值）、item：表单的DOM对象
     // 步骤
      // 1. 需要获取到注册表单中的密码框的值
      // 2. 将两次输入的密码进行比较,如果两次的密码不一致,就需要出现提示框
               let pwd=$(".register [name=password]").val(); 
            //    console.log(value);
            //    console.log(pwd); 
            //    判断两个密码是否相等
               if(value !== pwd){
                 return "好好输入，密码不一致"
               }

          }

      })

    // ========================== 注册表单功能 ==========================
let layer=layui.layer
    $('#regiForm').on('submit',function(e){
        // 1. 阻止表单的默认行为
        e.preventDefault();
    // 2. 获取到表单的数据
    let data=$(this).serialize();
    // console.log(data);
    // 3. 发送ajax实现注册功能
     $.ajax({
       type:'POST',
      //  url: " http://api-breakingnews-web.itheima.net/api/reguser",
      url: "/api/reguser",
       data,
       success: function (res){
          console.log(res);
        if (res.status!== 0){
            return layer.msg(res.message)
        }
        layer.msg('注册成功')
        // 4. 弹框提示注册如何, 注册成功之后，需要出发去登录的点击事件
        $("#gotoLogin").click();
       }
    })
    })

 // ========================== 注册登录功能 ==========================
$('#loginForm').on('submit',function(e){
// 1. 阻止表单的默认行为
e.preventDefault(); 
// 2. 获取到表单的数据
let data=$(this).serialize();
// 3. 发送ajax实现注册功能
$.ajax({
    type: "POST",
    // url: " http://api-breakingnews-web.itheima.net/api/login",
    url:'/api/login',
    data,
    success: function (res) {
      console.log(res);

      if (res.status !== 0) {
        // 登录失败
        return layer.msg("登录失败");
      }
      // 登录成功，还需要把服务器给的token信息给存储起来
      localStorage.setItem("token", res.token);
      // 延时跳转：等弹出框关闭了才去跳转
      layer.msg("登录成功, 即将跳转到首页", function () {
        // 弹出框关闭了才会执行该函数
        // 跳转页面
        location.href = "/home/index.html";
      });
    },
  });
})
})