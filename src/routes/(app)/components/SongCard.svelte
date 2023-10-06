<script lang="ts">
	import type { Song } from '$lib/spotify';
	export let song: Song;

	function millisToMinutesAndSeconds(millis: number) {
		var minutes: number = Math.floor(millis / 60000);
		var seconds: number = Math.round((millis % 60000) / 1000);
		return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	}
</script>

<div class="flex-row flex bg-gray-100 m-2 p-2 items-center rounded-lg">
	<div class="w-12 h-12 bg-blue-500 rounded">
		<img class="rounded" src={song.album.images[0].url} alt="" />
	</div>
	<div class="w-4" />
	<div class="flex-col flex">
		<div class="text-lg font-medium">
			{song.name}
		</div>
		<div>
			{song.artists[0].name}
		</div>
	</div>
    <div class="grow"></div>
    <div>
        {millisToMinutesAndSeconds(song.duration_ms)}
    </div>
</div>
