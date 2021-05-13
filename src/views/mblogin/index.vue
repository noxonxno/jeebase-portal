<template>
	<div>
		<!-- vant导航栏 -->
		<van-nav-bar style="background-color: #3090EC;">
			<template #title>
				<span style="color: white;">登录</span>
			</template>
		</van-nav-bar>
    <van-form ref="loginForm" :model="loginForm" @submit="onSubmit">
      <van-field
        v-model="loginForm.userAccount"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="loginForm.userPassword"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        userAccount: '',
        userPassword: '',
        vcode: '',
        verkey: '',
        pcOrMobile: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.loginForm.pcOrMobile = 1
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.loading = false
        this.$router.push({ path: '/mb/index' })
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
