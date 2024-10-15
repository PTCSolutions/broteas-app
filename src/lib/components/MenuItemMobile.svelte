<script lang="ts">
	export let title: string;
	export let href: string;
	export let small: boolean = false;
	import { page } from "$app/stores";
</script>

<a {href} class={`my-1 py-1 px-2 w-full text-left rounded-md hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600 ${small ? "text-md" : "text-xl"} ${$page.url.pathname === href ? "font-bold" : ""}`}>
	<img class="w-4 " src="menu_icons/music-solid.svg" alt="">
</a>
