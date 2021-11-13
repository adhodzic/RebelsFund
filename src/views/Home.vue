<template>
  <div class="home">
    <div class="flex-container">
      <div v-bind:key="c[0]" v-for="c in getCharitys">
        <CharityCard v-bind:card_info="c"></CharityCard>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import CharityCard from "../components/CharityCard.vue"
export default {
  name: 'Home',
  computed: {
    ...mapGetters("drizzle", ["drizzleInstance", "isDrizzleInitialized"]),
    ...mapGetters(["getRole","getCharitys"])
  },
  components: {
    CharityCard
  },
  methods: {
    async donate(account, donate_ammount){
      await this.checkState();
      if (this.isDrizzleInitialized) {
          let ether = 1000000000000000000;
          donate_ammount *= ether;
          await this.drizzleInstance.contracts.RebelsFund.methods.transferEther(account).send({value: donate_ammount})
          await this.getAllCharity()
      }       
    },
    async checkState(){
			let state = this.isDrizzleInitialized;
			while(!state){
				const delay = new Promise(resolve => setTimeout(resolve, 500));
				await delay;
				state = this.isDrizzleInitialized;
			}
		},
    async getAllCharity(){
        await this.checkState();
        if (this.isDrizzleInitialized) {
          const charitys = await this.drizzleInstance.contracts.RebelsFund.methods.getAllCharity().call();
          this.$store.dispatch("updateCharitys", charitys);
          console.log(charitys)
        }
    },
  },
  async mounted(){
    await this.getAllCharity();
  }
}
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-left: 40px;
}

.flex-container > div {
  margin-right: 35px;
  margin-bottom: 20px;
}
</style>