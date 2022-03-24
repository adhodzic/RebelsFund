<template>
  <div v-if="isDrizzleInitialized" id="app">
    <nav id="topbar" class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <div class="brand">
          <img
            style="border-radius: 20%"
            class="logo"
            src="@/assets/RebelsFundLightLogo.png"
          />
          <a class="navbar-brand"> The Rebel's Fund </a>
        </div>
        <div class="menu">
          <router-link v-if="$route.name != 'Login'" to="/">
            <i class="fas fa-home"></i>
          </router-link>
          <input
            id="nav-input"
            v-if="$route.name != 'Login'"
            class="form-control search-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
        <router-link to="/profile">
          <div v-if="$route.name != 'Login'" class="profile">
              <p v-if="getCurrentUser.name != null && getCurrentUser != ''" class="profile-name">
                {{ getCurrentUser.name }}
              </p>
              <i :class="[img == null ? 'visible' : 'invisible']" class="fas fa-user-circle"></i>
              <img :class="[img != null ? 'visible' : 'invisible']" :src="img" class="profile-image" alt="">
          </div>
        </router-link>
      </div>
    </nav>

   <NavMobile id="nav-mobile"></NavMobile>

    <router-view v-if="getRole != -1"></router-view>
    <!-- <h1>You are signed-in</h1> -->
    <nav class="navbar fixed-bottom navbar-dark bg-dark"></nav>
  </div>
 <div class="metamask" v-else>
    <a>Waiting for metamask</a>
     <div class="animation">
      <img
            class="logo-anim"
            src="@/assets/metamask.png"
          />
    </div>
  <div style="margin-top:55px;" class="spinner-border text-dark" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
    <!--  First sign in with metamask... -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { useRoute } from "vue-router";
import NavMobile from "../src/components/NavMobile.vue"
export default {
  name: "app",
  components:{
    NavMobile
  },
  data() {
    return {
      name: "",
      amount: "",
      char: "",
      img: null
    };
  },
  computed: {
    ...mapGetters("drizzle", ["drizzleInstance", "isDrizzleInitialized"]),
    ...mapGetters("contracts", ["getContractData"]),
    ...mapGetters(["getRole", "getCurrentUser"]),
    getRoute() {
      return useRoute;
    },
  },
  methods: {
    async load_image(){
      if(this.getCurrentUser == undefined || this.getCurrentUser.image == "" || this.getCurrentUser.image == undefined || this.getCurrentUser.image == null){
        this.img = null;
        return;
      }
        let img = await fetch(`http://127.0.0.1:8080/ipfs/${this.getCurrentUser.image}/`);
		    this.img = await img.text();
        this.loaded = true; // Dohvati base64URL
    },
    //Method used to check if drizzle is initialized and if it's not it will wait and check every 500ms
    async checkState() {
      let state = this.isDrizzleInitialized;
      while (!state) {
        const delay = new Promise((resolve) => setTimeout(resolve, 500));
        await delay;
        state = this.isDrizzleInitialized;
      }
    },
    //Method that fetches and updates user role from smart contract to vuex store
    async getUserRole() {
      await this.checkState();
      let sender =
        this.drizzleInstance.web3.eth.accounts.givenProvider.selectedAddress;
      if (this.isDrizzleInitialized) {
        const role = await this.drizzleInstance.contracts.RebelsFund.methods
          .getRole()
          .call({ from: sender });
        if (role == 2) {
          const user = await this.drizzleInstance.contracts.RebelsFund.methods
            .getUser()
            .call({ from: sender });
          this.$store.dispatch("setCurrentUser", user);
        } else if (role == 1) {
          const charity =
            await this.drizzleInstance.contracts.RebelsFund.methods
              .getCharity()
              .call({ from: sender });
          let obj = {
            name: charity["name"],
            adr: charity["adr"],
            monthAmount: charity["monthAmount"],
            recievedAmount: charity["recievedAmount"],
            location: charity["location"],
            email: charity["email"],
            image: charity["image"],
            category:charity["category"]
          };
          this.$store.dispatch("setCurrentUser", obj);
        }
        this.$store.dispatch("updateRole", role);
        await this.load_image();
        if (role == 0 && this.$route.name != "Login") {
          this.$router.push("/login");
        } else if (role > 0 && this.$route.name == "Login") {
          this.$router.push("/");
        }
      }
    },
    async listenMMAccount() {
      let self = this;
      window.ethereum.on("accountsChanged", async function (accounts) {
        self.getUserRole();
        self.$store.dispatch("setCurrentUser", []);
      });
    },
  },
  async mounted() {
    this.listenMMAccount();
    this.$drizzleEvents.$on("drizzle/contractEvent", (payload) => {
      //alert(payload.data.message + payload.data.name)
    });
  },
  async created() {
    await this.getUserRole();
    this.$store.dispatch("drizzle/REGISTER_CONTRACT", {
      contractName: "RebelsFund",
      method: "getAllCharity",
      methodArgs: [],
    });
    await this.load_image();
  },
};
</script>


