<template>
	<div>
		<v-app-bar app color="deep-purple accent-4" dark>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title>{{ titles }}</v-toolbar-title>
			<!-- spacer 뒤에꺼 오른쪽으로 정렬 -->
			<v-spacer></v-spacer>
			<v-btn icon to="/about">
				<v-icon>mdi-magnify</v-icon>
				<!-- 돋보기 아이콘 -->
			</v-btn>
		</v-app-bar>

		<!-- 좌메뉴 -->
		<v-navigation-drawer app fixed temporary v-model="drawer">
			<v-list-item>
				<v-list-item-content>
					<v-list-item-title class="title">인트라넷</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<!-- 메뉴 리스트 -->
			<side-menus />
		</v-navigation-drawer>
	</div>
</template>

<script>
import SideMenus from '@/views/layout/SideMenus';
export default {
	components: { SideMenus },
	props: ['titles'],
	data() {
		return {
			drawer: false,
		};
	},
};
</script>

<style></style>
