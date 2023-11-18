<script lang="ts">
	import type { Artist } from '$lib/spotify';
	export let artist: Artist;
</script>

<div class="w-12 h-12 rounded">
	<img class="rounded" src={artist.images[0]?.url} alt="" />
</div>
<div class="w-4" />
<div class="flex-col flex items-start text-lg font-medium">
	{artist.name}
</div>
<div class="grow" />
