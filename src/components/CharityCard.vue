<template>

<div class="card" style="width: 18rem;">
  <img src="https://logowik.com/content/uploads/images/753_wwf.jpg" class="card-img-top" alt="...">
  <div class="card-body">
    <hr class="solid">
    <h5 id="title-text" class="card-title">{{utils.hexToUtf8(card_info["name"])}}</h5>
    <p id="account-text" class="card-text">{{card_info["adr"]}}</p>
    <p id="target-ammount-text" class="card-text">Target Ammount : {{card_info["monthAmount"]}} ETH</p>
    <img id="donor-img" src="@/assets/eth.png">
    <div class="progress">
        <div class="progress-bar progress-bar-striped bg-success" v-bind:style="{width: calculate_percentage + '%'}" role="progressbar" :aria-valuenow="calculate_percentage" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
     <input v-model="donate_ammount" id="input-bar" class="form-control" placeholder="Ammount to donate (ETH)">
    <a @click="donate()" id="donate-button" href="#" class="btn btn-dark" style="visibility: visible;">Donate</a>
     <img id="info-img" src="@/assets/info.png">
  </div>
</div>
</template>

<script>
import { mapGetters } from "vuex"
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
            donate_ammount: ""
        }
    },
    methods:{
        donate(){
            this.$parent.donate(this.card_info.adr, this.donate_ammount)
            this.donate_ammount = ""
        },
        check_ammount(){
            if(this.calculate_percentage >= 100){
                document.getElementById("donate-button").style.visibility="hidden"   
            }
        }
    },
    mounted(){
    console.log("Card Info: ",this.card_info)
    this.check_ammount()
  }
}
</script>

<style lang="scss" scoped>
*, ::before, ::after {
    background-repeat: repeat;
    box-sizing: inherit;
}
.card{
    border-style: solid;
    border-color: rgb(75, 75, 75);
}
.card-body{
    background-color: rgb(248, 248, 248);   
}
hr.solid{
    border: 1px solid rgb(0, 0, 0);
}
#account-text{
    font-size: 14px;
    opacity: 0.7;
    font-family:Georgia, 'Times New Roman', Times, serif;
}
#target-ammount-text{
    font-family:Georgia, 'Times New Roman', Times, serif;
    display: inline;
}
#title-text{
    font-family:Georgia, 'Times New Roman', Times, serif;
}
#input-bar{
    width: 220px;
    margin-bottom: 20px;
    margin-top: 10px;
    border-style: solid;
    border-color:rgb(218, 121, 247);
}
#donor-img{
    height: 40px;
    width: 40px;
    display: inline;
}
#info-img{
    height: 30px;
    width: 30px;
    display: inline;
    transform: translate(140px,0px);
}
#info-img:hover{
    cursor: pointer;
    }
#progress-bar{
    margin-top: 10px;
    margin-bottom: 20px;
}
#donate-button{
    display: inline;
}
</style>