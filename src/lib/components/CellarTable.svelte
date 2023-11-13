<script lang="ts">
	import type { SearchFilters, Wine, WineStats } from '$lib/typings/types';
	import _ from 'lodash';
	import Edit from './icons/Edit.svelte';
	import SearchBar from './SearchBar.svelte';
	import Stats from './Stats.svelte';
	import { onMount } from 'svelte';

	export let rows: Wine[] = [];
	export let edit: any;

	export let screenSize = 990;

	let loading = true;

	let searchFilters: SearchFilters = {
		searchVal: '',
		searchBy: 'name',
		sortByVal: 'bottles-desc',
		sortBy: '',
		asc: 1,
		showStockOnly: false
	};

	let searchedRows: Wine[] = _.cloneDeep(rows);

	let stats: WineStats = {
		totalBottles: 0,
		totalPrice: 0.0,
		totalRed: 0,
		totalWhite: 0,
		totalRose: 0
	};

	rows.forEach((wine) => {
		let bottles = parseInt(wine.bottles || '0');
		if (bottles > 0) {
			stats.totalBottles += bottles;
			stats.totalPrice += parseFloat(wine.price || '0.0');
			switch (wine.type?.toLocaleLowerCase()) {
				case 'red':
					stats.totalRed += 1;
					break;
				case 'white':
					stats.totalWhite += 1;
					break;
				case 'rosé':
					stats.totalRose += 1;
					break;
				default:
					break;
			}
		}
	});

	const updateRows = () => {
		searchedRows = _.filter(rows, (row: Wine) =>
			row[searchFilters.searchBy as keyof typeof row]
				?.toString()
				.toLowerCase()
				?.includes(searchFilters.searchVal.toLowerCase())
		);
		if (searchFilters.showStockOnly) {
			searchedRows = searchedRows.filter((row) => parseInt(row.bottles || '0') > 0);
		}
		if (searchFilters.sortByVal.includes('desc')) {
			searchFilters.sortBy = searchFilters.sortByVal.replace('-desc', '');
			searchFilters.asc = -1;
		} else {
			searchFilters.sortBy = searchFilters.sortByVal;
			searchFilters.asc = 1;
		}
		loading = false;
		searchedRows.sort((a: Wine, b: Wine) => {
			if (searchFilters.sortBy.includes('price')) {
				return parseFloat(a[searchFilters.sortBy as keyof typeof a]?.toString() || '0') >
					parseFloat(b[searchFilters.sortBy as keyof typeof b]?.toString() || '0')
					? 1 * searchFilters.asc
					: -1 * searchFilters.asc;
			}
			return (a[searchFilters.sortBy as keyof typeof a]?.toString().replace(/[^a-z0-9]/gi, '') ||
				'') >
				(b[searchFilters.sortBy as keyof typeof b]?.toString().replace(/[^a-z0-9]/gi, '') || '')
				? 1 * searchFilters.asc
				: -1 * searchFilters.asc;
		});
	};

	const updateSearchBy = () => {
		if (searchFilters.searchVal) {
			updateRows();
		}
	};

	const toggleShowStockOnly = () => {
		searchFilters.showStockOnly = !searchFilters.showStockOnly;
		updateRows();
	};

	let saveSearch = false;

	$: if (saveSearch) {
		window.sessionStorage.setItem('searchFilters', JSON.stringify(searchFilters));
	}

	onMount(async () => {
		let ses = window.sessionStorage.getItem('searchFilters');
		if (ses) {
			searchFilters = JSON.parse(ses);
			updateRows();
		}
		saveSearch = true;
	});
</script>

{#if loading}
	<div class="loading" />
{/if}

{#if screenSize > 900}
	<SearchBar bind:searchFilters {toggleShowStockOnly} {updateRows} {updateSearchBy} />
	<Stats bind:stats />
{:else}
	<details class="container">
		<!-- svelte-ignore a11y-no-redundant-roles -->
		<summary role="button" class="secondary outline">Search</summary>
		<SearchBar bind:searchFilters {toggleShowStockOnly} {updateRows} {updateSearchBy} />
		<Stats bind:stats />
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
							class="outline secondary edit-button"
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
</style>
