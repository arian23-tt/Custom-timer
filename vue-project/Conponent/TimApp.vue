<template>
<button type="button" class="btn btn-outline-warning mx-3 btn-lg " @click = "Logout">Выйти из аккаунта</button>
<form>
  <div class="col-sm-4">
  <div class="form-group mt-3">
    <label for="formGroupExampleInput">Введите имя таймера</label>
    <input  v-model="timer_name" type="text" class="form-control" id="formGroupExampleInput" placeholder=""> 
    <label for="formGroupExampleInput">Введите время таймера</label>
    <input  v-model="timer_runnig_time" type="number" class="form-control" id="formGroupExampleInput" placeholder=""> 
    </div>
  </div>
  <div class="col-sm-7 ">
  <button type="button" class="btn btn-outline-warning mx-3" @click = "CreateTimer" id="botton">Create Timer</button>
  <button type="button" class="btn btn-outline-warning mx-3 btn-lg" @click="GetTimers">List</button>
  </div>
    <p></p>
</form>


	<div  class="time-count ">
		<div v-for="timer in timers" :key="timer.id_timer"  class="time-count__content">
			<div class="time-count__separator">{{timer.timer_name}}:</div>
			<div class="time-count__item time-count__days">
				<div class="time-count__val">00</div>
			</div>
			<div class="time-count__separator">:</div>
			<div class="time-count__item time-count__hours">
				<div class="time-count__val">00</div>
			</div>
			<div class="time-count__separator">:</div>
			<div class="time-count__item time-count__minutes">
				<div class="time-count__val">{{timer.timer_runnig_time}}</div>
			</div>
			<div class="time-count__separator">:</div>
			<div class="time-count__item time-count__seconds"> 
			<div class="time-count__val">00</div>
			</div>
<button @click = "Pause(timer.id_timer)" type="button" class="btn btn-outline-warning mx-3 btn-xs">Pause</button>
<button @click = "Resume(timer.id_timer)" type="button" class="btn btn-outline-warning mx-3 btn-xs">Resume</button>
{{timer.Status}}
		</div>
	</div>
  <div class="col-sm-7 mx-auto">
 <div class="form-group mt-3">
    
  </div>
  </div>

</template>

<script>
// document.addEventListener('DOMContentLoaded', () => {
// let timerInput = document.getElementById("formGroupExampleInput");
// let buttonRun = document.getElementById("button")
// let timerShow = document.getElementById("time-count");

// buttonRun.addEventListener('click', function() {
//     timeMinut = parseInt(timerInput.value) * 60
// })

// timer = setInterval(function () {
//     seconds = timeMinut%60
//     minutes = timeMinut/60%60
//     hour = timeMinut/60/60%60
//     if (timeMinut <= 0) {
//         clearInterval(timer);
//     } else {
//         let strTimer = `${Math.trunc(hour)}:${Math.trunc(minutes)}:${seconds}`;
//         timerShow.innerHTML = strTimer;
//     }
//     --timeMinut;
// }, 1000)
// });

export default{
  data(){
    return {
      token_user:`${localStorage.getItem('token')}`,
      timers:[],
      timer_name:'',
      timer_runnig_time:'',
      id_timer:'',
    }
  },
  created: function() {
      this.GetTimers();
      
//настройка setTimeout
//внутри - перебор timers
  },
  methods:{
getRest(timer){
console.log(timer)

},
    Logout(){
		const token = localStorage.getItem('token');
  const res = fetch (`http://localhost:5000/api/logout/?token_user=${token}`,{
    method: 'Get',
    headers:{
      'Content-Type': 'application/json'
    },


  })
  localStorage.removeItem("token");
	//localStorage.setItem("token", null);
  res.then(res => res.text()).then(res=>alert(res))
 }
  ,

    GetTimers(){
		let self = this;
	const token = localStorage.getItem('token');
	const res = fetch (`http://localhost:5000/api/timers`+new URLSearchParams({
     token_user: token
    }),{
    method: 'GET',
    headers:{
      'Content-Type': 'application/json'
    },

  })

 
  res.then(res => res.json()).then(res=>{console.log(res);self.timers= res})

 },

   
    CreateTimer(){
		let self = this;
		const token = localStorage.getItem('token');
  const res = fetch (`http://localhost:5000/api/CreateTimer`,{
    method: 'Post',
    headers:{
      'Content-Type': 'application/json'
    },

	body: JSON.stringify({
      id_timer:this.id_timer,
      timer_name:this.timer_name,
      timer_runnig_time:this.timer_runnig_time,
      token_user:token,
    })

  })
 
	
  res.then(res => res.json()).then(res=>self.timers.push(res))

 
  },
//// метод остановки таймер
 
    Pause(id_timer){
		const token = localStorage.getItem('token');
  const res = fetch (`http://localhost:5000/api/Pause/${id_timer}`,{
    method: 'Post',
    headers:{
      'Content-Type': 'application/json'
    },

	body: JSON.stringify({
      token_user:token,
    })

  })
  localStorage.removeItem("token");
	
  res.then(res => res.text()).then(res=>alert(res))
 },
  
// Метод старта таймера

    Resume(id_timer){
		const token = localStorage.getItem('token');
  const res = fetch (`http://localhost:5000/api/Resume/${id_timer}`,{
    method: 'Post',
    headers:{
      'Content-Type': 'application/json'
    },

	body: JSON.stringify({
      token_user:token,
    })

  })
  localStorage.removeItem("token");
	
  res.then(res => res.text()).then(res=>alert(res))
 },
//список таймера
 ListTimer:{
    List(){
		const token = localStorage.getItem('token');
  const res = fetch (`http://localhost:5000/api/CreateTimer/?token_user=${token}`,{
    method: 'Post',
    headers:{
      'Content-Type': 'application/json'
    },

	body: JSON.stringify({
      timer_name:this.timer_name,
      timer_runnig_time:this.timer_runnig_time
    })

  })
  localStorage.removeItem("token");
	
  res.then(res => res.text()).then(res=>alert(res))
 }
  },
}
}


</script>
<style>
body {
	background: linear-gradient(90deg, #efd5ff 0%, #515ada 100%);  
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	font-family: 'Roboto', sans-serif;
}

.visually-hidden {
	position: absolute !important;
	clip: rect(1px 1px 1px 1px);
	/* IE6, IE7 */
	clip: rect(1px, 1px, 1px, 1px);
	padding: 0 !important;
	border: 0 !important;
	height: 1px !important;
	width: 1px !important;
	overflow: hidden;
}

.time-count {
	display: flex;
	flex-wrap: wrap;
	background: #fff;
	box-shadow: 4px 8px 40px rgba(8, 24, 111, 0.2);
	border-radius: 30px;
	width: 900px;
	height: auto;
	padding: 10px 10px;
}

.time-count__title {
	margin: 0;
	margin-bottom: 35px;
	font-weight: 700;
	font-size: 40px;
	line-height: 47px;
	text-align: center;
	color: var(--color-dark);
}

.time-count__content {
	display: flex;
	justify-content: left;
	height: 30px;
}

.time-count__item {
	text-align: center;
}

.time-count__val {
	min-width: 60px;
	font-weight: 700;
	font-size: 12px;
	line-height: 30px;
	color: var(--color-accent);
}

.time-count__separator {
	font-weight: 700;
	font-size: 15px;
	line-height: 30px;
	text-align: left;
	color: var(--color-accent);
	margin: 0px;
}

.time-count__text {
	font-family: 'Noto Sans', sans-serif;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	color: var(--color-dark);
}
</style>