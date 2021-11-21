<template>
  <div v-if="isDrizzleInitialized" id="app">
    <nav id="topbar" class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand"> The Rebel's Fund </a>
        {{getRole}}
        <div v-if="$route.name != 'Login'" class="profile">
          <router-link to="/profile"><a href="#">
            <img id="avatar" src="@/assets/user.png"></a>
        </router-link>  
        </div>
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
    utils() {
      return this.drizzleInstance.web3.utils
    }
  },
  methods: {
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
      let sender = this.drizzleInstance.web3.eth.accounts.givenProvider.selectedAddress;
      if (this.isDrizzleInitialized) {
        const role = await this.drizzleInstance.contracts.RebelsFund.methods.getRole().call({from: sender});
        console.log(role)
        if(role == 2){
          const user = await this.drizzleInstance.contracts.RebelsFund.methods.getUser().call({from: sender})
          console.log(user)
          this.$store.dispatch("setCurrentUser", user);
        }else if(role == 1){
          const charity = await this.drizzleInstance.contracts.RebelsFund.methods.getCharity().call({from: sender})
          console.log("Charity:" ,charity)
          this.$store.dispatch("setCurrentUser", charity);
        }
        this.$store.dispatch("updateRole", role);  
        if(role == 0 && this.$route.name != 'Login'){
          this.$router.push("/login")
        }else if(role > 0 && this.$route == 'Login'){
          this.$router.push("/")
        }
      }   
    },
    async listenMMAccount() {
      let self = this
      window.ethereum.on("accountsChanged", async function(accounts) {
        self.getUserRole();
        self.$store.dispatch("setCurrentUser", [])
      });
    }
  },
  mounted(){
    this.listenMMAccount();
    /* window.ethereum.on("accountsChanged", async function() {
        console.log();
    }); */
    this.$drizzleEvents.$on('drizzle/contractEvent', payload => {
      //alert(payload.data.message + payload.data.name)
    })
  },
  async created() {
    await this.getUserRole()
    this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
      contractName: "RebelsFund",
      method: "getAllCharity",
      methodArgs: []
    })
  }
}
</script>


<style lang="scss" scoped>
#logo{
  height: 30px;
  width: 30px;
}
.navbar-brand{
  font-family:Georgia, 'Times New Roman', Times, serif;
  font-size: 40px;
  margin-left: 30px;
}
#topbar{
   border-bottom: rgb(218, 121, 247);
   border-style: solid;
}
#avatar{
  height: 30px;
  width: 30px;
  color: whitesmoke;
}
#avatar:hover{
  cursor: pointer;
}
@media (max-width: 768px){
  .navbar-brand{
    display: none;
  }
}
</style>
