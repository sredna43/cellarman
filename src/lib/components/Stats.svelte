<script lang="ts">
	import type { WineStats } from '$lib/typings/types';
	export let stats: WineStats;
</script>

<div class="bottles">
	{#if stats.totalBottles > 1}
		<h4>
			You have {stats.totalBottles} bottles worth ${Math.round(stats.totalPrice * 100) / 100}.
		</h4>
		<h4>{stats.totalRed} Reds, {stats.totalWhite} Whites, and {stats.totalRose} Rosés.</h4>
	{:else if stats.totalBottles == 1}
		<h4>You only have one bottle left!</h4>
	{:else}
		<h4>Your collection is empty :(</h4>
	{/if}
</div>

<style>
	/* mobile */
	@media screen and (max-width: 900px) {
		.bottles {
			text-align: center;
		}

		.switch {
			margin: 0 auto;
		}
	}

	/* desktop */
	@media screen and (min-width: 900px) {
		.bottles {
			position: absolute;
			top: 2%;
			right: 2rem;
		}
		.switch {
			position: absolute;
			align-self: center;
			top: 2%;
		}
	}
</style>
