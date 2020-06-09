<template>
	<div>
		<v-app-bar app color="deep-purple accent-4" dark>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title>
				{{ title }}
				<v-btn icon @click="openDialog"><v-icon>mdi-pencil</v-icon></v-btn>
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
								label="제목수정"
								@keypress.enter="save"
								hide-details
							></v-text-field>
						</v-card-text>
					</v-card>
				</v-dialog>
			</v-toolbar-title>

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
					<v-list-item-title class="title">{{ title }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<!-- 메뉴 리스트 -->
			<side-menus :itemMenus="items" />
		</v-navigation-drawer>
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
			} catch (e) {
				console.log(e.message);
			} finally {
				this.dialog = false;
			}
		},
		read() {
			this.$firebase
				.database()
				.ref()
				.child('abcd')
				.on('value', sn => {
					console.log(sn);
					console.log(sn.val());
				});
		},
		async readOne() {
			const sn = await this.$firebase
				.database()
				.ref()
				.child('abcd')
				.once('value');
			console.log('readOne', sn);
			console.log('readOne', sn.val());
		},
	},
};
</script>

<style></style>
