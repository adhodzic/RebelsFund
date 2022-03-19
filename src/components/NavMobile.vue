<template>
    <div class="mobile">
         <div id="nav-mobile">
      <img
        data-bs-toggle="collapse"
        href="#collapseView"
        role="button"
        class="logo"
        src="@/assets/RebelsFundLightLogo.png"
      />
      <a class="navbar-brand"> The Rebel's Fund </a>
      <div class="collapse" id="collapseView">
        <div class="card card-body">
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
          <!--<button class="btn btn-outline-success search-btn" type="submit">Search</button>-->
        </div>
          <div v-if="$route.name != 'Login'" class="profile">
             <router-link to="/profile">
            <i class="fas fa-user-circle"></i>
          </router-link>
          <p
            v-if="getCurrentUser.name != null && getCurrentUser != ''"
            class="profile-name"
          >
            {{ getCurrentUser.name }}
          </p>
        </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { useRoute } from "vue-router";
export default {
    name:'NavMobile',
    computed: {
    ...mapGetters("drizzle", ["drizzleInstance", "isDrizzleInitialized"]),
    ...mapGetters("contracts", ["getContractData"]),
    ...mapGetters(["getRole", "getCurrentUser"]),
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
            recievedAmounth: charity["recievedAmount"],
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
    /* window.ethereum.on("accountsChanged", async function() {
        console.log();
    }); */
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
  }
}
</script>

<style lang="scss" scoped>
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
.search-btn:hover {
  border-color: rgb(247, 121, 121);
  background: rgb(247, 121, 121);
  color: rgb(33 37 41);
}
.search-btn {
  height: 25px;
  font-size: 12px;
  padding: 1px 15px 2px 15px;
  border-color: rgb(247, 121, 121);
  color: rgb(247, 121, 121);
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
  font-family: Georgia, "Times New Roman", Times, serif;
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
  width: 55px;
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