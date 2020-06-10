import Vue from 'vue';

Vue.config.errorHandler = e => {
	console.log('error=>', e.message);
	Vue.prototype.$toast.error(e.message);
};
