import Vue from 'vue';
import App from './App';
//import GugudanComponent from './gugudan-component';

/*
컴포넌트 전역등록
gugudan-component.vue  안에 
default name: "gugudan-component"  이  App.vue 에 컴포넌트로 사용됨
*/
//Vue.component(GugudanComponent.name, GugudanComponent);

new Vue({
  render: (h) => h(App),
}).$mount('#root'); //index.html  id #root
