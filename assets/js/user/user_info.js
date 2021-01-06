$(function () {
    // ====================== 添加昵称的自定义校验规则 ======================
  
    let form = layui.form;
     let layer=layui.layer
    form.verify({
      /* nickname: function (value, item) {
        //value：表单的值、item：表单的DOM对象
      }, */
  
      // 昵称
      nickname: (value) => {
        // console.log(value);
  
        if (value.length > 6) {
          return "昵称的长度需要在1-6字符之间";
        }
      },
    });
  
    // ==================  发送ajax请求， 获取用户的基本信息 ==================
    getInfo()
    function getInfo(){
      $.ajax({
        url: "/my/userinfo",
        success: function (res) {
          // console.log(res);
    
          // 给表单赋值
          // form 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
          // 注意点：第二个参数，数据需要和表单中的name进行一一对应，这样才能正确的给表单赋值
          form.val("form", res.data);
        },
      });
    }
       //表单重置功能
       $('#resetBtn').on('click',function(e){
        e.preventDefault();
         getInfo()
       })
       //监听表单获取submit事件，修改信息
       $('#form').on('submit',function(e){
         //清除默认跳转
        e.preventDefault();
        //获取表单数据
        let data=$(this).serialize();
        //发送ajax请求
        $.ajax({
          url:'/my/userinfo',
          type:'POST',
          data,
          success:function(res){
              // console.log(res)
              if(res.status !==0){
                    return layer.msg("修改用户信息失败！")
              }

             // window.parent 可以找到父页面的window对象
        window.parent.getUserInfo(); // 调用父页面的getUserInfo函数实现更新用户头像和昵称
              layer.msg("修改用户信息成功！");

          }
        })
       })
  });
  