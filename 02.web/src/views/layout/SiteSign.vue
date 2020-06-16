<template>
	<v-progress-circular
		indeterminate
		:value="20"
		v-if="loading"
	></v-progress-circular>
	<v-menu offset-y v-else-if="!$store.state.signUser">
		<template v-slot:activator="{ on }">
			<v-btn icon v-on="on">
				<v-icon>mdi-account</v-icon>
			</v-btn>
		</template>

		<v-card>
			<v-card-title>로그인</v-card-title>
			<v-divider />
			<v-card-actions>
				<v-btn @click="signInWithGoogle" block dark color="red">
					<v-icon left>mdi-google</v-icon>
					로그인
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-menu>

	<v-menu offset-y v-else>
		<template v-slot:activator="{ on }">
			<v-btn icon v-on="on">
				<v-avatar size="32">
					<img :src="$store.state.signUser.photoURL" />
				</v-avatar>
			</v-btn>
		</template>

		<v-card>
			<v-card-title>정보</v-card-title>
			<v-divider />
			<v-card-actions>
				<v-btn @click="signOut" block dark color="red">
					<v-icon left>mdi-google</v-icon>
					로그아웃
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-menu>
</template>

<script>
export default {
	props: [],
	data() {
		return {
			loading: false,
		};
	},

	methods: {
		async signInWithGoogle() {
			const provider = new this.$firebase.auth.GoogleAuthProvider();
			this.$firebase.auth().languageCode = 'ko';

			this.loading = true;
			try {
				const g_result = await this.$firebase.auth().signInWithPopup(provider);

				this.$store.commit('setSignUser', g_result.user);
				console.log(g_result.user);
			} finally {
				this.loading = false;
			}
		},
		signOut() {
			this.$firebase.auth().signOut();
		},
	},
};
</script>

<style></style>
