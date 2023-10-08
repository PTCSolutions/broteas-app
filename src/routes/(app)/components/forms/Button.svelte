<script lang="ts">
	export let onClick: () => void;
	export let text: string;
</script>

<button
	class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
	type="button"
	on:click={onClick}
>
	{text}
</button>
