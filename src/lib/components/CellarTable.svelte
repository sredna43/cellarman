<script lang="ts">
	import type { Wine } from '$lib/types';
	import MdEdit from 'svelte-icons/md/MdEdit.svelte';

	export let rows: Wine[] = [];
	export let edit: any;
</script>

<div class="table-container">
	<table class="striped">
		<thead>
			<tr>
				<th scope="col">Edit</th>
				<th scope="col" class="col-l">Name</th>
				<th scope="col">Points</th>
				<th scope="col">Wine Maker</th>
				<th scope="col">Appellation</th>
				<th scope="col">Vintage</th>
				<th scope="col">Type</th>
				<th scope="col" class="col-l">Grape Varietal(s)</th>
				<th scope="col">Purchase Price</th>
				<th scope="col" class="col-l">Purchase Date</th>
				<th scope="col"># of Bottles</th>
				<th scope="col" class="col-xl">Notes</th>
			</tr>
		</thead>
		<tbody>
			{#each rows as row}
				<tr>
					<td
						><button class="edit-button secondary" on:click={() => edit(row)}
							><div class="edit"><MdEdit /></div></button
						></td
					>
					<th scope="row">{row.name}</th>
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
	.edit-button {
		border-radius: 50%;
		padding: 0.25rem;
	}

	.edit {
		width: 24px;
		height: 24px;
		display: flex;
	}

	.table-container {
		overflow-x: scroll;
	}

	.col-l {
		min-width: 200px;
	}

	.col-xl {
		min-width: 350px;
	}
</style>
