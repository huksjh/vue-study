<template>
	<v-footer>
		<v-col class="text-center" cols="12">
			<div>
				{{ footer }}

				<!-- 수정 연필 -->
				<v-btn icon @click="openDialog"><v-icon>mdi-pencil</v-icon></v-btn>
				<v-dialog v-model="dialog" max-width="400">
					<v-card>
						<v-card-title>
							푸터수정
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
								label="푸터"
								@keypress.enter="save"
								hide-details
							></v-text-field>
						</v-card-text>
					</v-card>
				</v-dialog>
				<!-- 수정 연필 -->
			</div>
		</v-col>
	</v-footer>
</template>

<script>
export default {
	props: ['footer'],
	data() {
		return {
			dialog: false,
			text: this.footer,
		};
	},
	methods: {
		openDialog() {
			this.dialog = true;
		},
		async save() {
			try {
				await this.$firebase
					.database()
					.ref()
					.child('site')
					.update({ footer: this.text });
			} finally {
				this.dialog = false;
			}
		},
	},
};
</script>

<style></style>
