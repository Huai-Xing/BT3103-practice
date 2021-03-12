<template>
  <div>
    <Header></Header>
    <ul>
        <li v-for="order in orders" v-bind:key="order">
        <section>
                <p v-for="item in order[1].order" v-bind:key="item.name">
                    {{item.name}}: {{item.count}}
                </p>
        </section>
        <section id="btn">
        <button v-on:click="deleteItem($event)" v-bind:id="order[0]">Delete</button>
        <button v-on:click="route($event)" v-bind:id="order[0]">Modify</button>
        </section>
        </li>
    </ul>
  </div>
</template>

<script>
import database from '../firebase.js'
import Header from './Header.vue'

export default {
    data(){
        return{
            orders: [],
        }
    },
    methods: {
        fetchItems: function () {
            database.collection('orders').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                this.orders.push([doc.id, doc.data()]);
                });
            });
        },
        deleteItem: function (event) {
            let doc_id = event.target.getAttribute("id");
            database.collection('orders').doc(doc_id).delete().then(() => {location.reload()});
        },
        route: function(event) {
            let doc_id = event.target.getAttribute("id");
            console.log(doc_id);
            this.$router.push({ name: 'modify', params: { id: doc_id }});
        }
    },
    created: function() {
        this.fetchItems();
    },
    components: {
      'Header': Header,
    }
}
</script>

<style scoped>
section {
    display: inline-block; 
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
button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
#btn {
    float: right;
    margin-right: 30px;
}
</style>