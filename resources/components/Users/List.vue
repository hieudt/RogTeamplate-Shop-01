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
                <transition name="fade" mode="out-in" appear>
                    <div class="alert alert-warning" v-show="checkedId.length > 0">
                        {{ checkedId.length }} {{ $t('common.records_checked') }}
                    </div>
                </transition>
				<table class="table table-hover">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td class="">Email</td>
                            <td colspan="3">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users.data" :class="{hover: checkedId.includes(user.id)}">
                            <td @click="pushCheckbox(user.id)" ><input type="checkbox" :name="user.id" :value="user.id" v-model="checkedId"> {{ user.id }}</td>
                            <td @click="pushCheckbox(user.id)" >{{ user.name }}</td>
                            <td @click="pushCheckbox(user.id)" >{{ user.email }}</td>
                            <td><router-link :to="{ name: 'user.show', params: { id: user.id }}" class='btn btn-success'>{{ $t('common.show') }}</router-link></td>
                            <td><router-link :to="{ name: 'user.edit', params: { id: user.id }}" class='btn btn-primary'>{{ $t('common.edit') }}</router-link></td>
                            <td><button class="btn btn-danger" @click="_delete(user.id)">{{ $t('common.delete') }}</button></td>
                        </tr>
                    </tbody>
                </table>
                <pagination :data="users" v-on:pagination-change-page="getResults"></pagination>
			</div>
             <div class="row mt-2">
                <transition name="router-anim">
                    <button class="btn btn-primary mr-2" @click="selectAll = true">{{ $t('common.select_all') }}</button>
                </transition>
                <transition name="router-anim">
                    <button class="btn btn-primary mr-2" v-show="checkedId.length > 0" @click="unselectAll">{{ $t('common.unselect_all') }}</button>
                </transition>
                <transition name="router-anim">
                    <button class="btn btn-danger mr-2" v-show="checkedId.length > 0" @click="">{{ $t('common.delete') }}</button>
                </transition>
            </div>
		</div>
	</section>
	<!-- Category section end -->
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import pagination from 'laravel-vue-pagination'

export default {
    data: function () {
        return {
            checkedId: [],
            selectAllButton: false,
        }
    },
    components: {
        pagination
    },
    mounted() {
        this.$store.dispatch('user/fetch', 1)
    },
    computed : {
        ...mapGetters({
            token : 'user/getToken',
            users : 'user/getUsers',
        }),
        selectAll: {
            get: function () {
                return this.users.data ? this.checkedId.length == this.users.data.length : false;
            },
            set: function (value) {
                var checkedId = []

                if (value) {
                    this.users.data.forEach(function (user) {
                        checkedId.push(user.id)
                    });
                    this.selectAllButton = true
                }

                if (this.checkedId.length > 1)
                    this.checkedId = this.checkedId.concat(checkedId.filter((item) => this.checkedId.indexOf(item) < 0))
                else
                    this.checkedId = checkedId
            }
        }
    },
    methods: {
        unselectAll: function () {
            let self = this
            this.users.data.forEach(function (user) {
                self.arrayRemoveByIndex(self.checkedId, user.id)
            })
        },
        pushCheckbox(userId) {
            if (this.checkedId.includes(userId)) {
                var index = this.checkedId.indexOf(userId)
                if (index !== -1) this.checkedId.splice(index, 1)
            } else {
                this.checkedId.push(userId)
            }

        },
        _delete: function(userId) {
            this.arrayRemoveByIndex(this.checkedId, userId)
            this.$store.dispatch('user/delete', userId)
            .then(() => this.$store.dispatch('user/fetch', 1))
        },
        getResults: function (page) {
            if (typeof page === 'undefined') {
                page = 1
            }
            this.$store.dispatch('user/fetch', page)
        },
        arrayRemoveByIndex: function (array, userId) {
            var index = array.indexOf(userId)
            if (index !== -1) array.splice(index, 1)
        }
    },
}
</script>
<style scoped>
.router-anim-enter-active {
  animation: coming .3s;
  animation-delay: .3s;
  opacity: 0;
}
.router-anim-leave-active {
  animation: going .3s;
}

@keyframes going {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50px);
    opacity: 0;
  }
}
@keyframes coming {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.hover {
  background-color: #bcc4cc;
}

.table-hover tr {
    cursor: pointer;
}

</style>