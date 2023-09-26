<script lang="ts">
	import type { Wine } from '$lib/types';
	import _ from 'lodash';
	import MdEdit from 'svelte-icons/md/MdEdit.svelte';

	export let rows: Wine[] = [];
	export let edit: any;

	let searchVal = '';
	let sortByVal = 'bottles-desc';
	let searchBy = 'name';
	let sortBy = 'bottles-desc';
	let asc = 1;

	let searchedRows: Wine[] = _.cloneDeep(rows);

	let totalBottles = 0;
	rows.forEach((wine) => (totalBottles += parseInt(wine.bottles || '0')));

	const updateRows = () => {
		searchedRows = _.filter(rows, (row: Wine) =>
			row[searchBy as keyof typeof row]?.toString().toLowerCase()?.includes(searchVal.toLowerCase())
		);
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
</script>

<div class="bottles">
	{#if totalBottles > 1}
		<h4>You have {totalBottles} bottles in your collection</h4>
	{:else if totalBottles == 1}
		<h4>You only have one bottle left!</h4>
	{:else}
		<h4>Your collection is empty :(</h4>
	{/if}
</div>

<div class="search">
	<div class="search-bar">
		<label for="search">Search For:</label>
		<input name="search" type="search" bind:value={searchVal} on:input={updateRows} />
	</div>
	<div class="search-by">
		<label for="searchby">Search By:</label>
		<select name="searchby" bind:value={searchBy} on:change={updateRows}>
			<option value="name">Wine Name</option>
			<option value="maker">Wine Maker</option>
			<option value="appellation">Appellation</option>
			<option value="varietal">Grape Varietal(s)</option>
		</select>
	</div>
	<div class="sort-by">
		<label for="sort">Sort By:</label>
		<select name="sortby" bind:value={sortByVal} on:change={updateRows}>
			<option value="name">Wine Name</option>
			<option value="maker">Wine Maker</option>
			<option value="appellation">Appellation</option>
			<option value="varietal">Grape Varietal(s)</option>
			<option value="vintage">Vintage (old to new)</option>
			<option value="vintage-desc">Vintage (new to old)</option>
			<option value="bottles">Bottles (low to high)</option>
			<option value="bottles-desc">Bottles (high to low)</option>
			<option value="points">Score (low to high)</option>
			<option value="points-desc">Score (high to low)</option>
			<option value="price">Price (low to high)</option>
			<option value="price-desc">Price (high to low)</option>
			<option value="purchaseDate">Purchase Date (old to new)</option>
			<option value="purchaseDate-desc">Purchase Date (new to old)</option>
		</select>
	</div>
</div>

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
							class="edit-button secondary"
							on:click={() => edit(row)}
							data-tooltip="Edit row"
							data-placement="right"
							><div class="edit">
								<MdEdit />
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
	@media screen and (max-width: 540px) {
		.search {
			padding: 1rem;
		}

		.sort-by {
			padding-bottom: 1rem;
		}

		.bottles {
			text-align: center;
		}
	}

	/* desktop */
	@media screen and (min-width: 540px) {
		.search {
			display: grid;
			grid-template-columns: 8fr repeat(2, 2fr);
			grid-template-rows: 1fr;
			grid-column-gap: 15px;
			grid-row-gap: 0px;

			padding-top: 1rem;
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

		.bottles {
			position: absolute;
			top: 2rem;
			right: 2rem;
		}
	}
</style>
