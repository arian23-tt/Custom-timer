<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-sm-7 mx-auto">
    <form>
        <div class="mb-3">
          <label for="FirstName"  class="form-label mt-3">FirstName</label>
          <input v-model="FirstName" type="text"  class="form-control" id="FirstName"   >
        </div>

        <div class="mb-3">
          <label for="LastName" class="form-label">LastName</label>
          <input v-model="LastName" type="text"   class="form-control" id="LastName" >
        </div>

        <div class="mb-3">
          <label for="Login" class="form-label">Login</label>
          <input v-model="Login" type="Login"  class="form-control" id="Login" >
        </div>

        <div class="mb-3">
          <label for="Password" class="form-label">Password</label>
          <input v-model="Password" type="password"   class="form-control" id="Password" >
        </div>
  
        <div class="d-flex flex-row">
        <div class="mx-3"><button type="button" class="btn btn-primary" @click = "SignUp">Sign up</button></div>
        <div class="mx-3"><button type="button" class="btn btn-primary" @click="$emit('login')">Login</button></div>
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
      FirstName: '',
      LastName: '',
      Login: '',
      Password: ''
    }
  },
  emits: [ 'login'],
  methods:{
    SignUp(){
  const res = fetch ('http://localhost:5000/api/signup',{
    method: 'Post',
    headers:{
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      FirstName:this.FirstName,
      LastName:this.LastName,
      Login:this.Login,
      Password:this.Password

    })
  })
  res.then(res => res.text()).then(res=>alert(res)).catch(err=>alert(err));
 }
  },
}

</script>

<style >
.container{
  box-shadow: 10px 10px 10px rgb(172, 172, 172);
  background-color: #fff;
  border-radius: 2%;
  
}
body{
  background-image: url(https://html5book.ru/wp-content/uploads/2015/05/background3.png);
}
.container{
  height: 450px;
  width: 700px;
}
</style>

