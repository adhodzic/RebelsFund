<template>
  <div class="home" >
    <div class="flex-container">
      <div v-if="!filterCharitys || !filterCharitys.length">
        <h4>No charitys found...</h4>
      </div>
      <div v-else v-bind:key="c._id" v-for="c in filterCharitys">
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
  props:['search'],
  computed: {
    ...mapGetters("drizzle", ["drizzleInstance", "isDrizzleInitialized"]),
    ...mapGetters(["getRole","getCharitys"]),
    filterCharitys(){
      let charityArray = this.getCharitys;
      let filter = charityArray.filter(charity => {
        if(charity.name.includes(this.search)){
          console.log(charity.name)
          return charity
        }
      })
      return filter;
    }
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
