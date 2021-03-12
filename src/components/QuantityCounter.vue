<template>
  <div>
    <button v-on:click="decrease">-</button>{{counter}}<button v-on:click="increase">+</button>
  </div>
</template>

<script>

export default {
    props:{
        item:{
            type:Object
        }
    },
    data() {
        return{
            counter: 0,
        }
    },
    methods: {
        decrease: function() {
            if (this.counter > 0) {
                this.counter --;
            }
            this.$emit('counter', this.item, this.counter);
        },
        increase: function() {
            if (this.counter == 10) {
                alert("You cannot buy more than 10 items.");
            } else {
                this.counter ++;
            }
            this.$emit('counter', this.item, this.counter);
        }
    }
}
</script>

<style scoped>
    div {
        text-align: center;
        font-size: 30px;
    }
    button {
        text-align: center;
        margin: 20px;
        font-size: 36px;
        width: 60px;
        height: 60px;
        color: white;
        background-color: blue;
    }
</style>
