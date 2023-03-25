// 导入一个入口函数
$(function () {
    // 思想：点击去注册的连接 就把登录页面给隐藏，注册页面给显示
    // 注册登录页面的点击事件
    $('#link_login').on('click', function () {
        // 点击之后 登录页面隐藏 注册页面显示
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 同理给注册页面也相同
    // 注册注册页面的点击事件
    $('#link_reg').on('click', function () {
        // 点击之后 登录页面隐藏 注册页面显示
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从lay.js中，获取form对象
    let form = layui.form
    let layer = layui.layer
    // 通过lay-verify 函数自定义校验规则
    form.verify({
        // 自定义一个叫pwd的规则 用于密码的校验
        pwd: [/^[\S]{6,12}$/, '密码必须是6到12位，且不能有空格'],
        // 在自定义一个两次密码是否一致的校验
        repwd: function (value) {
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册提交事件
    // 获取表单注册提交行为
    $('#form_reg').on('submit', function (e) {
        // 1.阻止默认提交行为
        e.preventDefault()
        // 发起ajax  post请求
        //     $.ajax({
        //         type:'post',
        //         url:'http://ajax.frontend.itheima.net/api/reguser',
        //         data:{
        //             user_name: $('#form_reg [name=user_name]').val(),
        //             password: $('#form_reg [name=password]').val()
        //         },
        //         success:function (res) {
        //             if (res.status !== 0) {
        //                 return layer.msg(res.message)
        //             }
        //             layer.msg('注册成功，请登录')
        //             // 模拟人的点击行为
        //             $('#link_reg').click()
        //             // $('.login-box').hide()
        //             // $('.reg-box').show()

        //     }
        // })
        $.post('/api/reguser',
            {
                user_name: $('#form_reg [name=user_name]').val(),
                password: $('#form_reg [name=password]').val()
            },
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')
                // 模拟人的点击行为
                $('#link_reg').click()
                // $('.login-box').hide()
                // $('.reg-box').show()

            })
    })
    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中 有次才可以在postman中查询 很重要 后续有权限的接口都需要
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})