$(function () {

    let form=layui.form
    let layer=layui.layer
// 对表单验证
form.verify({
         // pass 密码的校验规则
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 原密码和新密码不能相同
    // 获取原密码
    newPass:function (value) {
        let oldPwd =$("[name=oldPwd]").val();
        if(value===oldPwd){
            return '新密码不能和原密码相同'
        }
    },
      // 确认新密码的校验规则，就是确保和新密码相同
    rePass: function (value) {
        // 获取到新密码的值
        let newPwd = $("[name=newPwd]").val();
  
        if (value !== newPwd) {
          return "两次输入的密码不一致";
        }
      },
})
 //实现密码的修改
 $('#form').on('submit',function (e) {
    //阻止默认跳转
    e.preventDefault();
    // 获取表单用户输入的数据
    let data = $(this).serialize();
    $.ajax({
        url:'/my/updatepwd',
        type:'POST',
        data,
        success:function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
              }
      
              layer.msg("更新密码成功");
            // 重置表单
        $("#form")[0].reset();
        }
        
        
    })
     
 })

})