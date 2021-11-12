<template>
    <div class="card">
        <div class="header">
            <i class="fas fa-users avatar"></i>
            Account: <p>{{card_info[0]}}</p>
            Name: <p>{{utils.hexToUtf8(card_info[1])}}</p>
            Month amount: <p>{{card_info[2]}}</p>
            Progress: <p>{{card_info[3]}}</p>
            <input v-model="donate_ammount">
            <button @click="donate()">Donate</button>
        </div>
        <div class="footer"></div>
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
        }
    },
    data(){
        return{
            donate_ammount: ""
        }
    },
    methods:{
        donate(){
            this.$parent.donate(this.card_info[0], this.donate_ammount)
            this.donate_ammount = ""
        }
    },
    mounted(){
    console.log(this.card_info)
  }
}
</script>

<style scoped>
.avatar{
  font-size: 30px;
  color: black;
}
.avatar:hover{
  cursor: pointer;
}
</style>