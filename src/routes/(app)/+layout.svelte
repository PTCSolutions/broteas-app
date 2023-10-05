<script>
	import '../../app.css';
	import NavBar from './components/NavBar.svelte';
</script>

<NavBar />
<div class="flex-row flex">
	<div class="w-32"></div>
	<slot />
	<div class="grow"></div>
	<div><a href="/login">Login</a></div>
</div>
