<script lang="ts">
	import { page } from '$app/stores';
</script>

<div>
	<h3>{$page.status} {$page.error?.message}</h3>
	<a href="/" role="button">Go back to inventory</a>
</div>

<style>
	div {
		text-align: center;
		padding-top: 2rem;
	}
</style>
