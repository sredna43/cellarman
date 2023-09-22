<script lang="ts">
	import '@picocss/pico';
	import '../app.css';
	import '$lib/components/Header.svelte';
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	import type { Pages } from '$lib/types';

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
	header {
		padding-bottom: 0%;
		padding-left: 3rem;
	}

	main {
		padding: 3rem;
	}
</style>
