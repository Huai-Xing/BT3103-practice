<template>
    <div>
        <ul>
            <li v-for="(item, index) in datapacket" v-bind:key="item.name">
                {{item.name}}: {{item.count}}
                <br>
                <input :id=index type="number" placeholder=0 min="0">
            </li>
        </ul>
        <button v-on:click="updateOrder">Update Order</button>
    </div>
</template>

<script>
import database from '../firebase.js'

    export default {
        data(){
            return{
                datapacket: [],
            }
        },
        methods: {
            fetchItems: function () {
                let doc_id = this.$route.params.id;
                database.collection('orders').doc(doc_id).get().then( (doc) => {
                    this.datapacket = doc.data().order;
                });
            },
            updateOrder: function() {
                var newData = this.datapacket.slice();
                for (let i = 0; i < this.datapacket.length; i++) {
                    var data = Object.assign({}, newData[i]);
                    data.count = this.datapacket[i].count;
                    newData[i] = data; 
                    var itemValue = document.getElementById(i).value;
                    if (itemValue != "") {
                        newData[i].count = Number(itemValue);
                    }
                }
                let doc_id = this.$route.params.id;
                database.collection('orders').doc(doc_id).update({
                    order: newData,
                }).then(() => this.$router.push({ path: '../orders' }));
            }
        },
        created: function() {
            this.fetchItems();
        },
    }
</script>

<style>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px;
}
button {
  width: 100px;
  height: 30px;
  margin: 10px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>