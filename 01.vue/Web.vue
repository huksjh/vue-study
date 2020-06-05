<template>
  <div>
    <h1>구구단</h1>
    <div>{{ first }} x {{ second }} ?</div>
    <form :onSubmit="calcGugudan">
      <input type="text" v-model="input" />
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
    input: '',
    result: '',
  },
  methods: {
    calcGugudan() {},
  },
}
</script>
