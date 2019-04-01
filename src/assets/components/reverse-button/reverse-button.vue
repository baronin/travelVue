<template>
  <button type="button" class="btn is-reverse-button" @click="reverseData"><span class="arrows"></span>
  </button>
</template>

<script>
  import './_reverse-button.scss';
  export default {
    name: "reverse-button",
    data(){
      return {
        dataInitial: '',
        dataChanged: ''
      }
    },
    props:{
      initialFirst: Object,
      initialSecond: Object
  },
    mounted(){
      this.$parent.$on('update', this.reverseData())
    },
    methods: {
      reverseData(){
        this.dataInitial = this.initialSecond
        this.dataChanged =  this.initialFirst
        this.$emit('reverse', this.dataChanged, this.dataInitial)
      }
    }
  }

</script>