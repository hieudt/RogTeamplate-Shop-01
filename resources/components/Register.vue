<template>
    <div>
        <!-- Page info -->
	<div class="page-top-info">
		<div class="container">
			<h4>Account</h4>
			<div class="site-pagination">
				<a href="">Home</a> /
				<a href="">Register</a>
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
						<div class="cf-title">Account Information</div>
						<div class="row address-inputs">
							<div class="col-md-12">
                                <input type="text" placeholder="Full name" v-model="name">
								<input type="text" placeholder="Email" v-model="email">
								<input type="text" placeholder="Password" v-model="password">
								<input type="text" placeholder="Re-Password" v-model="repass">
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<button class="site-btn submit-order-btn" type="submit">Register</button>
							</div>
							<div class="col-md-6">
								<router-link :to="{name: 'store.login'}" class="site-btn submit-order-btn">Login</router-link>
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
            this.$store.dispatch('addUser', {
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