/* Global Vue */

const app = new Vue({
  el: "#app",
  data: {
    currentDogUrl: null,
  },
  methods: {
    loadDog: async function () {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const asJson = await response.json();
      this.currentDogUrl = asJson.message;
      console.log(this.currentDogUrl);
    }
  },
  created() {
    this.loadDog();
  }
});
