<template>
  <div class="profile">
    <div class="container">
      <div class="preview">
        <h1>Profile View</h1>
        <h5>Name: {{$parent.utils.toUtf8(getCurrentUser["name"])}}</h5>
      </div>
      <div class="edit">
        <input type="text" >
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/store'
import { mapGetters } from "vuex"
export default {
  name: 'Profile',
  computed:{
    ...mapGetters(["getCurrentUser"]),
  },
  components: {
    
  },
  methods:{
    
  }
}
</script>
