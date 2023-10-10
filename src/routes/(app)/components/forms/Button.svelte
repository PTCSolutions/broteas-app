<script lang="ts">
	export let onClick: any = null;
	export let text: string;
	export let disabled : boolean = false;
</script>

<button
	class="shadow bg-purple-500 w-full hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
	type="submit"
	on:click={onClick}
	{disabled}
>
	{text}
</button>
