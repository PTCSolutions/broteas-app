<script>
	import '../app.css';
	import NavBar from './NavBar.svelte';
</script>

<div class="flex-row flex">
	<NavBar />
	<slot />
</div>
