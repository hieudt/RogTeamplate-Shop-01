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
            <div>
                <div style="margin-bottom: 10px">
                <el-row>
                    <el-col :span="18">
                        <transition name="router-anim">
                            <el-button type="danger" @click="confirmMultiDelete" v-show="selectedRow.length > 0">{{ $t('common.delete') }}</el-button>
                        </transition>
                    </el-col>

                    <el-col :span="6">
                    <el-input :placeholder="$t('search.placeholder')" v-model="filters[0].value"></el-input>
                    </el-col>
                </el-row>
                </div>
                <data-tables :loading="loading" :pagination-props="{ pageSizes: [5, 10, 15] }" :data="users.data" :action-col="actionCol" :filters="filters" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>

                    <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.prop" sortable="custom">
                    </el-table-column>
                </data-tables>
            </div>
		</div>
	</section>
	<!-- Category section end -->
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    data: function () {
        return {
            loading:false,
            selectedRow: [],
            titles: [
                {
                    label : "ID",
                    prop : "id",
                },
                {
                    label: "email",
                    prop: "email",
                }
            ],
            filters: [{
                prop: 'id',
                value: ''
            }],
             actionCol: {
                props: {
                label: 'Action',
            },
            buttons: [{
                props: {
                    type: 'primary'
                },
                handler: row => {
                    this.$message('Edit clicked')
                    this.$router.push({ name: 'user.edit', params: { id: row.id } })
                },
                label: this.$t('common.edit'),
            }, {
                props : {
                    type: 'danger'
                },
                handler: row => {
                    this.users.data.splice(this.users.data.indexOf(row), 1)
                    this.$store.dispatch('user/delete', row.id)
                },
                    label: this.$t('common.delete')
                }]
            },
        }
    },
    mounted() {
        this.$store.dispatch('user/fetch')
    },
    computed : {
        ...mapGetters({
            token : 'user/getToken',
            users : 'user/getUsers',
        }),
    },
    watch: {
    },
    methods: {
        fetchUser: function () {
            this.$store.dispatch('user/fetch')
        },
        confirmMultiDelete: function () {
            let self = this;
            this.$dlg.alert('Delete ?', function() {
                let listIds = self.selectedRow.map(row => row.id)
                self.$store.dispatch('user/deleteList', listIds)
                self.multiDelete()
            }, {
                messageType: 'confirm',
                title: 'DElETE Records',
                language: 'en',
                cancelCallback: function(){
                    // cancel 
                }
            })
        },
        handleSelectionChange(val) {
            this.selectedRow = val
        },
        multiDelete() {
            let self = this;
            this.selectedRow.map(row => {
                this.users.data.splice(this.users.data.indexOf(row), 1)
            })
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