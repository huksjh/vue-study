import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		//편집가능유무
		editable: true,

		//로그인 기록
		signUser: null,
	},
	mutations: {
		setEdit(state, edit) {
			state.editable = edit;
		},
		setSignUser(state, fu) {
			state.signUser = fu;
		},
	},
	actions: {},
	modules: {},
});
