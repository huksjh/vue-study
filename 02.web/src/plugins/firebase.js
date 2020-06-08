import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/auth'; //인증
import 'firebase/firebase-database'; //데이터베이스
import firebaseConfig from '../../firebaseConfig'; //키값 설정불러오기

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.prototype.$firebase = firebase; //$firebase 전역적으로 사용하기위해
