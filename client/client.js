const API_URL = "http://localhost:5000/search/";

const app = new Vue({
  el: "#app",
  data: {
    term: "",
    terms: [],
    results: [],
  },
  methods: {
    onSubmit() {
      this.terms.push(this.term);
      const url = `${API_URL}${this.term}`;

      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          console.log(this.results);
          this.results = json.results;
        });
    },
  },
});
