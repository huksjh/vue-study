<template>
	<div>
		<v-list-item three-line>
			<v-list-item-content>
				<v-list-item-title class="title"
					>{{ title }}
					<v-btn icon @click="$store.commit('setEdit', !$store.state.editable)">
						<v-icon v-text="$store.state.editable ? 'mdi-pencil' : 'mdi-eye'">
						</v-icon>
					</v-btn>
				</v-list-item-title>
			</v-list-item-content>
		</v-list-item>

		<v-divider></v-divider>
		<v-list>
			<v-list-group
				v-for="(item, i) in items"
				:key="i"
				:prepend-icon="item.icon"
				no-action
				:disabled="moveArrow"
			>
				<template v-slot:activator>
					<v-list-item-content>
						<v-list-item-title>
							{{ item.title }}
							<!-- 수정버튼 -->
							<span v-if="$store.state.editable"
								><v-btn icon color="black" @click="openDialog(i, -1, 'main')">
									<v-icon>mdi-pencil</v-icon>
								</v-btn>
								<v-btn
									icon
									color="red"
									@click="moveItems(items, i, -1)"
									v-if="i > 0"
								>
									<v-icon>mdi-arrow-up-bold-circle-outline</v-icon>
								</v-btn>
								<v-btn
									icon
									color="blue"
									@click="moveItems(items, i, 1)"
									v-if="i < items.length - 1"
								>
									<v-icon>mdi-arrow-down-bold-circle-outline</v-icon>
								</v-btn>
							</span>
							<!-- 수정버튼 -->
						</v-list-item-title>
					</v-list-item-content>
				</template>

				<v-list-item
					v-for="(subitem, j) in item.subItems"
					:key="j"
					:to="$store.state.editable ? null : subitem.to"
				>
					<v-list-item-content>
						<v-list-item-title>
							{{ subitem.title }}
							<!-- 수정버튼 -->
							<span v-if="$store.state.editable">
								<v-btn icon color="black" @click="openDialog(i, j, 'sub')">
									<v-icon>mdi-pencil</v-icon>
								</v-btn>
								<v-btn
									icon
									color="red"
									@click="moveItems(item.subItems, j, -1)"
									v-if="j > 0"
								>
									<v-icon>mdi-arrow-up-bold-circle-outline</v-icon>
								</v-btn>
								<v-btn
									icon
									color="blue"
									@click="moveItems(item.subItems, j, 1)"
									v-if="j < item.subItems.length - 1"
								>
									<v-icon>mdi-arrow-down-bold-circle-outline</v-icon>
								</v-btn>
							</span>
							<!-- 수정버튼 -->
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-item @click="openDialog(i, -1, 'sub')">
					<v-list-item-icon><v-icon>mdi-plus</v-icon></v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>
							서브추가
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-group>

			<v-list-item @click="openDialog(-1, -1, 'main')">
				<v-list-item-icon><v-icon>mdi-plus</v-icon></v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title>
						분류추가
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
		<v-dialog
			v-model="dialogItems"
			max-width="400"
			@click:outside="closeDialog()"
		>
			<v-card>
				<v-card-title>
					<template v-if="mainSubChk === 'sub'">
						<div>
							서브추가
						</div>
					</template>
					<template v-else>
						<div>
							분류추가
						</div>
					</template>
					<v-spacer />
					<v-btn
						icon
						color="blue"
						v-on="
							mainSubChk === 'main'
								? {
										click: () => {
											this.saveItem();
										},
								  }
								: {
										click: () => {
											this.saveSubItem();
										},
								  }
						"
					>
						<v-icon>mdi-content-save</v-icon>
					</v-btn>
					<v-btn icon color="red" @click="closeDialog()">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-card-title>
				<v-card-text>
					<template v-if="mainSubChk === 'main'">
						<div>
							<v-row>
								<v-col cols="12" md="2" text-center>
									<v-icon>{{ formItem.icon }}</v-icon>
								</v-col>
								<v-col cols="12" md="10">
									<v-text-field
										v-model="formItem.icon"
										outlined
										@keypress.enter="saveItem"
										hide-detail="auto"
										label="mdi-icon"
									></v-text-field>
								</v-col>
							</v-row>
							<v-text-field
								v-model="formItem.title"
								outlined
								@keypress.enter="saveItem"
								:rules="[rules.required]"
								hide-detail="auto"
								label="분류명"
							></v-text-field>
						</div>
					</template>
					<template v-else>
						<v-text-field
							v-model="formSubItem.title"
							outlined
							@keypress.enter="saveSubItem"
							:rules="[rules.required]"
							hide-detail="auto"
							label="분류명"
						></v-text-field>
						<v-text-field
							v-model="formSubItem.to"
							outlined
							@keypress.enter="saveSubItem"
							:rules="[rules.required]"
							hide-detail="auto"
							label="링크주소"
							hint="링크주소입력"
							persistent-hint
						></v-text-field>
					</template>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	props: ['title', 'items'],
	data() {
		return {
			moveArrow: false,
			mainSubChk: 'main',
			dialogItems: false,
			dialogSubItems: false,
			selectIndex: -1,
			selectSubIndex: 0,
			//firebase - site - menu 부분에 저장하기위한 설정
			formItem: {
				icon: 'mdi-information',
				title: '',
			},
			formSubItem: {
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
	mounted() {
		console.log(this.$store); //sotre/index  vuex 실행된거
	},
	methods: {
		openDialog(index, subIndex, mode) {
			this.selectIndex = index; //모달창 여는 선택된 부모?  번호 기록
			this.selectSubIndex = subIndex; //모달창 여는 선택된 부모?  번호 기록
			this.mainSubChk = mode; //메인 서브 구분
			//console.log(index, subIndex);
			if (mode == 'sub') {
				//신규 분류추가 클릭일경우 모달 인풋 값 초기화 아니면  기존 이름 넣어주기
				if (subIndex < 0) {
					//신규 작성일경우는 기본값을 초기화 해준다
					this.formSubItem.title = '';
					this.formSubItem.to = '';
				} else {
					this.formSubItem.title = this.items[index].subItems[subIndex].title;
					this.formSubItem.to = this.items[index].subItems[subIndex].to;
				}
			} else {
				//신규 분류추가 클릭일경우 모달 인풋 값 초기화 아니면  기존 이름 넣어주기
				if (index < 0) {
					//신규 작성일경우는 기본값을 초기화 해준다
					this.formItem.icon = 'mdi-information';
					this.formItem.title = '';
				} else {
					this.formItem.icon = this.items[index].icon;
					this.formItem.title = this.items[index].title;
				}
			}

			this.dialogItems = true; //모달창 열기
			this.moveArrow = true; //메뉴 드롭다운 비활성화

			//this.save();
		},
		closeDialog() {
			console.log('closeDialog');
			this.dialogItems = false; //모달창 열기
			this.moveArrow = false; //메뉴 드롭다운 비활성화
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
		saveSubItem() {
			//모달에서 입력받는 값이 없으면 alert 띄운다
			console.log('saveSubItem');
			if (!this.formSubItem.title) {
				alert('분류명은 필수입력입니다.');
				return;
			}
			if (this.selectSubIndex < 0) {
				//신규 모달에서 받는 값을  subItems 에 넣는다
				if (!this.items[this.selectIndex].subItems)
					this.items[this.selectIndex].subItems = [];
				this.items[this.selectIndex].subItems.push({
					title: this.formSubItem.title,
					to: this.formSubItem.to,
				});
			} else {
				//모달에서 입력받는 값을   기존 items-> item 에  넣는다
				this.items[this.selectIndex].subItems[
					this.selectSubIndex
				] = this.formSubItem;
			}
			this.saveData();
		},
		async saveData() {
			try {
				await this.$firebase
					.database()
					.ref()
					.child('site')
					.child('menus')
					.set(this.items);
			} finally {
				this.dialogItems = false;
				this.moveArrow = false;
			}
		},

		moveItems(menus, i, arrow) {
			console.log(menus, i, arrow);
			menus.splice(i + arrow, 0, ...menus.splice(i, 1));
			this.moveArrow = true;
			this.saveData();
		},
	},
};
</script>

<style></style>
