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
            v-if="$route.name == 'Home'"
            class="form-control search-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
        <div v-if="$route.name != 'Login'" class="profile">
          <p
            v-if="getCurrentUser.name != null && getCurrentUser != ''"
            class="profile-name"
          >
            {{ utils.toUtf8(getCurrentUser.name) }}
          </p>
          <router-link to="/profile">
            <i class="fas fa-user-circle"></i>
          </router-link>
        </div>
      </div>
    </nav>

   <NavMobile id="nav-mobile"></NavMobile>

    <router-view v-if="getRole != -1"></router-view>
    <!-- <h1>You are signed-in</h1> -->
    <nav class="navbar fixed-bottom navbar-dark bg-dark"></nav>
  </div>
 <div class="metamask" v-else>
    <a>Waiting for metamask</a>
    <div style="margin-left:15px;" class="spinner-border text-dark" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
     <div class="animation">
      <img
            class="logo-anim"
            src="@/assets/metamask.png"
          />
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
    };
  },
  computed: {
    ...mapGetters("drizzle", ["drizzleInstance", "isDrizzleInitialized"]),
    ...mapGetters("contracts", ["getContractData"]),
    ...mapGetters(["getRole", "getCurrentUser"]),
    utils() {
      return this.drizzleInstance.web3.utils;
    },
    getRoute() {
      return useRoute;
    },
  },
  methods: {
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
        console.log(role);
        if (role == 2) {
          const user = await this.drizzleInstance.contracts.RebelsFund.methods
            .getUser()
            .call({ from: sender });
          console.log(user);
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
            image: charity["image"]
          };
          this.$store.dispatch("setCurrentUser", obj);
        }
        this.$store.dispatch("updateRole", role);
        if (role == 0 && this.$route.name != "Login") {
          this.$router.push("/login");
        } else if (role > 0 && this.$route == "Login") {
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
  mounted() {
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
  },
};
</script>


<style lang="scss" scoped>

 @keyframes image {
     0% {
    left: 0;
  }
  50% {
    left: 200px;
  }
  100% {
    left: 0;    
  }
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
  justify-content: center;
  column-gap: 10px;
}
.profile-name {
  color: white;
  text-align: center;
  margin-bottom: 6px;
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
#topbar {
  border-bottom: rgb(247, 121, 121);
  border-style: solid;
}
.fa-user-circle {
  color: whitesmoke;
  font-size: 35px;
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
