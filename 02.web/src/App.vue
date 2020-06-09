<template>
	<v-app>
		<!-- 상단 -->
		<layout-head :title="site.title" :items="site.menus" />

		<!-- 컨텐츠 노출영역 -->
		<v-content>
			<router-view />
		</v-content>

		<!-- 푸터 -->
		<layout-footer :footer="site.footer" />
	</v-app>
</template>

<script>
import LayoutHead from '@/views/layout/Head';
import LayoutFooter from '@/views/layout/Footers';

export default {
	name: 'App',
	components: {
		LayoutHead,
		LayoutFooter,
	},
	data() {
		return {
			site: {
				menus: [
					{
						icon: 'mdi-home',
						title: '홈',
						subItems: [],
						to: '/',
					},
					{
						icon: 'mdi-calendar-multiselect',
						title: '영업관리',
						subItems: [{ title: '영업관리' }],
						to: '/',
					},
					{
						icon: 'mdi-notebook',
						title: '프로젝트관리',
						subItems: [
							{ title: '진행현황' },
							{ title: '일정관리' },
							{ title: '연장관리(호스팅)' },
							{ title: '연장관리(도메인)' },
						],
						to: '/',
					},
					{
						icon: 'mdi-chart-bar',
						title: '통계',
						subItems: [{ title: '완료프로젝트' }, { title: '거래내역' }],
						to: '/',
					},
				],
				title: '인트라넷',
				footer: '카피라이트',
			},
		};
	},
	created() {
		console.log('create');
		this.subscribe();
	},
	mounted() {
		//console.log('mounted', this.$firebase);
	},
	methods: {
		subscribe() {
			//초기값 site 설정
			this.$firebase
				.database()
				.ref()
				.child('site')
				.on(
					'value',
					sn => {
						const v = sn.val();
						//초기값 site가 없으면 등록
						if (!v) {
							this.$firebase
								.database()
								.ref()
								.child('site')
								.set(this.site);
							//console.log('inside-subscribe', v);
							return;
						}
						console.log('subscribe', v);
						this.site = v;
					},
					e => console.log(e.message),
				);
		},
	},
};
</script>
