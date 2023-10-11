<script>
	import MenuItem from './MenuItem.svelte';
</script>

<aside class="flex-col flex w-32 bg-gray-50 min-h-screen p-2 border-r-2 fixed">
	<div>
		<a href="/">Logo</a>
	</div>
	<div class="h-48" />
	<MenuItem title="Home" href="/" />
	<MenuItem title="News" href="/news" />
	<MenuItem title="Search" href="/search" />
	<div class="grow" />
	<MenuItem title="Settings" href="/settings" />
</aside>