<style lang="scss" scoped>

 @keyframes image {
0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.5, 1.5);
  }
  100% {
    transform: scale(1, 1);
  }
  }

.visible{
  opacity: 1;
  visibility: visible;
  transition: 0.5s ease;
}
.invisible{
  opacity: 0;
  position: absolute;
  visibility: hidden;
}
.navbar{
  padding: 5px;
  box-shadow: 0 0 0 4px rgb(247, 121, 121),
              0 0 10px 4px rgb(100,100,100);
  transition:0.5s;
}
.profile-image{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.animation{
  margin-top: 50px;
}
.logo-anim{
  width: 145px;
  height: 145px;
  animation-name: image;
  animation-duration: 5s;
  position: relative;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.metamask{
  text-align: center;
  font-family: var(--bs-font-sans-serif);
  font-size: 32px;
  margin-top:100px;
  font-style: italic;
}
.card-body{
  background-color: black;
}
#nav-mobile {
  display: none;
}
.brand {
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 100px;
  column-gap: 10px;
}
.search-input {
  font-size: 14px;
  text-align: center;
  height: 25px;
  width: 200px;
  transform: translate(0px, 2px);
}
.search-input:focus::placeholder {
  color: transparent;
}
.search-input::placeholder {
  text-align: center;
  font-size: 14px;
  transform: translateY(-1px);
}
.profile {
  display: flex;
  align-items: center;
  justify-content: right;
  min-width: 300px;
  column-gap: 10px;
}
.container-fluid a:link{
  text-decoration: none;
}
.profile-name {
  color: white;
  text-align: center;
  margin-bottom: 0;
  font-family: var(--bs-font-sans-serif);
  font-size: 20px;
}
.fa-home {
  color: white;
  font-size: 27px;
  margin-top: 3px;
}
.fa-home:hover {
  box-shadow: 0 2px rgb(247, 121, 121);
  transition: box-shadow 0.2s ease-in-out;
}
.logo {
  width: 46px;
  height: 55px;
  border-radius: 20%;
}
.navbar-brand {
  font-family: var(--bs-font-sans-serif);
  font-size: 29px;
  margin-left: 15px;
}
.fa-user-circle {
  color: whitesmoke;
  font-size: 40px;
}
@media (max-width: 768px) {
  @keyframes image {
     0% {
    left: 0;
  }
  50% {
    left: 100px;
  }
  100% {
    left: 0;    
  }
  }
  .logo-anim{
  width: 145px;
  height: 145px;
  animation-name: image;
  animation-duration: 4s;
  position: relative;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
  #topbar {
    display: none;
  }
  #nav-mobile {
    display: block;
    background-color: black;
  }
  .logo {
    height: 50px;
    width: 50px;
    margin: 5px;
    display: inline;
  }
  .navbar-brand{
    display: inline;
    color: whitesmoke;
    font-family: var(--bs-font-sans-serif);
  }
  .profile{
    margin-top: 10px;
    display: inline-block;
  }
  .profile-name{
    display: inline;
    margin-left: 5px;
    font-size: 25px;
  }
}
</style>
