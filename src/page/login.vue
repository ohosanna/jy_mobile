<template>
<div class='login'>
    <div class="login-head"><b>劲云平台</b></div>
    <div class="login-bg"  :style="'background-image:url('+bg+')'">
    <div class="login-box">
        <div class="login-left-txt">
            <div class="english">Welcome to <br/>KingCloud Smart Community <br/>Service Platform</div>
            <div class="chinese">欢迎使用<br/>劲云智慧社区服务平台</div>
        </div>
    <div class="login-box-body">
        <p class="login-box-msg">登录Login</p>

        <div class="form-group has-feedback">
            <span class="glyphicon glyphicon-user form-control-feedback"></span>
            <input type="text" class="form-control" v-model="username" placeholder="账号">

        </div>
        <div class="form-group has-feedback">
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            <input type="password" class="form-control" v-model="password" placeholder="密码">

        </div>
        <!--<div class="form-group has-feedback">
            <input type="text" class="form-control" v-model="captcha" @keyup.enter="login" placeholder="验证码">
            <span class="glyphicon glyphicon-warning-sign form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
            <img alt="如果看不清楚，请单击图片刷新！" class="pointer" :src="src" @click="refreshCode">
            &nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" @click="refreshCode">点击刷新</a>
        </div>-->
        <div v-if="error" class="alert alert-danger alert-dismissible mb-5">
            <h4 class="mb-0 fz10"><i class="fa fa-exclamation-triangle"></i> {{errorMsg}}</h4>
        </div>

        <div class="row">
            <div class="col-xs-12">
            <div class="checkbox icheck">
            </div>
            </div>
        </div>
        <button type="button" class="btn btn-primary btn-block btn-flat" @click="login">登录</button>
        <!-- /.social-auth-links -->

    </div>
    <!-- /.login-box-body -->
    </div>
    </div>
</div>
</template>
<script>
import bg from 'img/login-bg.jpg'
export default {
name:'login',
data () {
    return {
        bg:bg,
        username: '',
        password: '',
        captcha: '',
        error: false,
        errorMsg: '',
        src: 'captcha.jpg'
    }
},
created(){
},

methods:{
    login(){
        if(this.username==''||this.username==null||this.username==undefined){
                this.error = true;
                this.errorMsg = '账号不能为空!';
                return;
            }
            if(this.password==''||this.password==null||this.password==undefined){
                this.error = true;
                this.errorMsg = '密码不能为空!';
                return;
            }
             
            this.$US.login({
                    "username":this.username,
                    "password":this.password,
                    "captcha":this.captcha
            }).then(res=>{
                if(res.code == 0){//登录成功
                    this.$store.commit(this.$def.LOGIN, true)
					this.$router.push("/home")
				}else{
                    this.$store.commit(this.$def.LOGIN, false)
                    this.error = true;
					this.errorMsg = res.msg;
				}
            })
    }
},
}
</script>
<style></style> 