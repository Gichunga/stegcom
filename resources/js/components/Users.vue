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
                      <th>Modify</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>183</td>
                      <td>John Doe</td>
                      <td>11-7-2014</td>
                      <td><span class="tag tag-success">Approved</span></td>
                      <td>
                          <a href="#">
                              <i class="fas fa-edit blue"></i>
                          </a>
                                /
                          <a href="#">
                              <i class="fas fa-user-times red"></i>
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
                        <select name="type" id="type" class="form-control" :class="{ 'is-invalid': form.errors.has('type') }" >
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
                    <button type="button" class="btn btn-primary">Create  <i class="fas fa-user-plus"></i></button>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                // create a new form instance of the vform defined in app.js
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
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
