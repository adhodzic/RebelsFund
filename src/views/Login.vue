<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-md">
          <h1>Sign in as Donor</h1>
          <img id="donor-img" src="@/assets/eth.png" />
          <input
            v-model="donor_name"
            id="first-input"
            class="form-control form-control-lg"
            type="text"
            placeholder="Donor Username"
            aria-label=".form-control-lg"
          />
        </div>
        <div class="col-md">
          <h1>Sign in as Charity</h1>
          <img id="donor-img-2" src="@/assets/charity.png" />
          <input
            v-model="charity_name"
            id="first-input"
            class="form-control form-control-lg"
            type="text"
            placeholder="Organization name"
            aria-label=".form-control-lg"
          />
          <input
            v-model="charity_month_amount"
            class="form-control form-control-lg"
            type="text"
            placeholder="ETH target donnation ammount"
            aria-label=".form-control-lg"
          />
          <ImageUploader ref="image"></ImageUploader>
        </div>
      </div>

      <div class="row">
        <div  style="margin-bottom:50px;"  class="col-md">
          <button id="btn-login" @click="addAsDonor" class="btn btn-dark">
            Donor Sign in
          </button>
        </div>
        <div style="margin-bottom:50px;" class="col-md">
          <button id="btn-login" @click="addAsCharity" class="btn btn-dark">
            Charity Sign in
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ipfs from "../services/ipfs";
import { mapGetters } from "vuex";
import store from "../store/store";
import ImageUploader from "../components/ImageUploader.vue";
export default {
  components: {
    ImageUploader,
  },
  data() {
    return {
      donor_name: "",
      charity_name: "",
      charity_month_amount: "",
      location: "",
      email: ""
    };
  },
  computed: {
    ...mapGetters("drizzle", ["drizzleInstance", "isDrizzleInitialized"]),
    ...mapGetters(["getRole"]),
    utils() {
      return this.drizzleInstance.web3.utils;
    },
  },
  async beforeRouteEnter(to, from, next) {
    while (store.getters.getRole == -1) {
      const delay = new Promise((resolve) => setTimeout(resolve, 500));
      await delay;
    }
    if (store.getters.getRole == 0) {
      next();
    } else {
      next({ name: "Home" });
    }
  },
  methods: {
    //Method which is called on non existing user to register it self as a charity role
    async addAsCharity() {
      let image = await this.postImage();
	  console.log(image)
      if(image == null){
		  image = {
			  path: ""
		  }
	  }
	  console.log(image.path);
      if (this.isDrizzleInitialized) {
        if (this.charity_name != "" && this.charity_month_amount != "") {
          await this.drizzleInstance.contracts.RebelsFund.methods.signCharity(this.utils.toHex(this.charity_name),parseFloat(this.charity_month_amount),image.path, this.location, this.email).send();
          await this.$parent.getUserRole();
          this.$router.push({ name: "Home" });
        } else {
          alert("Please enter all fields");
        }
      }
    },
    //Method which is called on non existing user to register it self as a donor role
    async addAsDonor() {
      if (this.isDrizzleInitialized) {
        if (this.donor_name != "") {
          await this.drizzleInstance.contracts.RebelsFund.methods
            .signUser(this.utils.toHex(this.donor_name))
            .send();
          await this.$parent.getUserRole();
          this.$router.push({ name: "Home" });
        } else {
          alert("Please enter all fields");
        }
      }
    },
    async postImage() {
      const file = this.$refs.image.getFiles();
      if (!file) return null;
      // Dodaje sliku na IPFS te se dobiva response u kojemu se nalazi CID
      const ipfsResponse = await ipfs
        .add(file.getFileEncodeDataURL())
        .catch((err) => {
          console.log("Error: ", err);
          return;
        });
      return ipfsResponse;
    },
  },
};
</script>

<style lang="scss" scoped>
#expand {
  border-style: solid;
  border-color: gainsboro;
  border-width: 0.5px;
  color: gray;
}
h1 {
  display: inline;
}
#donor-img {
  height: 60px;
  width: 60px;
  display: inline;
  transform: translate(0px, -10px);
}
#donor-img-2 {
  height: 60px;
  width: 100px;
  display: inline;
  transform: translate(10px, -10px);
}
#first-input {
  margin-top: 20px;
}
.form-control {
  margin-bottom: 10px;
}
#btn-login {
  border-top: rgb(218, 121, 247);
  border-style: solid;
  border-width: 2px;
  color: whitesmoke;
  font-family: Georgia, "Times New Roman", Times, serif;
}
</style>
