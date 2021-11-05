<template>
  <div class="login">
      <div class="container">
          <div class="row">
              <div class="col-md">
                <h1>Sign in as Donor</h1>
                <img id="donor-img" src="@/assets/eth.png">
                <input id="first-input" class="form-control form-control-lg" type="text" placeholder="Donor Username" aria-label=".form-control-lg">
              </div>
              <div class="col-md">
                  <h1>Sign in as Charity</h1>
                  <img id="donor-img-2" src="@/assets/charity.png">
                  <input id="first-input"  class="form-control form-control-lg" type="text" placeholder="Organization name" aria-label=".form-control-lg">
                  <input  class="form-control form-control-lg" type="text" placeholder="ETH target donnation ammount" aria-label=".form-control-lg">
              </div>
          </div>

          <div class="row">
              <div class="col-md">
                  <button class="btn btn-dark" type="submit">Donor Sign in</button>
              </div>
              <div class="col-md">
                  <button class="btn btn-dark " type="submit">Charity Sign in</button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
};
</script>

<style lang="scss" scoped>
h1{
    display: inline;
}
#donor-img{
    height: 60px;
    width: 60px;
    display: inline;
    transform: translate(0px,-10px);
}
#donor-img-2{
    height: 60px;
    width: 100px;
    display: inline;
    transform: translate(10px,-10px);
}
#first-input{
    margin-top: 20px;
}
.form-control{
    margin-bottom: 10px;
}
.btn{
    border-top: rgb(218, 121, 247);
    border-style: solid;
    border-width: 2px;
    color:whitesmoke;
    font-family:Georgia, 'Times New Roman', Times, serif;
}

</style>