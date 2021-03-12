<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Users Management</h3>

                <div class="card-tools">
                    <button class="btn btn-success" data-toggle="modal" data-target="#userModal">Add New <i class="fas fa-user-plus fa-fw"></i></button>
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
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.type }}</td>
                        <td>{{ user.created_at }}</td>

                        <!-- <td><span class="tag tag-success">Approved</span></td> -->
                        <td>
                            <a href="#">
                                <i class="fas fa-edit fa-lg blue"></i>
                            </a>
                                    <span class="mx-3">/</span>
                            <a href="#">
                                <i class="fas fa-user-times fa-lg red"></i>
                            </a>
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="userModalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="userModalTitle">Add User</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <form @submit.prevent="createUser" >
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
                            <button type="submit" class="btn btn-primary">Create  <i class="fas fa-user-plus"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                users : {}, 

                // create a new form instance of the vform defined in app.js
                // 2-way data binding
                form: new Form({
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
            loadUsers(){
                // this function sends an http request to controller@index method
                // uses axios to get the {data} and store in the users object
                // {data} is a parameter in js es6
                axios.get('api/user').then(({data}) => (this.users = data.data));
            }, 

            createUser(){
                // submit the form via a POST request
                this.form.post('api/user');
            }
        },
        // when this component is created load users
        created() {
            // console.log('Component mounted.')
            this.loadUsers();
        }
    }
</script>
