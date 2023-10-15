<script lang="ts">
	export let options: Array<{ value: string; label: string }>;
	export let radioSelected = options[0].value;
	export let column: boolean = false;

	const uniqueID = Math.floor(Math.random() * 100);

	const slugify = (str = '') => str.toLowerCase().replace(/ /g, '-').replace(/\./g, '');

	let getCss = () => {
		if (column) {
			return 'flex-col';
		} else {
			return 'flex-row';
		}
	};
</script>

<div
	role="radiogroup"
	class="flex items-center mr-4"
	aria-labelledby={`label-${uniqueID}`}
	id={`group-${uniqueID}`}
>
	<div class={`flex ${getCss()}`}>
		{#each options as { value, label }}
    <div class="flex items-center">
			<input
				class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500"
				type="radio"
				id={slugify(label)}
				bind:group={radioSelected}
				{value}
			/>
			<label
				class="ml-2 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300"
				for={slugify(label)}
			>
				{label}
			</label>
    </div>
		{/each}
	</div>
</div>
