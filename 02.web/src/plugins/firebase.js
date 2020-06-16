//vue 초기셋팅
import Vue from 'vue';
//파이어베이서 app 기능 불러오기
import * as firebase from 'firebase/app';
//파이어베이스 기능중 필요한 항목 설정
//인증기능
import 'firebase/auth';
//데이터베이스
import 'firebase/database';
//파이어베이스 키값 설정
import firebaseConfig from '../../firebaseConfig';

//스토어 연결
import store from '../store/';

//파이어베이스 install
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(fu => store.commit('setSignUser', fu));

//Vue 전역사용 $firebase 설정
Vue.prototype.$firebase = firebase;
