<template>
    <div>
        <!-- Page info -->
	<div class="page-top-info">
		<div class="container">
			<h4>{{ $t('login.title') }}</h4>
			<div class="site-pagination">
				<a href="">{{ $t('common.home_page') }}</a> /
				<a href="">{{ $t('login.breadcrumb') }}</a>
			</div>
		</div>
	</div>
	<!-- Page info end -->


	<!-- checkout section  -->
	<section class="checkout-section spad">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<form class="checkout-form" @submit.prevent="login">
						<div class="cf-title">{{ $t('login.breadcrumb') }}</div>
						<div class="row address-inputs">
							<div class="col-md-12">
								<input type="text" :placeholder="$t('login.input_text.email')" v-model="email">
								<input type="text" :placeholder="$t('login.input_text.password')" v-model="password">
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<button class="site-btn submit-order-btn" type="submit">{{ $t("login.buttons.login") }}</button>
							</div>
							<div class="col-md-6">
								<router-link :to="{name: 'store.register'}" class="site-btn submit-order-btn">{{ $t("register.buttons.signup") }}</router-link>
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
    data() {
        return {
            email: null,
            password: null,
        }
    },
    methods: {
        login: function () {
            this.$store.dispatch('login', {
				email: this.email,
				password: this.password
			})
			.then(() => this.$router.push('/'))
			.catch(() => {})
        }
    },
    created() {
        
    }
}
</script>