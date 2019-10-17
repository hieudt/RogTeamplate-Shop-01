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
        <form @submit.prevent="save">
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
                                <td><input type="text" v-model="user.name" class="rog-input"></input></td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{{ user.email }}</td>
                            </tr>
                            <tr>
                                <td><router-link :to="{name: 'user.list'}" class="btn btn-dark">{{ $t('common.back') }}</router-link></td>
                                <td><button class="btn btn-success">Save</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </form>
	</section>
	<!-- Category section end -->
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    data: function () {
        return {
            userEdit: {}
        }
    },
    mounted() {
        this.$store.dispatch('user/fetchOne', {
            token: this.token,
            id: this.$route.params.id
        })
    },
    computed : {
        ...mapGetters({
            token : 'user/getToken',
            user : 'user/getUserShow',
		})
    },
	created () {
    },
    methods: {
        save: function () {
            this.userEdit = this.user
            this.$store.dispatch('user/update', this.userEdit)
        }
    }
}
</script>
<style scoped>
    .rog-input {
        width: 100%;
        height: 44px;
        border: none;
        padding: 0 18px;
        background: #f0f0f0;
        border-radius: 40px;
        font-size: 14px;
    }
</style>