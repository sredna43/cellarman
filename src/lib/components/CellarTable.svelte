<script lang="ts">
	import type { Wine } from '$lib/types';
	import { filter } from 'lodash';
	import MdEdit from 'svelte-icons/md/MdEdit.svelte';

	export let rows: Wine[] = [];
	export let edit: any;

	let searchVal = '';
	let searchedRows: Wine[] = [];
	let searchBy = 'name';

	const updateSearchFor = () => {
		searchedRows = filter(rows, (row: Wine) =>
			row[searchBy as keyof typeof row]?.toString().toLowerCase()?.includes(searchVal.toLowerCase())
		);
	};
</script>

<div class="grid search">
	<div class="search-bar">
		<!-- <label for="search">Search For:</label> -->
		<input name="search" type="search" bind:value={searchVal} on:input={updateSearchFor} />
	</div>

	<div class="search-by">
		<!-- <label for="searchby">Search By:</label> -->
		<select name="searchby" bind:value={searchBy}>
			<option selected value="" disabled>Search by...</option>
			<option value="name">Wine Name</option>
			<option value="maker">Wine Maker</option>
			<option value="appellation">Appellation</option>
			<option value="varietal">Grape Varietal(s)</option>
		</select>
	</div>
</div>

<div class="table-container">
	<table class="striped">
		<thead>
			<tr>
				<th scope="col">Edit</th>
				<th scope="col" class="col-l">Wine Name</th>
				<th scope="col">Points</th>
				<th scope="col">Wine Maker</th>
				<th scope="col">Appellation</th>
				<th scope="col">Vintage</th>
				<th scope="col">Type</th>
				<th scope="col" class="col-l">Grape Varietal(s)</th>
				<th scope="col">Purchase Price</th>
				<th scope="col" class="col-l">Purchase Date</th>
				<th scope="col">Bottles Left</th>
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
					<td>{row.name}</td>
					<td>{row.points}</td>
					<td>{row.maker}</td>
					<td>{row.appellation}</td>
					<td>{row.vintage}</td>
					<td>{row.type}</td>
					<td>{row.varietal}</td>
					<td>${row.price}</td>
					<td>{row.purchaseDate}</td>
					<td>{row.bottles}</td>
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
		z-index: 1;
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
	}

	/* desktop */
	@media screen and (min-width: 540px) {
		.search {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			grid-template-rows: 1fr;
			grid-column-gap: 20px;
			grid-row-gap: 0px;
			padding-left: 1%;
			padding-right: 1%;
		}
		.search-bar {
			grid-area: 1 / 1 / 2 / 4;
		}
		.search-by {
			grid-area: 1 / 4 / 2 / 5;
		}
	}
</style>
