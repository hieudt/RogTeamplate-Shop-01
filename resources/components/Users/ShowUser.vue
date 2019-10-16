<template>
    <div>
        <!-- Page info -->
	<div class="page-top-info">
		<div class="container">
			<h4>Users List</h4>
			<div class="site-pagination">
				<a href="">Home</a> /
				<a href="">Users</a> /
			</div>
		</div>
	</div>
	<!-- Page info end -->


	<!-- Category section -->
	<section class="category-section spad">
		<div class="container">
			<div class="row">
				<table class="table">
                    <tbody>
                        <tr>
                            <td>ID</td>
                            <td>{{ user.id }}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{{ user.name }}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{{ user.email }}</td>
                        </tr>
                        <tr>
                            <td><router-link :to="{name: 'user.list'}" class="btn btn-dark">{{ $t('common.back') }}</router-link></td>
                        </tr>
                    </tbody>
                </table>
			</div>
		</div>
	</section>
	<!-- Category section end -->
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    mounted() {
        this.$store.dispatch('user/fetchOne', {
            token: this.token,
            id: this.$route.params.id
        })
        console.log(this.token)
    },
    computed : {
        ...mapGetters({
            token : 'user/getToken',
            user : 'user/getUserShow',
		})
    },
	created () {
	}
}
</script>