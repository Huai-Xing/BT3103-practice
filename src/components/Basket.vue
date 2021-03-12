<template>
  <div>
    Menu:
    <ul>
        <li v-for="item in itemsSelected" v-bind:key="item.name">
            {{item[0]}} x {{item[1]}}
        </li><br>
    </ul>
    <button v-on:click="findTotal()">Calculate Total</button>
    <p v-show="showTotal">
    subtotal: ${{subtotal}}
    <br><br>
    Grand Total: ${{grandTotal}}
    </p>
    <button v-on:click="sendOrder()">Add Order</button>
  </div>
</template>

<script>
import database from '../firebase.js'

export default {
  props:{
      itemsSelected:{
          type:Array
      }
  },
  data(){
    return{
      subtotal: 0,
      grandTotal: 0,
      showTotal: false,
      orderList: [],
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('menu').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.orderList.push({
            "name": doc.data().name,
            "count": 0,
            "price": doc.data().price});
        });
      });
    },
    sendOrder: function() {
      var finalOrder = [];
      var orderItems = [];
      for (let i = 0; i < this.itemsSelected.length; i++) {
        finalOrder.push({
          "name": this.itemsSelected[i][0],
          "count": this.itemsSelected[i][1],
          "price": this.itemsSelected[i][2],
        });
        orderItems.push(this.itemsSelected[i][0]);
      }
      for (let j = 0; j < this.orderList.length; j++) {
        var order = this.orderList[j];
        if (!orderItems.includes(order.name)) {
          finalOrder.push({
            "name": order.name,
            "count": 0,
            "price": order.price,
          });
        }
      }
      database.collection('orders').add({
        order: finalOrder,
      }).then(() => {location.reload()});
    },
    findTotal: function() {
      var total = 0;
      for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          total += curr_item[1] * curr_item[2];
      }
      this.subtotal = total;
      if (this.subtotal > 0) {
        this.showTotal = true;
      } else {
        this.showTotal = false;
      }
    }
  },
  watch: {
    subtotal: function() {
      var total = this.subtotal * 1.07;
      this.grandTotal = total.toFixed(2);
    },
    itemsSelected: function() {
      if (this.itemsSelected.length == 0) {
        this.showTotal = false;
      }
    }
  },
  created: function() {
    this.fetchItems();
  }
}
</script>

<style scoped>
    div {
      font-size: 24px;
    }
    li {
      margin-bottom: 16px;
    }
    button {
      background-color: blue;
      color: white;
      font-size: 16px;
      font-weight: 500;
      width: 160px;
      margin: 10px;
    }
</style>