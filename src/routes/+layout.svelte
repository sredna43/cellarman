<script lang="ts">
	import '@picocss/pico';
	import '../app.css';
	import '$lib/components/Header.svelte';
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	import type { Pages } from '$lib/typings/types';

	const pageTitles: Pages = {
		'/': 'Inventory'
	};
</script>

<body>
	<header>
		<Header pageTitle={pageTitles[$page.url.pathname] || 'Whoops'} />
	</header>

	<main>
		<slot />
	</main>
</body>

<style>
	/* mobile */
	@media screen and (max-width: 900px) {
		header {
			padding-bottom: 1rem;
			padding-left: 3rem;
			padding-right: 3rem;
			padding-top: 2%;
			text-align: center;
		}

		main {
			padding-top: 0%;
		}
	}

	/* desktop */
	@media screen and (min-width: 900px) {
		header {
			padding-bottom: 0%;
			padding-left: 3rem;
			padding-right: 3rem;
			padding-top: 2%;
		}

		main {
			padding-top: 0%;
		}
	}
</style>
