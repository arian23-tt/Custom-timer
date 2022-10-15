<template>
<SignUp v-if="Step ==='Mode-SignUP'" @login="Step='Mode-SignIn'" ></SignUp>
<SignIn v-else-if = "Step === 'Mode-SignIn'" @Enter="Step='Mode-Enter'"></SignIn>
<TimAPP v-else/>
</template>
<script>
import SignUp from '../Conponent/SignUp.vue';
import SignIn from '../Conponent/SignIn.vue';
import TimAPP from '../Conponent/TimApp.vue';
export default {
    components: { TimAPP,SignIn,SignUp },
    data() {
      return{
        Step: (localStorage.getItem('token')===null)?"Mode-SignUP":"Mode-Enter"
      }
    },

}

</script>


<style >


</style>


