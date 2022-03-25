<template>
  <div class="profile">
    <div class="container">
      <div style="justify-content: center;" class="row">
            <img v-if="image"
              id="profile-img"
              :src="image"
            />
      </div>
      <div class="row">
        <div class="col-md">
          <div class="shadow-lg p-3 mb-5 bg-body rounded" id="box">
            <div class="general-header">
              <p class="header-title">General information</p>
            </div>
            <div id="separator"></div>
            <div class="inline-row">
              <div id="icon">
                <i class="fas fa-user"></i>
              </div>
              <p class="info" style="width: 100px;">Name:</p>
              <p class="info">{{user.name}}</p>
              <i class="far fa-question-circle" :cont="user.adr"></i>
            </div>
            <div id="separator"></div>
            <div class="inline-row">
              <div id="icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <p class="info" style="width: 100px;">Address:</p>
              <p class="info">{{user.location}}</p>
            </div>
            <div id="separator"></div>
            <div class="inline-row">
              <i id="icon" class="fas fa-envelope"></i>
              <p class="info" style="width: 100px;">Email:</p>
              <p class="info">{{user.email}}</p>
            </div>
             <div id="separator"></div>
              <div class="inline-row">
              <i id="icon" class="fas fa-heart"></i>
              <p class="info" style="width: 100px;">Category:</p>
              <p class="info">{{user.category}}</p>
            </div>
          </div>

            <div class="shadow-lg p-3 mb-5 bg-body rounded" id="box">
            <div class="general-header">
              <p class="header-title">Promotional video</p>
            </div>
            <div id="separator"></div>
            <div class="yt-container">
                <iframe :src="embededYtLink"
                class="ytvideo" 
                allow="accelerometer; autoplay; 
                clipboard-write; encrypted-media; 
                gyroscope; picture-in-picture" 
                allowfullscreen></iframe>
            </div>
          </div>


        </div>
        <div v-if="getRole == 1" class="col-md">
          <div class="shadow-lg p-3 mb-5 bg-body rounded" id="box">
            <div class="general-header">
              <p class="header-title">Funding information</p>
            </div>
            <div id="separator"></div>
            <div class="inline-row">
              <i id="icon" class="fas fa-coins"></i>
              <p class="info" style="width: 100px;">Ether:</p>
              <p class="info">{{getCurrentUser.monthAmount}}</p>
              <img id="eth-img" src="@/assets/eth.png" />
            </div>
            <div id="separator"></div>
              <div class="inline-row">
              <p class="info">Fundraised: {{user.recievedAmount}} ETH</p>
            <img id="eth-img" src="@/assets/eth.png" />
            </div>
            <div class="progress">
              <div class="progress-bar progress-bar-striped bg-success" v-bind:style="{width: calculate_percentage + '%'}" role="progressbar" :aria-valuenow="calculate_percentage" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/store";
import ipfs from "../services/ipfs";
import { mapGetters } from "vuex";
import Settings from "../components/Settings.vue";
import ImageUploader from "../components/ImageUploader.vue"
export default {
  name: "Profile",
  data(){
    return{
      user: {},
      target_amount: "",
      edit_mode:false,
      image: ""
    }
  },
  components:{
    
  },
  computed: {
    ...mapGetters(["getRole","getCurrentUser"]),
    ...mapGetters("drizzle", ["drizzleInstance", "isDrizzleInitialized"]),
    ...mapGetters("contracts", ["getContractData"]),
    utils() {
      return this.drizzleInstance.web3.utils;
    },
    calculate_percentage(){
      return ((this.user.recievedAmount/1e18)/this.user.monthAmount)*100
    },
    embededYtLink(){
      let url = this.user.ytLink
      if(!url) return
      if(url.includes("/embed/")) return url

      var urlId = url.substring(
        url.indexOf("v=") + 2, 
        url.indexOf("v=") + 13);
      let embedLink = `https://www.youtube.com/embed/${urlId}`

      return embedLink
    }
  },
  methods: {
    async load_user(adr){
      const user = await this.drizzleInstance.contracts.RebelsFund.methods.getOneCharity(adr).call();
      this.user = user
      console.log("USER",user)
    },
      async load_image(){
      if(this.getCurrentUser.image == "" || this.getCurrentUser.image == undefined){ this.image = "@/assets/RebelsFundLightLogo.png"; return;}
      let img = await fetch(`http://127.0.0.1:8080/ipfs/${this.getCurrentUser.image}/`);
      this.image = await img.text();
      this.loaded = true; // Dohvati base64URL
    }
  },
  mounted() {
    this.load_user(this.$route.params.id)
    this.load_image();
  },
};
</script>

