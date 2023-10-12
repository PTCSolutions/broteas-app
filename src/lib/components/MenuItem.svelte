<script lang="ts">
	export let title: string;
	export let href: string;
	export let small: boolean = false;
</script>

<a {href} class={`my-1 py-1 px-2 rounded-md hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600 ${small ? "text-md" : "text-xl"}`}>
	{title}
</a>
