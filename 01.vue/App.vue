<template>
	<div id="App">
		<gugudan-component></gugudan-component>
	</div>
</template>

<script>
	//안에다 넣으면  지역등록
	import GugudanComponent from "./gugudan-component";

	export default {
		name: "App",
		components: {
			GugudanComponent
			/** gugudan-component.vue 파일 안에 name= gugudan-component */
		}
	};
</script>

<style lang="scss" scoped>
</style>