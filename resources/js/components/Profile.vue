<style>
.widget-user-header {
    background-position: center center;
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
    height: 135px;
    padding: 1rem;
    text-align: center;
}
</style>
<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12 mt-3">
                <div class="card card-widget widget-user">
                    <!-- Add the bg color to the header using any of the bg-* classes -->
                    <div class="widget-user-header text-white" style="background-image:url('./img/cover.png')">
                        <h3 class="widget-user-username">Elizabeth Pierce</h3>
                        <h5 class="widget-user-desc">Web Designer</h5>
                    </div>
                    <div class="widget-user-image">
                        <img class="img-circle" src="" alt="User Avatar">
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                <h5 class="description-header">3,200</h5>
                                <span class="description-text">SALES</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                <h5 class="description-header">13,000</h5>
                                <span class="description-text">FOLLOWERS</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                            <div class="col-sm-4">
                                <div class="description-block">
                                <h5 class="description-header">35</h5>
                                <span class="description-text">PRODUCTS</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                        <!-- /.col -->
                        </div>
                        <!-- /.row -->
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 mt-3">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item"><a class="nav-link" href="#activity" data-toggle="tab">Activity</a></li>
                  <li class="nav-item"><a class="nav-link active" href="#settings" data-toggle="tab">Settings</a></li>
                </ul>
              </div><!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                  <div class="tab-pane" id="activity">
                      <h3>Display User Activity</h3> 
                  </div>
                  <div class="tab-pane active" id="settings">
                    <form class="form-horizontal">
                      <div class="form-group row">
                        <label for="inputName" class="col-sm-12 col-form-label">Name</label>
                        <div class="col-sm-12">
                          <input type="email" v-model="form.name" class="form-control" id="inputName" placeholder="Name">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputEmail" class="col-sm-12 col-form-label">Email</label>
                        <div class="col-sm-12">
                          <input type="email" v-model="form.email" class="form-control" id="inputEmail" placeholder="Email">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputBiography" class="col-sm-12 col-form-label">Biography</label>
                        <div class="col-sm-12">
                          <textarea class="form-control" v-model="form.bio" id="inputBiography" placeholder="Biography"></textarea>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputType" class="col-sm-12 col-form-label">Type</label>
                        <div class="col-sm-12">
                          <select v-model="form.type" name="type" id="type" class="form-control" :class="{ 'is-invalid': form.errors.has('type') }" >
                              <option value="">Select user role</option>
                              <option value="admin">Admin</option>
                              <option value="user">Standard user</option>
                              <option value="author">Author</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="profile" class="col-sm-12 col-form-label">Profile Photo</label>
                        <div class="col-sm-12">
                          <input type="file" @change="updateProfile" id="profilePhoto">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputExperience" class="col-sm-12 col-form-label">Password (leave empty if not changing)</label>
                        <div class="col-sm-12">
                          <input type="password" class="form-control" id="password" placeholder="Password">
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="offset-sm-12 col-sm-12">
                          <button @click.prevent="updateInfo" type="submit" class="btn btn-success">Update</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div><!-- /.card-body -->
            </div>
            <!-- /.card -->
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
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
          updateInfo(){ //sends a post/put request to server
            this.$Progress.start();
            this.form.put('api/profile') // 
            .then(() => {
              this.$Progress.finish();
               toast.fire(
                  'Updated!',
                  'User info has been updated.',
                  'success'
              )
            })
            .catch(() => {
              $this.$Progress.fail();
            });
          },
          updateProfile(element){ // this function converts the image from binary to text for shiping across a network and to prevent bytes being interpreted as binary data
            // console.log("updating profile");
            let file = element.target.files[0]; //get the uploaded file
            console.log(file);
            let reader = new FileReader(); // create a new instance of FileReader api

            //check for file size
            if(file['size'] < 2097152){
              reader.onloadend = (file) => {
              // console.log('RESULT', reader.result);
                this.form.photo = reader.result;
              } 

              reader.readAsDataURL(file);
            }else{
              Swal.fire(
                  'Failed!',
                  'The file is too large',
                  'warning'
              )
            }
            
          }
        },
        mounted() {
            console.log('Component mounted.')
        },
         created() {
            axios.get('api/profile').then(({data}) => (this.form.fill(data)));
        }
    }
</script>
