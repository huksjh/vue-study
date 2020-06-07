<template>
	<v-app>
		<!-- 상단 -->
		<layout-head />

		<!-- 컨텐츠 노출영역 -->
		<v-content>
			<router-view />
		</v-content>

		<!-- 푸터 -->
		<layout-footer />
	</v-app>
</template>

<script>
	import LayoutHead from "@/views/layout/head";
	import LayoutFooter from "@/views/layout/footer";

	export default {
		components: {
			LayoutHead,
			LayoutFooter
		},
		name: "App"
	};
</script>