<style lang="scss">
.yt-container{
  position: relative;
  overflow: hidden;
  width: 100%;
}
.ytvideo{

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 300px;
}
*, :after, :before {
  background-repeat: repeat;
}
.col-md{
  max-width: 650px;
}
.info{
  padding-left: 13px;
  text-align: left;
  line-height: -2px;
  margin: 0;
}
.header-title{
  font-size: 20px;
  margin: 0;
}
.inline-row{
  display: flex;
  height: 38px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.general-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  box-shadow: 0 10px 0  rgb(255, 255, 255),
              0 14px 0 0 rgb(144, 144, 144);
}
.fa-question-circle{
  margin-left: 5px;
  margin-right: 5px;
}
.fa-question-circle::after{
  content: "";
  opacity: 0;
  position: absolute;
  width: auto;
  height: 24px;
  font-size: 14px;
  margin-left: 10px;
  padding: 5px;
  background: rgb(245, 245, 245);
  border-radius: 5px;
  border: 1px solid rgb(82, 82, 82);
  
}
.fa-question-circle:hover::after{
  content: attr(cont);
  opacity: 1; 
  transform: translateY(-2px);
  transition: all 0.2s ease-in-out;
}
#save-btn{
  margin-top: 15px;
  color: whitesmoke;
  margin-left: 20px;
}
.form-control{
  display: inline;
  outline: none;
  width:80%;
}
.form-control:focus{
  border-color: none;
  box-shadow: 0 0 1px 1px rgb(221, 221, 221),
              0px 0px 10px 1px rgb(167, 216, 255);

}
#settings:hover{
  cursor:pointer;
}
hr{
  border-top: 3px solid rgb(218, 121, 247);
}
#expand {
  border-style: solid;
  border-color: black;
  border-width: 0.5px;
  color: black;
}
#box {
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 10px;
  transition: all 2s ease-in-out;
}#box-2 {
  padding: 15px;
  border-radius: 10px;
  transition: all 2s ease-in-out;
}
.progress {
  margin-top: 25px;
}
#spinner {
  margin-left: 15px;
  height: 20px;
  width: 20px;
}
#profile-img {
  height: 300px;
  width: 400px;
  border-radius: 4px;
  max-width: 100%;
  height: auto;
}
#eth-img {
  height: 25px;
  width: 25px;
}
#text-default {
  font-family: var(--bs-font-sans-serif);
  margin-top: 10px;
  margin-bottom: 15px;
  display: inline;
}
#text-default-2 {
  font-family: var(--bs-font-sans-serif);
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  display: inline;
}
#text-default-3 {
  font-family: var(--bs-font-sans-serif);
  margin-top: 15px;
  margin-bottom: 15px;
  display: inline;
  font-size: 16px;
}
#icon {
  text-align: center;
  color: rgb(144, 144, 144);
  width:30px;
  font-size: 20px;
}
#separator {
  margin-bottom: 15px;
}
#account {
  font-size: 12px;
  opacity: 0.7;
  font-family: var(--bs-font-sans-serif);
  margin-left: 10px;
  transform: translate(-10px, 0px);
  margin-bottom: 15px;
}
@media (max-width: 768px){
  .form-control{
  display:none;
  width:250px;
  margin-bottom: 5px;
}
  #account{
    font-size: 12px;
  }
  #text-default-2{
    font-size: 15px;
  }
  #ytvideo{
    max-width: 100%;
  }
}
</style>