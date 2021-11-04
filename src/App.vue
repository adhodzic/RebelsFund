<template>
  <div v-if="isDrizzleInitialized" id="app">
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand"> The Rebel's Fund </a>
      </div>
    </nav>
    <router-view />
    <!-- <h1>You are signed-in</h1> -->
     <nav class="navbar fixed-bottom navbar-dark bg-dark">
    </nav>
  </div>
  <div v-else>
    <!--  First sign in with metamask... -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "app",
  computed: {
    ...mapGetters("drizzle", ["drizzleInstance", "isDrizzleInitialized"]),
    ...mapGetters("contracts", ["getContractData"]),
    utils() {
      return this.drizzleInstance.web3.utils;
    },
  },
};
</script>


<style lang="scss" scoped>
.navbar-brand{
  font-family:Georgia, 'Times New Roman', Times, serif;
  font-size: 50px;
  margin-left: 30px;
}
.navbar{
   border-bottom: rgb(218, 121, 247);
   border-style: solid;
}
</style>
