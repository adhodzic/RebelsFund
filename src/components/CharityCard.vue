<template>
    <div class="card">
        <div class="header">
            <img id="avatar" src="@/assets/user.png">
            <p>{{card_info[0]}}</p>
            <p>{{utils.hexToUtf8(card_info[1])}}</p>
            <p>{{card_info[2]}}</p>
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

        }
    },
    mounted(){
    console.log(this.card_info)
  }
}
</script>

<style>

</style>