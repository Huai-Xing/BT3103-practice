<template>
  <div>
    <div  id="itemsList">
    <Header></Header>
      <ul>
        <li v-for="item in items" v-bind:key="item.name">
            <h2 id="itemName">{{item.name}}</h2>
            <img v-bind:src="item.imageURL"/>
            <p id="price">${{item.price}}</p>
            <QuantCount v-bind:item="item" v-on:counter="onCounter"></QuantCount>
        </li>
      </ul>
    </div>
    <Basket id="shoppingBasket" v-bind:itemsSelected="itemsSelected"></Basket>
  </div>
</template>

<script>
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import Header from './Header.vue'
import database from '../firebase.js'

export default {
  data(){
    return{
        items: [],
        itemsSelected: [],
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('menu').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.items.push(doc.data());
        });
      });
    },
    onCounter: function (item, count) {
      if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
      } else {
        var selectedBefore = false;
        // Loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];

          // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
          if (item.name == item_name && count > 0) {
              this.$set(this.itemsSelected[i], 1, count);
              selectedBefore = true;
              break;
          }
          // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
          if (item.name == item_name && count == 0) {
              this.itemsSelected.splice(i,1);
              selectedBefore = true;
              break;
          } 
          // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
        }
        if (!selectedBefore && count != 0) {
            this.itemsSelected.push([item.name, count, item.price]);
        }
      }
    }
  },
  components: {
    'QuantCount': QuantityCounter,
    'Basket': Basket,
    'Header': Header,
  },
  created: function() {
    this.fetchItems();
  }
}
</script>

<style scoped>
    #itemsList {
    width: 100%;
    max-width: 70%;
    margin: 0px;
    padding: 0 5px;
    box-sizing: border-box;
    }
    ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    }
    li {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
    }
    img {
    width: 135px;
    height: 135px;
    }

    #price {
    font-size: 30px;
    }

    #itemName {
    font-size: 30px;
    }

    #shoppingBasket {
    position: absolute;
    top: 23%;
    left: 78%;
    }
</style>