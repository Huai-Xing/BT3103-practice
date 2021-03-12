import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{ 
                label: "West",
                data: [],
                borderColor: "#3e95cd",
                backgroundColor: "#3e95cd",
                fill: false
            }, {
                label: "National",
                data: [],
                borderColor: "#8e5ea2",
                backgroundColor: "#8e5ea2",
                fill: false                
            }, {
                label: "East",
                data: [],
                borderColor: "#3cba9f",
                backgroundColor: "#3cba9f",
                fill: false                
            }, {
                label: "Central",
                data: [],
                borderColor: "#b2a788",
                backgroundColor: "#b2a788",
                fill: false                
            }, {
                label: "South",
                data: [],
                borderColor: "#c45850",
                backgroundColor: "#c45850",
                fill: false                
            }, {
                label: "North",
                data: [],
                borderColor: "#e8c3b9",
                backgroundColor: "#e8c3b9",
                fill: false                
            }]
        },
        options: {
            legend: { display: true, position: 'top' },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get('https://api.data.gov.sg/v1/environment/psi?date=2021-02-23')
        .then(response => {
            response.data.items.forEach(data => { 
                this.datacollection.labels.push(data.timestamp);
                var readings = data.readings.psi_twenty_four_hourly;
                var loc = ["west", "national", "east", "central", "south", "north"];
                for (let key in readings) {
                    this.datacollection.datasets[loc.indexOf(key)].data.push(readings[key]);
                }
            })
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}