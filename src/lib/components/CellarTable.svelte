<script lang="ts">
	import type { Wine } from '$lib/typings/types';
	import _ from 'lodash';
	import Edit from './icons/Edit.svelte';
	import SearchBar from './SearchBar.svelte';

	export let rows: Wine[] = [];
	export let edit: any;

	export let screenSize = 990;

	let searchVal = '';
	let sortByVal = 'bottles-desc';
	let searchBy = 'name';
	let sortBy = 'bottles-desc';
	let asc = 1;
	let showStockOnly = false;

	let searchedRows: Wine[] = _.cloneDeep(rows);

	let totalBottles = 0;
	rows.forEach((wine) => (totalBottles += parseInt(wine.bottles || '0')));

	const updateRows = () => {
		searchedRows = _.filter(rows, (row: Wine) =>
			row[searchBy as keyof typeof row]?.toString().toLowerCase()?.includes(searchVal.toLowerCase())
		);
		if (showStockOnly) {
			searchedRows = searchedRows.filter((row) => parseInt(row.bottles || '0') > 0);
		}
		if (sortByVal.includes('desc')) {
			sortBy = sortByVal.replace('-desc', '');
			asc = -1;
		} else {
			sortBy = sortByVal;
			asc = 1;
		}
		searchedRows.sort((a: Wine, b: Wine) => {
			if (sortBy.includes('price')) {
				return parseFloat(a[sortBy as keyof typeof a]?.toString() || '0') >
					parseFloat(b[sortBy as keyof typeof b]?.toString() || '0')
					? 1 * asc
					: -1 * asc;
			}
			return (a[sortBy as keyof typeof a]?.toString().replace(/[^a-z0-9]/gi, '') || '') >
				(b[sortBy as keyof typeof b]?.toString().replace(/[^a-z0-9]/gi, '') || '')
				? 1 * asc
				: -1 * asc;
		});
	};

	const updateSearchBy = () => {
		if (searchVal) {
			updateRows();
		}
	};

	const toggleShowStockOnly = () => {
		showStockOnly = !showStockOnly;
		updateRows();
	};
</script>

{#if screenSize > 900}
	<SearchBar bind:searchBy bind:searchVal bind:sortByVal {updateRows} {updateSearchBy} />
	<div class="bottles">
		{#if totalBottles > 1}
			<h4>You have {totalBottles} bottles in your collection</h4>
		{:else if totalBottles == 1}
			<h4>You only have one bottle left!</h4>
		{:else}
			<h4>Your collection is empty :(</h4>
		{/if}
		<label class="switch">
			<input
				type="checkbox"
				role="switch"
				on:change={toggleShowStockOnly}
				checked={showStockOnly}
			/> Only show bottles currently in collection
		</label>
	</div>
{:else}
	<details class="container">
		<!-- svelte-ignore a11y-no-redundant-roles -->
		<summary role="button" class="secondary outline">Search Options</summary>
		<SearchBar bind:searchBy bind:searchVal bind:sortByVal {updateRows} {updateSearchBy} />
		<div class="bottles">
			{#if totalBottles > 1}
				<h4>You have {totalBottles} bottles in your collection</h4>
			{:else if totalBottles == 1}
				<h4>You only have one bottle left!</h4>
			{:else}
				<h4>Your collection is empty :(</h4>
			{/if}
			<label class="switch">
				<input
					type="checkbox"
					role="switch"
					on:change={toggleShowStockOnly}
					checked={showStockOnly}
				/> Only show bottles currently in collection
			</label>
		</div>
	</details>
{/if}

<div class="table-container">
	<table class="striped">
		<thead>
			<tr>
				<th scope="col">Edit</th>
				<th scope="col">Vintage</th>
				<th scope="col" class="col-l">Wine Name</th>
				<th scope="col">Wine Maker</th>
				<th scope="col">Appellation</th>
				<th scope="col">Score</th>
				<th scope="col">Bottles</th>
				<th scope="col">Type</th>
				<th scope="col" class="col-l">Grape Varietal(s)</th>
				<th scope="col">Purchase Price</th>
				<th scope="col" class="col-l">Purchase Date</th>
				<th scope="col" class="col-xl">Notes</th>
			</tr>
		</thead>
		<tbody>
			{#each searchedRows as row}
				<tr>
					<td
						><button
							class="outline contrast edit-button"
							on:click={() => edit(row)}
							data-tooltip="Edit row"
							data-placement="right"
							><div class="edit">
								<Edit />
							</div></button
						></td
					>
					<td>{row.vintage}</td>
					<td>{row.name}</td>
					<td>{row.maker}</td>
					<td>{row.appellation}</td>
					<td>{row.points}</td>
					<td>{row.bottles}</td>
					<td>{row.type}</td>
					<td>{row.varietal}</td>
					<td>${row.price}</td>
					<td>{row.purchaseDate}</td>
					<td>{row.notes}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	thead,
	th {
		top: 0;
		position: sticky;
		z-index: 10;
	}

	.edit-button {
		padding: 0.25rem;
		z-index: 0;
	}

	.edit {
		width: 24px;
		height: 24px;
		display: flex;
	}

	.table-container {
		overflow: scroll;
		max-height: 73vh;
	}

	.col-l {
		min-width: 200px;
	}

	.col-xl {
		min-width: 350px;
	}

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
	}
</style>
