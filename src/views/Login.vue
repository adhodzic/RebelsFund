<template>
  <div class="login">
    <div style="margin-top: 50px;" class="container">
      <div style="margin-bottom: 20px;" class="row">
        <div class="col-md title">
          <h1><b>Sign Up</b></h1>
        </div>
      </div>
      <div style="margin-bottom: 20px;" class="row">
        <div class="col-md form" :class="[type == 'donor' ? 'donor' : '']">
          <div :class="[type == 'donor' ? 'invisible' : 'visible']">
            <input
              v-model="donor_name"
              id="first-input"
              class="form-control form-control-md"
              type="text"
              placeholder="Username"
              aria-label=".form-control-md"
              maxlength="16"
            />
            <input
              v-model="email"
              class="form-control form-control-md"
              type="text"
              placeholder="Email"
              aria-label=".form-control-md"
            />
            <date-picker
              id="date"
              class=""
              placeholder="Date of birth"
              v-model="time1"
              valueType="format"
            ></date-picker>
            <country-select
              id="select"
              class="form-control"
              v-model="country"
              :country="country"
              topCountry="US"
            />
            <region-select
              id="select"
              class="form-control"
              v-model="region"
              :country="country"
              :region="region"
            />
            <button @click="addAsDonor" class="btn success">Save</button>
          </div>
          <div :class="[type == 'donor' ? 'visible' : 'invisible']">
            <input
            v-model="charity_name"
            id="first-input"
            class="form-control form-control-md"
            type="text"
            placeholder="Organization name"
            aria-label=".form-control-md"
            maxlength="16"
          />
          <input
            v-model="charity_email"
            class="form-control form-control-md"
            type="text"
            placeholder="Organization email"
            aria-label=".form-control-md"
          />
          <input
            v-model="location"
            class="form-control form-control-md"
            type="text"
            placeholder="HQ address"
            aria-label=".form-control-md"
          />
          <input
            v-model="charity_month_amount"
            class="form-control form-control-md"
            type="text"
            placeholder="Donnation goal (ETH)"
            aria-label=".form-control-md"
          />
          <select
            v-model="selected"
            class="form-select form-select-lg mb-3"
            aria-label=".form-select-md example"
          >
            <option v-for="cat in categories" v-bind:key="cat">
              {{ cat }}
            </option>
          </select>
          <input
            v-model="yt_link"
            class="form-control form-control-md"
            type="text"
            placeholder="Link to Youtube video"
            aria-label=".form-control-md"
          />
          <button @click="addAsCharity" class="btn success">Save</button>
          </div>
        </div>
        <div class="col-md header" :class="[type == 'donor' ? 'donor' : '']">
          <div :class="[type == 'donor' ? 'visible' : 'invisible']">
            <h1>Charity</h1>
            <h6>or</h6>
            <button id="donor" @click="switchToCharity" class="btn btn-dark">Sign up as donor</button>
          </div>
          <div :class="[type == 'donor' ? 'invisible' : 'visible']">
            <h1>Donor</h1>
            <h6>or</h6>
            <button id="donor" @click="switchToDonor" class="btn btn-dark">Sign up as charity</button>
          </div>
        </div>
      </div>
      <div class="row">
        <ImageUploader ref="image"></ImageUploader>
      </div>
    </div>
  </div>
</template>

