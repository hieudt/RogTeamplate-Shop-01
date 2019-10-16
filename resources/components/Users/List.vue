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
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users">
                            <td>{{ user.id }}</td>
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
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
import axios from 'axios';
import {RESOURCE_USER} from '@/api';
import { mapGetters } from 'vuex';

export default {
    mounted() {
        this.$store.dispatch('user/fetch', this.token)
        .then(() => {
            this.$store.dispatch('user/isLoading')
        })
    },
    computed : {
        ...mapGetters({
            token : 'user/getToken',
            users : 'user/getUsers',
		})
    },
	created () {
	}
}
</script>