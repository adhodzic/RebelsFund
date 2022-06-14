<template>
  <div class="settings">
    <h4 style="margin-bottom: 20px">Account Settings</h4>
    <!--------------------------------------->
    <v-expansion-panels id="panel-box">
      <v-expansion-panel id="expand">
        <v-expansion-panel-header expand-icon="fas fa-image">
          <a>Change representative image</a>
        </v-expansion-panel-header>
        <v-expansion-panel-content> #1 </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!--------------------------------------->
    <v-expansion-panels id="panel-box">
      <v-expansion-panel id="expand">
        <v-expansion-panel-header expand-icon="fas fa-map-marker-alt">
          <a>Change HQ location</a>
        </v-expansion-panel-header>
        <v-expansion-panel-content> #2 </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!--------------------------------------->
    <v-expansion-panels id="panel-box">
      <v-expansion-panel id="expand">
        <v-expansion-panel-header expand-icon="fas fa-envelope">
          <a>Change email</a>
        </v-expansion-panel-header>
        <v-expansion-panel-content> #3 </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!--------------------------------------->
    <v-expansion-panels id="panel-box">
      <v-expansion-panel id="expand">
        <v-expansion-panel-header expand-icon="fab fa-ethereum">
          <a>Change target ammount</a>
        </v-expansion-panel-header>
        <v-expansion-panel-content> #4 </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!--------------------------------------->
    <v-expansion-panels id="panel-box">
      <v-expansion-panel id="expand">
        <v-expansion-panel-header expand-icon="fab fa-youtube">
          <a>Change promotional video</a>
        </v-expansion-panel-header>
        <v-expansion-panel-content> #5 </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!--------------------------------------->
  </div>
</template>

<style lang="scss" scoped>
#panel-box{
  margin-bottom: 10px;
}
#expand {
  border-style: solid;
  border-color: black;
  border-width: 0.5px;
  color: black;
}
</style>

<script>
import { mapGetters } from "vuex"
export default {
    name: "Settings",
    computed:{
        ...mapGetters("drizzle", ["drizzleInstance", "isDrizzleInitialized"]),
        utils() {
            return this.drizzleInstance.web3.utils
        },
    },
    data(){
        return{
            
        }
    },
    methods:{
    },
    mounted(){
  }
}
</script>