<script lang="ts">
	export let src: string;
	export let artistName: string;
	export let songName: string;
</script>

<div class="w-80 h-80 rounded-lg relative">
	<img class="rounded-lg z-0 absolute" {src} alt="" />
	<div
		class="w-80 h-40 p-4 z-10 bottom-0 absolute rounded-lg bg-gradient-to-t to-transparent from-black flex-col flex justify-end"
	>
		<div class="text-white text-lg">{songName}</div>
		<div class="text-white">{artistName}</div>
	</div>
</div>
