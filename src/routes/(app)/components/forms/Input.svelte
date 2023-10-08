<script lang="ts">
    // id of input
	export let id: string;
    // type of input
	export let type: string;
    // placeholder for input
	export let placeholder: string;
	// bind
	export let bind : boolean = false;
    // whether to bind to input value
	export let value : string = "";
    // should input autocomplete
	export let autocomplete: boolean = true;
</script>

{#if bind}
	<input
		class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
		name={id}
		type="text"
		{placeholder}
		autocomplete = {autocomplete ? "on" : "off"}
		bind:value={value}
	/>
{:else}
	<input
		class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
		name={id}
		{type}
		{placeholder}
		autocomplete = {autocomplete ? "on" : "off"}
	/>
{/if}
