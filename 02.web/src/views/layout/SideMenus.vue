<template>
	<v-list>
		<v-list-group
			v-for="item in items"
			:key="item.title"
			v-model="item.active"
			:prepend-icon="item.icon"
			no-action
		>
			<template v-slot:activator>
				<v-list-item-content>
					<v-list-item-title v-text="item.title"></v-list-item-title>
				</v-list-item-content>
			</template>

			<v-list-item v-for="subitem in item.subItems" :key="subitem.title">
				<v-list-item-content>
					<v-list-item-title v-text="subitem.title"></v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list-group>
	</v-list>
</template>

<script>
export default {
	data() {
		return {
			items: [
				{
					icon: 'mdi-home',
					title: '홈',
					subItems: [],
					to: '/',
				},
				{
					icon: 'mdi-home',
					title: '영업관리',
					subItems: [{ title: '영업관리' }],
					to: '/',
				},
				{
					icon: 'mdi-description',
					title: '프로젝트관리',
					subItems: [
						{ title: '진행현황' },
						{ title: '일정관리' },
						{ title: '연장관리(호스팅)' },
						{ title: '연장관리(도메인)' },
					],
					to: '/',
				},
				{
					icon: 'mdi-assessment',
					title: '통계',
					subItems: [{ title: '완료프로젝트' }, { title: '거래내역' }],
					to: '/',
				},
			],
		};
	},
};
</script>

<style></style>
