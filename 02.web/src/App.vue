<template>
	<v-app>
		<!-- 상단 -->
		<layout-head :titles="titles" />

		<!-- 컨텐츠 노출영역 -->
		<v-content>
			<router-view />
		</v-content>

		<!-- 푸터 -->
		<layout-footer />
	</v-app>
</template>

<script>
	import LayoutHead from "@/views/layout/Head";
	import LayoutFooter from "@/views/layout/Footers";

	export default {
		components: {
			LayoutHead,
			LayoutFooter
		},
		name: "App",
		data() {
			return {
				titles: "제목"
			};
		}
	};
</script>
