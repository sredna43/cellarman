<script lang="ts">
	import type { SearchFilters } from '$lib/typings/types';

	export let searchFilters: SearchFilters;
	export let updateRows: any;
	export let updateSearchBy: any;
	export let toggleShowStockOnly: any;
</script>

<div class="search">
	<div class="search-bar">
		<label for="search">Search For:</label>
		<input name="search" type="search" bind:value={searchFilters.searchVal} on:input={updateRows} />
	</div>
	<div class="search-by">
		<label for="searchby">Search By:</label>
		<select name="searchby" bind:value={searchFilters.searchBy} on:change={updateSearchBy}>
			<option value="name">Wine Name</option>
			<option value="maker">Wine Maker</option>
			<option value="appellation">Appellation</option>
			<option value="varietal">Grape Varietal(s)</option>
		</select>
	</div>
	<div class="sort-by">
		<label for="sort">Sort By:</label>
		<select name="sortby" bind:value={searchFilters.sortByVal} on:change={updateRows}>
			<option value="name">Wine Name</option>
			<option value="maker">Wine Maker</option>
			<option value="appellation">Appellation</option>
			<option value="varietal">Grape Varietal(s)</option>
			<option value="vintage">Vintage (old to new)</option>
			<option value="vintage-desc">Vintage (new to old)</option>
			<option value="bottles">Bottles (low to high)</option>
			<option value="bottles-desc" selected>Bottles (high to low)</option>
			<option value="points">Score (low to high)</option>
			<option value="points-desc">Score (high to low)</option>
			<option value="price">Price (low to high)</option>
			<option value="price-desc">Price (high to low)</option>
			<option value="purchaseDate">Purchase Date (old to new)</option>
			<option value="purchaseDate-desc">Purchase Date (new to old)</option>
		</select>
	</div>
	<label class="switch">
		<input
			type="checkbox"
			role="switch"
			on:change={toggleShowStockOnly}
			checked={searchFilters.showStockOnly}
		/> Only show bottles currently in collection
	</label>
</div>

<style>
	/* mobile */
	@media screen and (max-width: 900px) {
		.search {
			padding: 1rem;
		}

		.sort-by {
			padding-bottom: 1rem;
		}
	}

	/* desktop */
	@media screen and (min-width: 900px) {
		.search {
			display: grid;
			grid-template-columns: 8fr repeat(2, 2fr);
			grid-template-rows: 1fr;
			grid-column-gap: 15px;
			grid-row-gap: 0px;

			padding-top: 3rem;
			padding-left: 3rem;
			padding-right: 3rem;
		}

		.search-bar {
			grid-area: 1 / 1 / 2 / 2;
		}

		.search-by {
			grid-area: 1 / 2 / 2 / 3;
		}

		.sort-by {
			grid-area: 1 / 3 / 2 / 4;
		}

		.switch {
			grid-area: 2 / 2 / 3 / 4;
		}
	}
</style>
