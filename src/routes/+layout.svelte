<script lang="ts">
	import '@picocss/pico';
	import '../app.css';
	import '$lib/components/Header.svelte';
	import Header from '$lib/components/Header.svelte';
</script>

<body>
	<header class="container">
		<Header />
	</header>

	<main class="container">
		<slot />
	</main>
</body>
