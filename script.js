new Vue({
  el: '#app',
  data: {
    city: null,
    error: null,
    startDate: null,
    endDate: null

  },
  mounted() {
    fetch('https://www.hebcal.com/shabbat?cfg=json&geonameid=2761369&M=on')
      .then(response => response.json())
      .then(data => {
        let location = data.location.city;
        if (location === "Vienna"){
          this.city = "Wien";
        }
        let start = data.range.start;
        let end = data.range.end;
        this.startDate = new Date(start).toLocaleDateString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        this.endDate = new Date(end).toLocaleDateString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      })
      .catch(error => {
        this.error = 'Fehler beim Abrufen der Daten: ' + error;
      });
  }
});