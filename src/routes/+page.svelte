<script>
	import FaPlus from 'svelte-icons/fa/FaPlus.svelte';
	import MdAdd from 'svelte-icons/md/MdAdd.svelte';
	let inputFormOpen = false;
	let date = new Date();
	let today = `${date.getFullYear()}-${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}-${
		date.getDate() < 9 ? '0' : ''
	}${date.getDate()}`;

	const openInputForm = () => {
		inputFormOpen = true;
	};

	const closeInputForm = () => {
		inputFormOpen = false;
	};
</script>

<dialog open={inputFormOpen}>
	<article>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-missing-attribute -->
		<a aria-label="Close" class="close" on:click={closeInputForm} on:keypress={closeInputForm} />
		<h2>Add a bottle</h2>

		<form method="POST">
			<fieldset>
				<div class="grid">
					<label for="name"
						>Wine Name:<input
							name="name"
							type="text"
							placeholder="Wine Name"
							aria-label="Wine Name"
						/></label
					>
					<label for="winemaker"
						>Winemaker:<input
							name="maker"
							type="text"
							placeholder="Winemaker"
							aria-label="Winemaker"
						/></label
					>
				</div>
				<div class="grid">
					<div>
						<legend>Type:</legend>
						<label><input type="radio" name="type" value="red" id="red" /> Red</label>
						<label><input type="radio" name="type" value="white" id="white" /> White</label>
						<label><input type="radio" name="type" value="rose" id="rose" /> Rosé</label>
					</div>

					<label for="varietal"
						>Grape Varietal(s):<input
							name="varietal"
							type="text"
							placeholder="Grape Varietal(s)"
							aria-label="Grape Varietal(s)"
						/></label
					>
				</div>
				<div class="grid">
					<label
						>Purchase Price:<input
							name="price"
							type="num"
							min="1.00"
							step="any"
							placeholder="Purchase Price"
							aria-label="Purchase Price"
						/></label
					>

					<label
						>Purchase Date:<input
							name="purchase-date"
							type="date"
							aria-label="Purchase Date"
							value={today}
						/></label
					>
					<label
						>Bottles in Cellar:<input
							name="bottles"
							type="tel"
							aria-label="Bottles in Cellar"
							placeholder="Bottles in Cellar"
						/></label
					>
				</div>
				<label>Notes: <textarea placeholder="Any notes..." /></label>
			</fieldset>
			<button class="primary" type="submit"> Add </button>
		</form>
	</article>
</dialog>

<button
	class="add"
	on:click={openInputForm}
	data-tooltip="Add a bottle to your cellar"
	data-placement="left"
>
	<MdAdd />
</button>

<style>
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
		position: absolute;
		right: 0;
		bottom: 0;
		margin-right: 2rem;
		margin-bottom: 2rem;
	}
</style>
