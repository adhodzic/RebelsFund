<template>
  <div class="profile">
    <div class="container">
      <div class="row">
        <div style="align-text: center; min-width: 650px;" class="col-md">
          <img v-if="image"
              id="profile-img"
              :src="image"
            />
        </div>
        <div v-if="getRole == 1" class="col-md"></div>
      </div>
      <div class="row">
        <div class="col-md">
          <div class="shadow-lg p-3 mb-5 bg-body" :class="[!edit_mode ? 'visible' : '']" id="box">
            <div class="general-header">
              <p class="header-title">General information</p>
              <div class="tools">
                <i id="icon" class="fas fa-cog" :class="[edit_mode ? 'invisible' : 'visible']" @click="update_info"></i>
                <i id="icon" class="fas fa-times" :class="[edit_mode ? 'visible' : 'invisible']" @click="close"></i>
              </div>
            </div>

            <div id="separator"></div>

            <div class="inline-row">
              <div id="icon">
                <i class="fas fa-user"></i>
              </div>
              <p class="info" style="width: 100px;">Name:</p>
              <p :class="[edit_mode ? 'invisible' : 'visible']" class="info">{{getName}}</p>
              <i :class="[edit_mode ? 'invisible' : 'visible']" class="far fa-question-circle" :cont="getAddress"></i>
              <!--If in edit mode show input-->
              <input :class="[edit_mode ? 'visible' : 'invisible']" type="text" class="form-control" v-model="name">
            </div>
            <div id="separator"></div>
            <div class="inline-row">
              <div id="icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <p class="info" style="width: 100px;">Address:</p>
              <p :class="[edit_mode ? 'invisible' : 'visible']" class="info">{{getLocation}}</p>
              <!--If in edit mode show input-->
              <input :class="[edit_mode ? 'visible' : 'invisible']" type="text" class="form-control" v-model="location">
            </div>
            <div id="separator"></div>
            <div class="inline-row">
              <i id="icon" class="fas fa-envelope"></i>
              <p class="info" style="width: 100px;">Email:</p>
              <p :class="[edit_mode ? 'invisible' : 'visible']" class="info">{{getEmail}}</p>
              <!--If in edit mode show input-->
              <input :class="[edit_mode ? 'visible' : 'invisible']" type="text" class="form-control" v-model="email">
            </div>
            <div id="separator"></div>
            <ImageUploader :class=" [edit_mode ? 'visible' : 'invisible']" ref="pond"></ImageUploader>
            <div id="separator"></div>
            <div class="inline-row">
                <button :class="[edit_mode ? 'visible' : 'invisible']" type="button" @click="save_changes" class="btn save-btn m-2">Save</button>
                <button :class="[edit_mode ? 'visible' : 'invisible']" type="button" @click="close" class="btn cancel-btn m-2">Cancel</button>
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
              <i id="icon" class="fas fa-bullseye"></i>
              <p class="info" style="width: 100px;">Goal:</p>
              <p v-if="!edit_mode" class="info">{{getCurrentUser.monthAmount}}</p>
              <input v-if="edit_mode" v-model="target_amount" type="text" class="form-control">
              <img id="eth-img" src="@/assets/eth.png" />
            </div>
            <div id="separator"></div>
              <div class="inline-row">
                <i id="icon" class="fab fa-ethereum"></i>
                <p class="info" style="width: 100px;">Fundraised:</p>
                <p class="info">{{getCurrentUser.recievedAmount/1e18}}</p>
                <img id="eth-img" src="@/assets/eth.png" />
            </div>
            <div class="progress">
              <div
                class="progress-bar-striped bg-success"
                role="progressbar"
                :style="{width: calculate_percentage + '%'}"
                aria-valuenow="calculate_percentage"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>   
      </div>
    </div>
  </div>
</template>

