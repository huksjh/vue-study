<template>
	<div>
		<!-- 상단바 영역 -->
		<v-app-bar app color="deep-purple accent-4" dark>
			<!-- 메뉴 버튼 햄버거  -->
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

			<!-- 타이틀 노출  -->
			<v-toolbar-title>
				{{ title }}
				<!-- 수정 연필 -->
				<v-btn v-if="$store.state.editable" icon @click="openDialog"
					><v-icon>mdi-pencil</v-icon></v-btn
				>
				<v-dialog v-model="dialog" max-width="400">
					<v-card>
						<v-card-title>
							제목수정
							<v-spacer />
							<v-btn icon color="blue" @click="save">
								<v-icon>mdi-content-save</v-icon>
							</v-btn>
							<v-btn icon color="red" @click="dialog = false">
								<v-icon>mdi-close</v-icon>
							</v-btn>
						</v-card-title>
						<v-card-text>
							<v-text-field
								v-model="text"
								outlined
								label="제목"
								@keypress.enter="save"
								hide-details
							></v-text-field>
						</v-card-text>
					</v-card>
				</v-dialog>
				<!-- 수정 연필 -->
			</v-toolbar-title>

			<!-- spacer 뒤에꺼 오른쪽으로 정렬 -->
			<v-spacer></v-spacer>
			<v-btn icon to="/about">
				<v-icon>mdi-magnify</v-icon>
				<!-- 돋보기 아이콘 -->
			</v-btn>
		</v-app-bar>

		<!-- 좌메뉴 -->
		<v-navigation-drawer
			app
			fixed
			temporary
			v-model="drawer"
			:width="$store.state.editable ? '400' : '300'"
		>
			<!-- 메뉴 리스트 -->
			<side-menus :items="items" :title="title" />
		</v-navigation-drawer>
		<!-- 좌메뉴 -->
	</div>
</template>

<script>
import SideMenus from '@/views/layout/SideMenus';
export default {
	components: { SideMenus },
	props: ['title', 'items'],
	data() {
		return {
			drawer: false,
			dialog: false,

			text: this.title,
		};
	},
	methods: {
		openDialog() {
			this.dialog = true;
		},
		//타이틀 저장
		async save() {
			//console.log('2222');
			try {
				await this.$firebase
					.database()
					.ref()
					.child('site')
					.update({
						title: this.text,
					});
			} finally {
				this.dialog = false;
			}
		},
	},
};
</script>

<style></style>
