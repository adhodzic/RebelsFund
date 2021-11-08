<template>
  <div class="home">
    <div class="container">
      <div v-bind:key="c[0]" v-for="c in getCharitys">
        <CharityCard v-bind:card_info="c"></CharityCard>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/store'
import { mapGetters } from "vuex"
import CharityCard from "../components/CharityCard.vue"
export default {
  name: 'Home',
  computed: {
    ...mapGetters("drizzle", ["drizzleInstance", "isDrizzleInitialized"]),
    ...mapGetters(["getRole", "getCharitys"])
  },
  components: {
    CharityCard
  },
  methods: {
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
          console.log(charitys)
          this.$store.dispatch("updateCharitys", charitys);  
        }
    },
  },
  async mounted(){
    await this.getAllCharity();
    console.log(this.getCharitys)
  }
}
</script>
