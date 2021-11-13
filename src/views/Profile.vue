<template>
  <div class="profile">
    <div class="container">
      <h1>Profile View</h1>
    </div>
  </div>
</template>

<script>
import store from '../store/store'
export default {
  name: 'Profile',
  async beforeRouteEnter (to, from, next) {
    while(store.getters.getRole == -1){
      const delay = new Promise(resolve => setTimeout(resolve, 500));
			await delay;
    }
    if(store.getters.getRole > 0){
        next();
    }else{
        next({name: "Login"})
    }
  },
  components: {
    
  }
}
</script>
