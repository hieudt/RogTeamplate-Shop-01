<template>
    	<!-- Header section -->
	<header class="header-section">
		<div class="header-top">
			<div class="container">
				<div class="row">
					<div class="col-lg-2 text-center text-lg-left">
						<!-- logo -->
						<a href="./index.html" class="site-logo">
							<img src="img/logo.png" alt="">
						</a>
					</div>
					<div class="col-xl-6 col-lg-5">
						<form class="header-search-form">
							<input type="text" placeholder="Search on divisima ....">
							<button><i class="flaticon-search"></i></button>
						</form>
					</div>
					<div class="col-xl-4 col-lg-5">
						<div class="user-panel">
							<div class="up-item" v-if="!isLogged">
								<i class="flaticon-profile"></i>
								<router-link :to="{name: 'store.login'}">Sign In</router-link> or <router-link :to="{name: 'store.register'}">Create Account</router-link>
							</div>
							<div v-if="isLogged">
								<div class="up-item">
									<i class="flaticon-profile"></i>
									<span>{{ authName }}</span>
								</div>
								<div class="up-item">
									<i class="flaticon-logout"></i>
									<span><a href="#" @click="logout">Log Out</a></span>
								</div>
							</div>
							<div class="up-item">
								<div class="shopping-card">
									<i class="flaticon-bag"></i>
									<span>0</span>
								</div>
								<a href="#">Shopping Cart</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<nav class="main-navbar">
			<div class="container">
				<!-- menu -->
				<ul class="main-menu">
					<li><router-link :to="{name: 'store.index'}">Home Page</router-link></li>
					<li><a href="#">Women</a></li>
					<li><a href="#">Men</a></li>
					<li><a href="#">Jewelry
						<span class="new">New</span>
					</a></li>
					<li><a href="#">Shoes</a>
						<ul class="sub-menu">
							<li><a href="#">Sneakers</a></li>
							<li><a href="#">Sandals</a></li>
							<li><a href="#">Formal Shoes</a></li>
							<li><a href="#">Boots</a></li>
							<li><a href="#">Flip Flops</a></li>
						</ul>
					</li>
					<li><a href="#">Pages</a>
						<ul class="sub-menu">
							<li><router-link :to="{name: 'store.productdetails'}">Product Page</router-link></li>
							<li><router-link :to="{name: 'store.category'}">Category Page</router-link></li>
							<li><router-link :to="{name: 'store.cart'}">Cart Page</router-link></li>
							<li><router-link :to="{name: 'store.checkout'}">Checkout Page</router-link></li>
							<li><a href="./contact.html">Contact Page</a></li>
						</ul>
					</li>
					<li><a href="#">Blog</a></li>
				</ul>
			</div>
		</nav>
	</header>
	<!-- Header section end -->
</template>

<script>
export default {
	created() {
		// console.log(this.$store.state.user);
	},
    computed: {
		isLogged() {
			if (this.$store.state.loggedStatus == 'success') {
				return true;
			} else {
				return false;
			}
		},
		authName() {
			return this.$store.state.user.name;
		}
	},
	methods: {
		logout() {
			this.$store.dispatch('logout')
			this.$router.push('/')
		}
	}
}
</script>