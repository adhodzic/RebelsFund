<template>
  <div class="text-center">
    <a class="more" @click="sheet = !sheet">More </a>
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" height="470px">
        <v-btn class="mt-6" text color="red" @click="sheet = !sheet">
          close
        </v-btn>
        <div class="row">
          <div class="col-md">
            <h6>Partnered with</h6>
            <div class="inline-row">
              <img class="partners" src="@/assets/unipu.jpg" />
              <img class="partners" src="@/assets/fipu.jpg" />
            </div>
          </div>
          <div class="col-md">
            <h6>Built on</h6>
            <div class="inline-row">
              <img class="tech" src="@/assets/vue.png" />
              <img
                style="height: 180px; width: 180px"
                src="@/assets/block.jpg"
              />
            </div>
          </div>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<style lang="scss" scoped>
h6 {
  margin-top: 10px;
  margin-bottom: 10px;
}
.more {
  color: rgb(247, 121, 121);
  text-decoration: underline;
  text-decoration-color: rgb(247, 121, 121);
}
.more:hover {
  cursor: pointer;
}
.partners {
  width: 240px;
  height: 140px;
}
.tech {
  width: 150px;
  height: 110px;
}
@media (max-width: 768px) {
  .partners {
    width: 180px;
    height: 100px;
  }
  #sheet-main {
    height: 600px;
  }
}
</style>

<script>
export default {
  name: "Sheet",
  data: () => ({
    sheet: false,
  }),
};
</script>