import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		//편집가능유무
		editable: true,
	},
	mutations: {
		setEdit(state, edit) {
			state.editable = edit;
		},
	},
	actions: {},
	modules: {},
});
