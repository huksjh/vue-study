<template>
	<div>
		<h1>구구단</h1>
		<div>{{ first }} x {{ second }} ?</div>
		<form @submit="calcGugudan">
			<input type="text" v-model="input" ref="answer" />
			<button type="submit">계산</button>
		</form>
		<h1>{{ result }}</h1>
	</div>
</template>
<script>
	export default {
		data: {
			first: Math.ceil(Math.random() * 9),
			second: Math.ceil(Math.random() * 9),
			input: "",
			result: ""
		},
		methods: {
			calcGugudan(e) {
				e.preventDefault();
				const numberChk = /^[0-9]*$/;
				console.log(this.input, numberChk.test(this.input));
				if (numberChk.test(this.input) === false) {
					this.result = "숫자만 입력하세요";
				} else {
					if (this.first * this.second === parseInt(this.input)) {
						this.result = "정답";
						this.first = Math.ceil(Math.random() * 9);
						this.second = Math.ceil(Math.random() * 9);
					} else {
						this.result = "오답";
					}
				}

				this.input = "";
				this.$refs.answer.focus;
			}
		}
	};
</script>
