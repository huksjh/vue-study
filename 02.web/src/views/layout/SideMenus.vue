<template>
	<v-list>
		<v-list-group
			v-for="item in itemMenus"
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
	props: ['itemMenus'],
	data() {
		return {};
	},
};
</script>

<style></style>
