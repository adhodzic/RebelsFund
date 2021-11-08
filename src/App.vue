<template>
  <div v-if="isDrizzleInitialized" id="app">
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand"> The Rebel's Fund </a>
        <router-link v-if="getRole > 0" to="/profile"><a href="#"><img id="avatar" src="@/assets/user.png"></a></router-link>
      </div>
    </nav>
      <router-view v-if="getRole != -1"></router-view>
    <!-- <h1>You are signed-in</h1> -->
     <nav class="navbar fixed-bottom navbar-dark bg-dark">
    </nav>
  </div>
  <div v-else>
    <p>Waiting for metamask
    </p>
    <!--  First sign in with metamask... -->
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "app",
  data(){
    return{
      name: "",
      amount: "",
      char: "",
    }
  },
  computed: {
    ...mapGetters("drizzle", ["drizzleInstance", "isDrizzleInitialized"]),
    ...mapGetters("contracts", ["getContractData"]),
    ...mapGetters(["getRole"]),
    getNames() {
      let data = this.getContractData({
        contract: "RebelsFund",
        method: "getAllCharity"
      });
      if (data === "loading") return false;
      console.log(data)
      return data
    },
    utils() {
      return this.drizzleInstance.web3.utils
    }
  },
  methods: {
    async donate(name){
      await this.checkState();
      if (this.isDrizzleInitialized) {
        const role = await this.drizzleInstance.contracts.RebelsFund.methods.transferEther(this.utils.toHex(name[0])).send();
        console.log(role)   
      }       
    },
    //Method used to check if drizzle is initialized and if it's not it will wait and check every 500ms
    async checkState(){
			let state = this.isDrizzleInitialized;
			while(!state){
				const delay = new Promise(resolve => setTimeout(resolve, 500));
				await delay;
				state = this.isDrizzleInitialized;
			}
		},
    //Method that fetches and updates user role from smart contract to vuex store
    async getUserRole(){
      await this.checkState();
      if (this.isDrizzleInitialized) {
        const role = await this.drizzleInstance.contracts.RebelsFund.methods.getRole().call();
        if(role == 0){
          this.$router.push('/login')
        }
        this.$store.dispatch("updateRole", role);      
      }   
    },
  },
  mounted(){
    console.log("mounted")
    this.$drizzleEvents.$on('drizzle/contractEvent', payload => {
      console.log(payload)
      //alert(payload.data.message + payload.data.name)
    })
  },
  async created() {
    console.log("created")
    await this.getUserRole()
    await this.getAllCharity()
    this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
      contractName: "RebelsFund",
      method: "getAllCharity",
      methodArgs: []
    })
  }
}
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
#avatar{
  height: 45px;
  width: 45px;
  color: whitesmoke;
}
#avatar:hover{
  cursor: pointer;
}
</style>
