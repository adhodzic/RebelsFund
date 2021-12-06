<template>

<div class="card" style="width: 18rem;">
  <img :src="img" class="card-img-top" style="height:180px;" alt="...">
  <div class="card-body">
    <h5 id="title-text" class="card-title">{{utils.hexToUtf8(card_info["name"])}}</h5>
    <p id="account-text" class="card-text">{{card_info["adr"]}}</p>
    <p class="card-text target-ammount-text">Progress: {{card_info["recievedAmount"]/1000000000000000000}} / {{card_info["monthAmount"]}} ETH</p>
    <div class="progress">
        <div class="progress-bar progress-bar-striped bg-success" v-bind:style="{width: calculate_percentage + '%'}" role="progressbar" :aria-valuenow="calculate_percentage" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
     <input v-model="donate_ammount" class="form-control input-bar" placeholder="Amount to donate (ETH)">
     <div class="footer">
        <a @click="donate()" id="donate-button" href="#" class="btn btn-dark" style="visibility: visible;">Donate</a>
        <i @click="goDetails()" class="fas fa-info-circle"></i>
     </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from "vuex"
import image from "../assets/RebelsFundLightLogo.png"
export default {
    name: "CharityCard",
    props: ["card_info"],
    computed:{
        ...mapGetters("drizzle", ["drizzleInstance", "isDrizzleInitialized"]),
        utils() {
            return this.drizzleInstance.web3.utils
        },
        calculate_percentage(){
            return ((this.card_info.recievedAmount/1e18)/this.card_info.monthAmount)*100
        },
    },
    data(){
        return{
            donate_ammount: "",
            value: 20,
            loaded: false,
            img: image
        }
    },
    methods:{
        goDetails(){
            if (this.$route.name !== "Fund-details"){
            this.$router.push({path: `/${this.card_info.adr}`})
            }
        },
        donate(){
            this.$parent.donate(this.card_info.adr, this.donate_ammount)
            this.donate_ammount = ""
        },
        check_ammount(){
            if(this.calculate_percentage >= 100){
                document.getElementById("donate-button").style.visibility="hidden"   
            }
        },
        async load_image(){
            console.log(this.card_info.image)
            if(this.card_info.image == "") return;
            let img = await fetch(`http://127.0.0.1:8081/ipfs/${this.card_info.image}/`);
		    this.img = await img.text();
            this.loaded = true; // Dohvati base64URL
        }
    },
    mounted(){
    this.load_image();
    console.log("Card Info: ",this.card_info)
    this.check_ammount()
  }
}
</script>

<style lang="scss" scoped>
.fas:hover{
    cursor: pointer;
}
*, ::before, ::after {
    background-repeat: repeat;
    box-sizing: inherit;
}
.card{
    border-radius: 15px;
    box-shadow: 2px 5px 10px 10px rgb(185, 185, 185);
    overflow:hidden;
}
.card-body{
    background-color: rgb(241, 241, 241);   
}
.fa-info-circle{
    font-size: 30px;
}
.footer{
    display: flex;
    align-items: center;
    justify-content: space-between;

}
#account-text{
    font-size: 12px;
    opacity: 0.7;
    font-family: var(--bs-font-sans-serif);
}
.target-ammount-text{
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 14px;
    color: rgb(31, 31, 31);
    font-family: var(--bs-font-sans-serif);
}
#title-text{
    font-size: 24px;
    font-family: var(--bs-font-sans-serif);
}
.input-bar{
    width: 100%;
    margin-bottom: 20px;
    margin-top: 10px;
    border-style: solid;
    border-color:rgb(247, 121, 121);
}
#donor-img{
    height: 40px;
    width: 40px;
    display: inline;
}
#info-img:hover{
    cursor: pointer;
    }
#progress-bar{
    margin-top: 10px;
    margin-bottom: 20px;
}
</style>