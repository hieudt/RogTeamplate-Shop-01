<template>
    <div>
        <!-- Page info -->
	<div class="page-top-info">
		<div class="container">
			<h4>{{ $t('register.title') }}</h4>
			<div class="site-pagination">
				<a href="">{{ $t('common.home_page') }}</a> /
				<a href="">{{ $t('register.breadcrumb') }}</a>
			</div>
		</div>
	</div>
	<!-- Page info end -->


	<!-- checkout section  -->
	<section class="checkout-section spad">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<form class="checkout-form" @submit.prevent="add">
						<div class="cf-title">{{ $t('register.title') }}</div>
						<div class="row address-inputs">
							<div class="col-md-12">
                                <input type="text" :placeholder="$t('register.input_text.name')" v-model="name">
								<input type="text" :placeholder="$t('register.input_text.email')" v-model="email">
								<input type="text" :placeholder="$t('register.input_text.password')" v-model="password">
								<input type="text" :placeholder="$t('register.input_text.repassword')" v-model="repass">
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<button class="site-btn submit-order-btn" type="submit">{{ $t('register.buttons.signup') }}</button>
							</div>
							<div class="col-md-6">
								<router-link :to="{name: 'store.login'}" class="site-btn submit-order-btn">{{ $t('login.buttons.login') }}</router-link>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
	<!-- checkout section end -->
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            name: null,
            email: null,
            password: null,
            repass: null,
        }
    },
    methods: {
        add: function () {
            this.$store.dispatch('user/addUser', {
                name: this.name,
                email: this.email,
                password: this.password,
                repassword: this.repass,
			})
			.then(() => this.$router.push('/'))
			.catch(() => {})
        }
    },
    created() {
        
    }
}
</script>