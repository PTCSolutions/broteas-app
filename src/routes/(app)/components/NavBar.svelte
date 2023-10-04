<script>
    import MenuItem from "./MenuItem.svelte";
</script>

<div class="bg-gray-100 w-32 min-h-screen p-2">
	<div class="flex-col">
		<div>
			<a href="/">Logo</a>
		</div>
        <div class="h-48"></div>
		<MenuItem title="Home" href="/"/>
        <MenuItem title="News" href="/news"/>
        <MenuItem title="Search" href="/search"/>
        <div class="flex-auto"></div>
		<MenuItem title="Settings" href="/settings"/>
	</div>
</div>
