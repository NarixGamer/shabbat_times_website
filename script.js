new Vue({
  el: '#app',
  data: {
    city: null,
    startDate: null,
    endDate: null,
    shabbatIn: null,
    parasha: null,
    havdala: null
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
        let shabbatStart = data.items[0].date;
        this.shabbatIn = new Date(shabbatStart).toLocaleTimeString('de-DE', {
          hour: '2-digit',
          minute: '2-digit'
        });
        this.parasha = data.items[0].memo;
        let havdalaDate = data.items[0].date;
        this.havdala = new Date(havdalaDate).toLocaleTimeString('de-DE', {
          hour: '2-digit',
          minute: '2-digit'
        });
      })
      .catch(error => {
        console.log('Fehler beim Abrufen der Daten: ' + error);
      });
  }
});