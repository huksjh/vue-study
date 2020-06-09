<template>
	<v-app>
		<!-- 상단 -->
		<layout-head :title="site.title" />

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
				menus: [],
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
		console.log('mounted', this.$firebase);
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
						}
						console.log(v);
						this.site = v;
					},
					e => console.error(e.message),
				);
		},
	},
};
</script>