<script>
import ipfs from "../services/ipfs";
import { mapGetters } from "vuex";
import Settings from "../components/Settings.vue";
import ImageUploader from "../components/ImageUploader.vue"
export default {
  name: "Profile",
  data(){
    return{
      name: "",
      location:"",
      email:"",
      target_amount: "",
      edit_mode:false,
      image: ""
    }
  },
  components:{
    Settings,
    ImageUploader
  },
  computed: {
    ...mapGetters(["getRole","getCurrentUser"]),
    ...mapGetters("drizzle", ["drizzleInstance", "isDrizzleInitialized"]),
    ...mapGetters("contracts", ["getContractData"]),
    calculate_percentage(){
      return ((this.getCurrentUser.recievedAmount/1e18)/this.getCurrentUser.monthAmount)*100
    },
    getName() {
      if(this.getCurrentUser.name)return this.getCurrentUser.name
      else ""
    },
    getEmail(){
      return this.getCurrentUser.email
    },
    getLocation(){
      return this.getCurrentUser.location
    },
    getAddress(){
      return this.getCurrentUser.adr
    }
  },
  methods: {
    update_info(){
      this.name = this.getCurrentUser.name;
      this.location = this.getCurrentUser.location;
      this.email = this.getCurrentUser.email;
      this.target_amount = this.getCurrentUser.monthAmount;
      this.edit_mode = true;  
    },
    async save_changes(){
      if(this.getRole == 1){
        await this.updateCharity();
      }else{
        await this.updateDonor();
      }
      this.edit_mode = false;
    },
    close(){
      this.edit_mode = false;
    },
    async updateCharity(){
      await this.$parent.checkState();
      let image = await this.postImage();
      if(image == null){
        image = {
          path: this.getCurrentUser.image
        }
      }
      if (this.isDrizzleInitialized) {
        if(this.getRole == 1){
          await this.drizzleInstance.contracts.RebelsFund.methods.updateCharity(this.name, parseFloat(this.target_amount), image.path, this.location, this.email).send();
        }else if(this.getRole == 2){
          await this.drizzleInstance.contracts.RebelsFund.methods.updateDonor(this.name, this.location, this.email).send();
        }
      }
      this.$parent.getUserRole();
      this.load_image();
    },
    async postImage() {
      const file = this.$refs.pond.getFiles();
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
    async load_image(){
      if(this.getCurrentUser.image == "" || this.getCurrentUser.image == undefined){ this.image = "@/assets/RebelsFundLightLogo.png"; return;}
      let img = await fetch(`http://127.0.0.1:8080/ipfs/${this.getCurrentUser.image}/`);
      this.image = await img.text();
      this.loaded = true; // Dohvati base64URL
    }
  },
  async mounted() {
    await this.$parent.getUserRole();
    await this.load_image();
  },
};
</script>

<style lang="scss">
*, :after, :before {
  background-repeat: repeat;
}
.visible{
  opacity: 1;
}
.invisible{
  transition: 0.3s;
  opacity: 0;
}
.tools{
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
}
.info.invisible{
  visibility: hidden;
  position: absolute;
  transition: none;
}
.fa-question-circle.invisible{
  visibility: hidden;
  position: absolute;
  transition: none;
}
.fa-times{
  position: absolute;
}
.fa-times.invisible{
  transform: rotate(-180deg);
}
.fa-cog.invisible{
  transform: rotate(180deg);
}
.shadow-lg.visible{
  max-height: 260px !important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.save-btn{
  background: rgb(193, 255, 169);
  width: 50%;
  color: rgb(0, 0, 0);
}
.save-btn:hover{
  background: rgb(131, 202, 103);
}
.cancel-btn{
  background: rgb(255, 186, 169);
  width: 50%;
  color: rgb(0, 0, 0);
}
.cancel-btn:hover{
  background: rgb(207, 136, 119);
}
.col-md{
  max-width: 650px;
}
.row{
  justify-content: center;
}
.info{
  padding-left: 13px;
  text-align: left;
  line-height: -2px;
  min-width: 50px;
  margin: 0;
}
.header-title{
  font-size: 20px;
  margin: 0;
}
.inline-row{
  display: flex;
  min-height: 40px;
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
  justify-self: center;  
  outline: none;
  max-width: 300px;
}
.form-control.invisible{
  display: none;
  transition: 0.5s;
}
.form-control.visible{
  transition: 0.5s;
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
  border-radius: 15px;
  transition:max-height 0.5s ease; // note that we're transitioning max-height, not height!
  height:auto;
  max-height:850px;
  overflow: hidden;
}#box-2 {
  padding: 15px;
  border-radius: 10px;
  transition:max-height 0.5s ease; // note that we're transitioning max-height, not height!
  height:auto;
  max-height:600px;
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
  display: block;
  width: auto;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
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