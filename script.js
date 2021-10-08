/* Global Vue */


if (location.protocol == 'http:') {
  location.protocol = 'https:';
}

const app = new Vue({
  el: "#app",
  data: {
    currentDogUrl: null,
    favorites: [],
    online: true,
  },
  
  methods: {
    loadDog: async function () {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const asJson = await response.json();
      this.currentDogUrl = asJson.message;
      console.log(this.currentDogUrl);
    },
    
    addFav: async function() {
      if (!this.favorites.includes(this.currentDogUrl)) {
        this.favorites.push(this.currentDogUrl);

        const imageCache = await caches.open("favoriteImageCache");
        imageCache.add(this.currentDogUrl);
      }
      this.loadDog();
    },
    
    removeFav: function(dog) {
      this.favorites = this.favorites.filter(item => item !== dog);
    }
  },
  
  created() {
    this.loadDog();
  },
  
  mounted() {
    if (localStorage.favorites) {
      this.favorites = JSON.parse(localStorage.favorites);
    }
    
    const onlineStatus = navigator.onLine;
    addEventListener("offline", () => {
      this.online = false;
    });
    addEventListener("online", () => {
      this.online = true;
    });
  },
  
  watch: {
    favorites(updatedfavorites) {
      localStorage.favorites = JSON.stringify(updatedfavorites);
    },
    online(isOnline) {
      if(isOnline) {
        this.loadDog();
      }    
    }
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
