/* Global Vue */

const app = new Vue({
  el: "#app",
  data: {
    currentDogUrl: null,
    favorites: []
  },
  methods: {
    loadDog: async function() {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const asJson = await response.json();
      this.currentDogUrl = asJson.message;
      console.log(this.currentDogUrl);
    },
    addFav: function() {
      if (!this.favorites.includes(this.currentDogUrl)) {
        this.favorites.push(this.currentDogUrl);
      }
      this.loadDog();
    },
    removeFav: function(dog) {
      this.favorites = this.favorites.filter(item => item !== dog);
    }
  },
  created() {
    this.loadDog();
  }
});
