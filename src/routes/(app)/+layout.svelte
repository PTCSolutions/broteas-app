<script>
	import '../../app.css';
	import NavBar from './components/NavBar.svelte';
</script>

<div class="flex-row flex">
	<NavBar />
	<slot />
	<div class="grow"></div>
	<div><a href="/login">Login</a></div>
</div>
