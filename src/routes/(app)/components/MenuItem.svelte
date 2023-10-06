<script lang="ts">
	export let title: string;
	export let href: string;
</script>

<div class="my-8 py-1 px-2 rounded-md hover:bg-gray-300">
	<a {href} class="text-xl">{title} </a>
</div>
