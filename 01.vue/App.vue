<template>
	<div id="App">
		<gugudan-component></gugudan-component>
		<baseball-component></baseball-component>
	</div>
</template>

<script>
	//안에다 넣으면  지역등록
	import GugudanComponent from "./gugudan-component";
	import BaseballComponent from "./baseball-component";

	export default {
		name: "App",
		components: {
			GugudanComponent,
			BaseballComponent
			/** gugudan-component.vue 파일 안에 name= gugudan-component */
		}
	};
</script>

<style lang="scss" scoped>
</style>