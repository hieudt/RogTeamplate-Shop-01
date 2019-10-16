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
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td colspan="3">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users">
                            <td>{{ user.id }}</td>
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td><router-link :to="{ name: 'user.show', params: { id: user.id }}" class='btn btn-success'>{{ $t('common.show') }}</router-link></td>
                            <td><a href="#" class="btn btn-primary">{{ $t('common.edit') }}</a></td>
                            <td><a href="#" class="btn btn-danger" @click="_delete(user.id)">{{ $t('common.delete') }}</a></td>
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
import { mapGetters } from 'vuex';

export default {
    mounted() {
        this.$store.dispatch('user/fetch', this.token)
    },
    computed : {
        ...mapGetters({
            token : 'user/getToken',
            users : 'user/getUsers',
		})
    },
    methods: {
      _delete: function(userId) {
        this.$store.dispatch('user/delete', {
            token: this.token,
            id: userId
        })
        .then(() => this.$store.dispatch('user/fetch', this.token))
      },
    },
	created () {
        console.log(this.$store.getters.user.token)
	}
}
</script>