<script lang="ts">
	import '@picocss/pico';
	import '../app.css';
	import '$lib/components/Header.svelte';
	import Header from '$lib/components/Header.svelte';
</script>

<body>
	<main class="container">
		<Header />
		<slot />
	</main>
</body>
