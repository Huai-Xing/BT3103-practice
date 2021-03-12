import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        orderData: [],
        datacollection: {
            labels: ["Pork Fried Rice", "Mapo Tofu", "Sambal KangKung", "Cereal Prawn", "Dry Beef Hor Fun","Prawn omelette"],
            datasets: [{
                label: "Number of orders",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#b2a788"],
                data: [0,0,0,0,0,0]
              }]
        },
        options: {
            legend: { display: false },
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                    }
                }]
            },
            title: {
              display: true,
              text: 'Total Number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchData: function() {
        database.collection('orders').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                this.orderData.push(doc.data().order);
                var currOrder = doc.data().order;
                for (let i = 0; i < currOrder.length; i++) {
                    var name = currOrder[i].name;
                    var count = currOrder[i].count;
                    switch (name) {
                        case "Pork Fried Rice":
                            this.datacollection.datasets[0].data[0] += count;
                            break;
                        case "Mapo Tofu":
                            this.datacollection.datasets[0].data[1] += count;
                            break;
                        case "Sambal KangKung":
                            this.datacollection.datasets[0].data[2] += count;
                            break;
                        case "Cereal Prawn":
                            this.datacollection.datasets[0].data[3] += count;
                            break;
                        case "Dry Beef Hor Fun":
                            this.datacollection.datasets[0].data[4] += count;
                            break;
                        case "Prawn omelette":  
                            this.datacollection.datasets[0].data[5] += count;
                    }
                }
            });
            this.renderChart(this.datacollection, this.options)
        });
    }
  },
  mounted () {
      this.fetchData()
  }
}