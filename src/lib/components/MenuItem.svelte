<script lang="ts">
	export let title: string;
	export let href: string;
	export let small: boolean = false;
	export let logout: boolean = false;
	import { page } from "$app/stores";
</script>

<a {href} class={`my-1 py-1 px-2 w-full rounded-md hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600 ${small ? "text-md" : "text-xl"} ${logout ? "hover:text-red-600" : ""} ${$page.url.pathname === href ? "font-bold" : ""}`}>
	{title}
</a>
