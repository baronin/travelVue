<template>
	<div id="app">
		<MainComponent/>
	</div>
</template>

<script>
  import MainComponent from '../MainComponent/MainComponent.vue';
  import './_general.scss';

  export default {
    name: 'app',
    components: {MainComponent},
  };
</script>
