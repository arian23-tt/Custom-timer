<template>
 <div class="container mt-6">
    <div class="row">
      <div class="col-sm-7 mx-auto">
        <form>

          <div class="mb-3 mt-5">
            <label for="Login" class="form-label mt-3">Login</label>
            <input v-model="Login" type="text"  class="form-control" id="Login" >
          </div>

          <div class="mb-3">
            <label for="Password" class="form-label">Password</label>
            <input v-model="Password" type="password"   class="form-control" id="Password" >
          </div>
  
          <div class="d-flex flex-row">
        
            <div class="mx-3"><button  type="button" class="btn btn-primary" @click = "SignIn" >Login</button></div>

          </div>
        
         

        </form>
      </div>
    </div>
  </div>
 </template>

<script>

export default{
  data(){
    return{
      Login: '',
      Password: ''
    }
  },
  emits: [ 'Enter'],
  methods:{
    SignIn(){
  const res = fetch ('http://localhost:5000/api/login',{
    method: 'Post',
    headers:{
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      Login:this.Login,
      Password:this.Password
    })

  });
    let currentObject = this
   res.then(res => res.json()).then(function (res){

     localStorage.setItem("token", res.token_user)
      currentObject.$emit('Enter')
   })
 }
  },
};
</script>
