<script lang="ts">
	import type { Song } from '$lib/spotify';
	export let song: Song;

	function millisToMinutesAndSeconds(millis: number) {
		var minutes: number = Math.floor(millis / 60000);
		var seconds: number = Math.round((millis % 60000) / 1000);
		return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	}
</script>

<div class="w-12 h-12 rounded">
	<img class="rounded" src={song.album.images[0].url} alt="" />
</div>
<div class="w-4" />
<div class="flex-col flex items-start">
	<div class="text-lg font-medium">
		{song.name}
	</div>
	<a href={`/artists/${song.artists[0].id}`} class="hover:underline">
		{song.artists[0].name}
	</a>
</div>
<div class="grow" />
<div>
	{millisToMinutesAndSeconds(song.duration_ms)}
</div>
