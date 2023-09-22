<script lang="ts">
	import CellarTable from '$lib/components/CellarTable.svelte';
	import MdAdd from 'svelte-icons/md/MdAdd.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let isEditingForm = false;
	let inputFormOpen = false;
	let youSure = false;
	let date = new Date();
	let today = `${date.getFullYear()}-${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}-${
		date.getDate() < 9 ? '0' : ''
	}${date.getDate()}`;

	const defaultData = {
		_id: '',
		name: '',
		points: '75',
		maker: '',
		appellation: '',
		vintage: '',
		type: 'Red',
		varietal: '',
		price: '',
		purchaseDate: today,
		bottles: '',
		notes: ''
	};

	let formData = {
		_id: '',
		name: '',
		points: '75',
		maker: '',
		appellation: '',
		vintage: '',
		type: 'Red',
		varietal: '',
		price: '',
		purchaseDate: today,
		bottles: '',
		notes: ''
	};

	const addButtonPressed = () => {
		isEditingForm = false;
		formData = defaultData;
		openInputForm();
	};

	const openInputForm = () => {
		inputFormOpen = true;
	};

	const closeInputForm = () => {
		inputFormOpen = false;
	};

	const editRow = (e: any) => {
		isEditingForm = true;
		formData = e;
		openInputForm();
	};

	const toggleYouSure = () => {
		youSure = !youSure;
	};
</script>

<svelte:head>
	<title>My Inventory</title>
</svelte:head>

<CellarTable rows={data.wines} edit={editRow} />

<dialog open={inputFormOpen}>
	<article>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-missing-attribute -->
		<a aria-label="Close" class="close" on:click={closeInputForm} on:keypress={closeInputForm} />
		<h2>{isEditingForm ? 'Edit' : 'Add a bottle'}</h2>

		<form method="POST" action="?/add">
			{#if isEditingForm}
				<input type="hidden" name="_id" value={formData._id} />
			{/if}
			<fieldset>
				<div class="grid">
					<label for="name"
						>Wine Name:<input
							name="name"
							type="text"
							placeholder="Wine Name"
							aria-label="Wine Name"
							bind:value={formData.name}
						/></label
					>
					<label for="winemaker"
						>Winemaker:<input
							name="maker"
							type="text"
							placeholder="Winemaker"
							aria-label="Winemaker"
							bind:value={formData.maker}
						/></label
					>
				</div>
				<div class="grid">
					<label for="varietal"
						>Grape Varietal(s):<input
							name="varietal"
							type="text"
							placeholder="Grape Varietal(s)"
							aria-label="Grape Varietal(s)"
							bind:value={formData.varietal}
						/></label
					>
					<label for="appellation"
						>Appellation:<input
							name="appellation"
							type="text"
							placeholder="Appellation"
							aria-label="Appellation"
							bind:value={formData.appellation}
						/></label
					>
				</div>
				<div class="grid">
					<div>
						<legend>Type:</legend>
						<label
							><input
								type="radio"
								name="type"
								value="Red"
								id="red"
								checked={formData.type === 'Red'}
							/>Red</label
						>
						<label
							><input
								type="radio"
								name="type"
								value="White"
								id="white"
								checked={formData.type === 'White'}
							/>White</label
						>
						<label
							><input
								type="radio"
								name="type"
								value="Rosé"
								id="rose"
								checked={formData.type === 'Rosé'}
							/>Rosé</label
						>
					</div>
					<div>
						<label for="vintage"
							>Vintage:<input
								name="vintage"
								type="tel"
								placeholder="Vintage"
								aria-label="Vintage"
								bind:value={formData.vintage}
							/></label
						>
					</div>
					<div>
						<label for="points"
							>Points: <h6 class="points">{formData.points}</h6></label
						>
						<input
							name="points"
							type="range"
							aria-label="points"
							placeholder="Points"
							min="50"
							max="100"
							bind:value={formData.points}
							class="range"
						/>
					</div>
				</div>

				<div class="grid top-pad">
					<label
						>Purchase Price:<input
							name="price"
							type="num"
							min="1.00"
							step="any"
							placeholder="Purchase Price"
							aria-label="Purchase Price"
							bind:value={formData.price}
						/></label
					>
					<label
						>Purchase Date:<input
							name="purchaseDate"
							type="date"
							aria-label="Purchase Date"
							bind:value={formData.purchaseDate}
						/></label
					>
					<label
						>Bottles in Cellar:<input
							name="bottles"
							type="tel"
							aria-label="Bottles in Cellar"
							placeholder="Bottles in Cellar"
							bind:value={formData.bottles}
						/></label
					>
				</div>
				<label
					>Notes: <textarea
						name="notes"
						placeholder="Any notes..."
						bind:value={formData.notes}
					/></label
				>
			</fieldset>
			<button class="primary save" type="submit">{isEditingForm ? 'Save Changes' : 'Add'}</button>
			{#if isEditingForm}
				<dialog open={youSure}>
					<article class="you-sure">
						<h2>Are you sure?</h2>
						<footer>
							<button class="secondary" type="button" on:click={toggleYouSure}>Back</button>
							<button class="delete-confirm" formaction="?/delete" type="submit">Delete</button>
						</footer>
					</article>
				</dialog>
				{#if !youSure}
					<button class="delete-initial" type="button" on:click={toggleYouSure}>Delete</button>
				{/if}
			{/if}
		</form>
	</article>
</dialog>

<button
	class="add"
	on:click={addButtonPressed}
	data-tooltip="Add a bottle to your cellar"
	data-placement="left"
>
	<MdAdd />
</button>

<style>
	.you-sure {
		min-width: 30%;
	}

	.save {
		float: right;
	}

	.delete-confirm {
		background-color: var(--pico-color-red-550);
		border-color: var(--pico-color-red-550);
	}

	.delete-initial {
		background-color: var(--pico-color-red-550);
		border-color: var(--pico-color-red-550);
		float: left;
	}

	.close:hover {
		cursor: pointer;
	}

	article {
		min-width: 60%;
	}

	.add {
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		position: fixed;
		right: 0;
		bottom: 0;
		margin-right: 1rem;
		margin-bottom: 1rem;
	}

	.points {
		margin: 0.5rem;
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		display: inline;
		background-color: #1c212c;
		border-radius: var(--pico-border-radius);
	}

	.range {
		margin-top: 1.5rem;
	}

	.top-pad {
		padding-top: 1rem;
	}
</style>
