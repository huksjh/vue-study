<template>
	<div>
		<v-list>
			<v-list-group
				v-for="(item, i) in items"
				:key="i"
				v-model="item.active"
				:prepend-icon="item.icon"
				no-action
			>
				<template v-slot:activator>
					<v-list-item-content>
						<v-list-item-title v-text="item.title"></v-list-item-title>
					</v-list-item-content>
					<v-list-item-action>
						<v-btn icon @click="openDialog(i)"
							><v-icon>mdi-pencil</v-icon></v-btn
						>
					</v-list-item-action>
				</template>

				<v-list-item v-for="(subitem, j) in item.subItems" :key="j">
					<v-list-item-content>
						<v-list-item-title v-text="subitem.title"></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item>
					<v-list-item-icon><v-icon>mdi-plus</v-icon></v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>
							서브 추가
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-group>

			<v-list-item @click="openDialog(-1)">
				<v-list-item-icon><v-icon>mdi-plus</v-icon></v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title>
						추가
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
		<v-dialog v-model="dialogItems" max-width="400">
			<v-card>
				<v-card-title>
					분류추가
					<v-spacer />
					<v-btn icon color="blue">
						<v-icon>mdi-content-save</v-icon>
					</v-btn>
					<v-btn icon color="red" @click="dialogItems = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-card-title>
				<v-card-text>
					<v-text-field
						v-model="formItem.title"
						outlined
						@keypress.enter="saveItem"
						:rules="[rules.required]"
						hide-detail="auto"
					></v-text-field>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	props: ['items'],
	data() {
		return {
			dialogItems: false,
			dialogSubItems: false,
			selectIndex: -1,
			//firebase - site - menu 부분에 저장하기위한 설정
			formItem: {
				icon: '',
				title: '',
				to: '',
			},

			rules: {
				required: value => !!value || '필수입력입니다.',
				min: v => v.length >= 8 || 'Min 8 characters',
				emailMatch: () => "The email and password you entered don't match",
			},
		};
	},
	methods: {
		openDialog(index) {
			//신규 분류추가 클릭일경우 모달 인풋 값 초기화 아니면  기존 이름 넣어주기
			if (index === -1) {
				this.formItem.title = '';
			} else {
				this.formItem.title = this.items[index].title;
			}
			this.selectIndex = index; //모달창 여는 선택된 부모?  번호 기록
			this.dialogItems = true; //모달창 열기
			//this.save();
		},
		saveItem() {
			//모달에서 입력받는 값이 없으면 alert 띄운다
			if (!this.formItem.title) {
				alert('분류명은 필수입력입니다.');
				return;
			}
			if (this.selectIndex < 0) {
				this.items.push(this.formItem); //신규 모달에서 받는 값을  items 에 넣는다
			} else {
				this.items[this.selectIndex] = this.formItem; //모달에서 입력받는 값을   기존 items-> item 에  넣는다
			}
			this.saveData();
		},
		async saveData() {
			//신규등록시
			try {
				await this.$firebase
					.database()
					.ref()
					.child('site')
					.update({
						menus: this.items, //site -> menus 안에  현재 this.items 값들을 넣는다
					});
			} finally {
				this.dialogItems = false;
			}
		},
	},
};
</script>

<style></style>