<script>
import ipfs from "../services/ipfs";
import { mapGetters } from "vuex";
import store from "../store/store";
import ImageUploader from "../components/ImageUploader.vue";
import Sheet from "../components/Sheet.vue";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  components: {
    ImageUploader,
    Sheet,
    DatePicker,
  },
  data() {
    return {
      type: "charity",
      donor_name: "",
      charity_name: "",
      charity_email:"",
      charity_month_amount: "",
      yt_link:"",
      location: "",
      email: "",
      country: "",
      region: "",
      time1: null,
      time2: null,
      time3: null,
      selected: "",
      categories: {
        select1: "Education",
        select2: "Animals",
        select3: "Environment",
        select4: "Children & Youth",
        select5: "Disasters & Conflict",
        select6: "Human Rights",
        select7: "Healthcare",
      },
    };
  },
  computed: {
    ...mapGetters("drizzle", ["drizzleInstance", "isDrizzleInitialized"]),
    ...mapGetters(["getRole"]),
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
    switchToDonor(){
      this.type = "donor";
    },
    switchToCharity(){
      this.type = "charity";
    },
    //Method which is called on non existing user to register it self as a charity role
    async addAsCharity() {
      let image = await this.postImage();
      if (image == null) {
        image = {
          path: "",
        };
      }
      if (this.isDrizzleInitialized) {
        if (this.charity_name != "" && this.charity_month_amount != "") {
          console.log("SELECTED",this.selected)
          await this.drizzleInstance.contracts.RebelsFund.methods
            .signCharity(
              this.charity_name,
              parseFloat(this.charity_month_amount),
              image.path,
              this.location,
              this.charity_email,
              this.yt_link,
              this.selected
            )
            .send();
          await this.$parent.getUserRole();
          this.$router.push({ name: "Home" });
        } else {
          alert("Please enter all fields");
        }
      }
    },
    //Method which is called on non existing user to register it self as a donor role
    async addAsDonor() {
      let image = await this.postImage();
      if (image == null) {
        image = {
          path: "",
        };
      }
      if (this.isDrizzleInitialized) {
        if (this.donor_name != "") {
          await this.drizzleInstance.contracts.RebelsFund.methods
            .signUser(this.donor_name, this.location, this.email, image.path,this.country,this.region,this.time1)
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
.visible{
  visibility: visible;
  opacity: 1;
  width: 100%;
  transition: visibility 0s, opacity 1s ease;
}
.invisible{
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 1s ease;
}
.container{
  width: 1000px;
}
.btn-dark{
  font-size: 14px;
}
.col-md{
  margin: 0;
  padding: 0;
}
.col-md.form{
  height: 300px;
}
.col-md.header{
  height: 300px;
}
.col-md.title{
  text-align: center;
  font-family: var(--bs-font-sans-serif);
  color: rgb(47, 47, 47);
}
.btn.success{
  width: 100%;
  background: rgb(47, 47, 47);
  color: rgb(255, 255, 255);
}
.form-select{
  font-size: 14px;
  padding: 6px 36px 6px 12px;
  margin-bottom: 10px !important;
}
.form{
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px 0 0 10px;
  padding-left: 15px;
  padding-right: 15px;
  transition: 0.8s;
}
.form div.invisible{
  position: absolute;
}
.header{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgb(247, 121, 121);
  border-radius: 0 10px 10px 0;
  box-shadow: 0 0 20px 1px rgb(179, 179, 179);
  transition: 0.8s;
}
.header h1 {
  height: fit-content;
  color: rgb(47, 47, 47);
}
.header h4 {
  color: rgb(47, 47, 47);
}
.header.donor{
  margin-left: 0;
  padding-left: 0;
  padding-right: 15px;
  border-radius: 10px 0 0 10px;
  transform: translateX(-100%);
}
.header div{
  position: absolute;
  text-align: center;
}
.form.donor{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0;
  padding-right: 0;
  border-radius: 0 10px 10px 0;
  transform: translateX(100%);
}
.form-select {
  color: gray;
}
#date {
  width: 100%;
  margin-bottom: 10px;
}
#select {
  color: rgb(119, 119, 119);
}
.sheet {
  margin-bottom: 20px;
}
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
input::placeholder{
  font-size: 14px;
}
#first-input {
  margin-top: 20px;
}
.form-control {
  width: 100% !important;
  max-width: 100% !important;
  margin-bottom: 10px;
  font-size: 14px;
}
#btn-login {
  border-top: rgb(247, 121, 121);
  border-style: solid;
  border-width: 2px;
  color: whitesmoke;
  font-family: var(--bs-font-sans-serif);
}

@media (max-width: 768px) {
  .col-md.title{
    text-align: justify;
    margin-left:20px;
  }
  .col-md.form{
    width: 350px;
  }
}
</style>
