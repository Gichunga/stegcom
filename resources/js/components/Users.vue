<template>
    <div class="container">
        <div class="row justify-content-center mt-5" v-if="$gate.isAdminOrAuthor()">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Users Management</h3>

                <div class="card-tools">
                    <button class="btn btn-success" @click="newModal">Add New <i class="fas fa-user-plus fa-fw"></i></button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Registration Date</th>
                        <th>Modify</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users.data" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.type | toUpper }}</td>
                        <td>{{ user.created_at | myDate}}</td>

                        <!-- <td><span class="tag tag-success">Approved</span></td> -->
                        <td>
                            <a href="#">
                                <i class="fas fa-edit fa-lg blue" @click="editModal(user)"></i>
                            </a>
                                    <span class="mx-3">/</span>
                            <a href="#" @click="deleteUser(user.id)">
                                <i class="fas fa-user-times fa-lg red"></i>
                            </a>
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
              <div class="card-footer">
                  <pagination :data="users" @pagination-change-page="getResults"></pagination>
              </div>
            </div>
            <!-- /.card -->
          </div>
        </div>

        <div v-if="!$gate.isAdminOrAuthor()">
            <not-found></not-found>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="userModalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" v-show="!editmode" id="userModalTitle">Add User</h5>
                        <h5 class="modal-title" v-show="editmode" id="userModalTitle">Update User's Info</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <form @submit.prevent="editmode ? updateUser() : createUser()" >
                        <div class="modal-body">
                            <!-- name -->
                            <div class="form-group">
                                <input v-model="form.name" type="text" name="name" placeholder="Name"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                <has-error :form="form" field="name"></has-error>
                            </div>
                            <!-- end name -->

                            <!-- email -->
                            <div class="form-group">
                                <input v-model="form.email" type="text" name="email" placeholder="Email Adress"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                                <has-error :form="form" field="email"></has-error>
                            </div>
                            <!-- end email -->

                            <!-- bio -->
                            <div class="form-group">
                                <textarea v-model="form.bio" name="bio" id="bio" placeholder="Short bio for user (optional)"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                                <has-error :form="form" field="bio"></has-error>
                            </div>
                            <!-- end bio -->

                            <!-- user type -->
                            <div class="form-group">
                                <select v-model="form.type" name="type" id="type" class="form-control" :class="{ 'is-invalid': form.errors.has('type') }" >
                                    <option value="">Select user role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">Standard user</option>
                                    <option value="author">Author</option>
                                </select>
                                <has-error :form="form" field="type"></has-error>
                            </div>
                            <!-- end user type -->

                            <!-- password -->
                            <div class="form-group">
                                <input v-model="form.password" type="password" name="password" id="password"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                                <has-error :form="form" field="password"></has-error>
                            </div>
                            <!-- end password -->
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close <i class="fas fa-times"></i></button>
                            <button type="submit" v-show="!editmode" class="btn btn-primary">Create  <i class="fas fa-user-plus"></i></button>
                            <button type="submit" v-show="editmode" class="btn btn-success">Update <i class="fas fa-user-plus"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NotFound from './NotFound.vue';
    export default {
  components: { NotFound },
        data(){
            return {
                editmode: false,
                users : {}, 

                // create a new form instance of the vform defined in app.js
                // 2-way data binding
                form: new Form({
                    id: '',
                    name: '',
                    email: '',
                    type: '',
                    bio: '',
                    password: '',
                    photo: ''
                })
            }
        },

        methods: {
            getResults(page = 1){
                axios.get('api/user?page='+page)
                .then(response => {this.users = response.data;}) // store all the response data in the users variable which will then update our table
            },
            updateUser(){
                this.$Progress.start();
                this.form.put('api/user/'+this.form.id)
                .then(() => {
                    //success
                    this.form.reset();
                    $('#userModal').modal('hide');
                    Fire.$emit('AfterUpdate');
                    Swal.fire(
                        'Updated!',
                        'User info has been updated.',
                        'success'
                    )
                    this.$Progress.finish();
                })
                .catch(() => {
                    this.$Progress.fail();
                })
            },
            editModal(user){
                this.editmode = true;
                this.form.reset();
                $('#userModal').modal('show');
                this.form.fill(user);
            },
            newModal(){
                this.editmode = false;
                $('#userModal').modal('show');
            }, 
            deleteUser(id){
                Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // send an ajax request to the server for processing 
                        this.form.delete('api/user/'+id).then(() => {
                                Swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )
                                Fire.$emit('AfterCreate');
                        }).catch(() => {
                            Swal.fire(
                                'Failed!',
                                'There was something wrong.',
                                'warning'
                            )
                        });
                    }
                })
            },

            loadUsers(){
                // this function sends an http request to controller@index method
                // uses axios to get the {data} and store in the users object
                // {data} is a parameter in js es6
                if(this.$gate.isAdminOrAuthor()){
                    axios.get('api/user').then(({data}) => (this.users = data)); //removed the data.data so as to pass an object to users and not array. Also remember to update the template...!!!
                }
            }, 

            createUser(){
                this.$Progress.start();
                this.form.post('api/user')// submit the form via a POST request
                .then(() => {
                    Fire.$emit('AfterCreate'); // after creating a user, we shout an event created
                    $('#userModal').modal('hide');

                    toast.fire({
                        icon: 'success',
                        title: 'User Created Successfully'
                    });

                })

                this.$Progress.finish();
            }
        },
        // when this component is created load users
        created() {
            // console.log('Component mounted.')
            Fire.$on('searching', () => {
                let query = this.$parent.search; //this takes data from the root application(app.js) and assigns it to query
                axios.get('api/findUser?q=' + query)
                .then((data) => {
                    this.users = data.data;
                })
                .catch(() => {

                });
            });
            this.loadUsers();
            Fire.$on(['AfterCreate', 'AfterUpdate'], () => {
                this.loadUsers();
            });
            // Fire.$on('AfterUpdate', () => {
            //     this.loadUsers();
            // });
            // setInterval(() => this.loadUsers(), 2000);
        }
    }
</script>
