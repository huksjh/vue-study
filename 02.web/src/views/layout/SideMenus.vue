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

			<v-list-item v-for="subItem in item.subItems" :key="subItem.title">
				<v-list-item-content>
					<v-list-item-title
						v-text="subItem.title"
					></v-list-item-title>
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
					title: 'Attractions',
					subItems: [{ title: 'List Item' }],
				},
				{
					icon: 'mdi-magnify',
					title: 'Dining',
					active: true,
					subItems: [
						{ title: 'Breakfast & brunch' },
						{ title: 'New American' },
						{ title: 'Sushi' },
					],
				},
				{
					icon: 'mdi-arrow_right_alt',
					title: 'Education',
					subItems: [{ title: 'List Item' }],
				},
			],
		};
	},
};
</script>

<style></style>
