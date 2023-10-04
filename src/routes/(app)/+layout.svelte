<script>
	import '../../app.css';
	import NavBar from './components/NavBar.svelte';
</script>

<div class="flex-row flex">
	<NavBar />
	<slot />
</div>
