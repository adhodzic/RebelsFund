<template>
  <div class="profile">
    <div class="container">
      <div class="row">
        <div class="col-md">
          <img
            class="info"
            id="profile-img"
            src="https://logowik.com/content/uploads/images/753_wwf.jpg"
          />
          <div id="image-upload">
             <ImageUploader></ImageUploader>
          </div>
          <div class="shadow-lg p-3 mb-5 bg-body rounded" id="box">
            <h3 class="info" id="text-default">World Wildlife Fund</h3>
            <input type="text" class="form-control" :value="name">
            <h3 id="account">0x94Aae3fB6D4Eb2bC4DD46124A789f9273E50C962</h3>
            <i id="icon" class="fas fa-map-marker-alt"></i>
            <h3 class="info" id="text-default-2">
              Av. du Mont-Blanc 1196 ,Gland,Switzerland
            </h3>
            <input type="text" class="form-control" :value="location">
            <div id="separator"></div>
            <i id="icon" class="fas fa-envelope"></i>
            <h3 class="info" id="text-default-2">worldwildlifefund@gmail.com</h3>
            <input type="text" class="form-control" :value="email">
          </div>
        </div>
        <div class="col-md">
          <div class="shadow-lg p-3 mb-5 bg-body rounded" id="box-2">
            <h3 class="info" id="text-default-3">Our goal is to fundraise : 20 ETH</h3>
            <input type="text" class="form-control" :value="target_ammount">
            <img id="eth-img" src="@/assets/eth.png" />
            <div></div>
            <h3 id="text-default-3">Fundraised: 4 ETH</h3>
            <div id="spinner" class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="progress">
              <div
                class="progress-bar bg-success"
                role="progressbar"
                style="width: 25%"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <Settings></Settings>
      <!-- <iframe
            id="ytvideo"
            width="550"
            height="285"
            src="https://www.youtube.com/embed/Tss6HtHlLuw"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe> --->
        </div>
      </div>
      <div class="row">
        <hr class="solid">
      </div>
      <div class="row">
        <div class="col-md">
          <i @click="update_info" id="settings" class="fas fa-sliders-h fa-lg"></i>
          <button @click="save_changes" id="info-btn" type="submit" class="btn btn-dark btn-sm">Save Changes</button>
        </div>
        <div class="col-md"></div>
      </div>
      <div class="edit">
        <input type="text" />
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/store";
import { mapGetters } from "vuex";
import Settings from "../components/Settings.vue";
import ImageUploader from "../components/ImageUploader.vue"
export default {
  name: "Profile",
  data(){
    return{
      name:'World wildlife fund',
      location:' Av. du Mont-Blanc 1196 ,Gland,Switzerland',
      email:'worldwildlifefund@gmail.com',
      target_ammount:'20'
    }
  },
  components:{
    Settings,
    ImageUploader
  },
  computed: {
    ...mapGetters(["getCurrentUser"]),
    ...mapGetters("drizzle", ["drizzleInstance", "isDrizzleInitialized"]),
    utils() {
      return this.drizzleInstance.web3.utils;
    },
  },
  methods: {
    update_info(){
      var x = document.getElementsByClassName("info");
      var y = document.getElementsByClassName("form-control");
      var z = document.getElementById("info-btn");
      var v = document.getElementById("image-upload");

      for (var i=0;i<x.length;i+=1){
        x[i].style.display = 'none';
      }
      for (var i=0;i<y.length;i+=1){
        y[i].style.display = 'inline';
      }
      z.style.display = 'inline';
      v.style.display = 'inline';
      
    },
    save_changes(){
      var x = document.getElementsByClassName("info");
      var y = document.getElementsByClassName("form-control");
      var z = document.getElementById("info-btn");
      var v = document.getElementById("image-upload");

      for (var i=0;i<x.length;i+=1){
        x[i].style.display = 'inline';
      }
        for (var i=0;i<y.length;i+=1){
        y[i].style.display = 'none';
      }
       z.style.display = 'none';
       v.style.display = 'none';
    }
  },
  mounted() {
    
  },
};
</script>

<style lang="scss" scoped>
#image-upload{
  display: none;
}
#info-btn{
  color: whitesmoke;
  margin-left: 20px;
  display:none;
}
.form-control{
  display:none;
  width:400px;
  margin-bottom: 5px;
  border-color: rgb(247, 121, 121);
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
  border-style: solid;
  border-color: black;
  border-width: 1px;
  padding: 15px;
  border-radius: 10px;
}#box-2 {
  border-style: solid;
  border-color: black;
  border-width: 1px;
  padding: 15px;
  border-radius: 10px;
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
  height: 40px;
  width: 40px;
  display: inline;
  transform: translate(10px, 0px);
  margin-bottom: 15px;
}
#text-default {
  font-family: Georgia, "Times New Roman", Times, serif;
  margin-top: 10px;
  font-style: italic;
  margin-bottom: 15px;
}
#text-default-2 {
  font-family: Georgia, "Times New Roman", Times, serif;
  margin-top: 10px;
  font-style: italic;
  margin-bottom: 15px;
  font-size: 19px;
  display: inline;
}
#text-default-3 {
  font-family: Georgia, "Times New Roman", Times, serif;
  margin-top: 15px;
  font-style: italic;
  margin-bottom: 15px;
  display: inline;
  font-size: 24px;
}
#icon {
  display: inline;
  margin-right: 10px;
  margin-top: 10px;
}
#separator {
  margin-bottom: 15px;
}
#account {
  font-size: 19px;
  opacity: 0.7;
  font-family: Georgia, "Times New Roman", Times, serif;
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