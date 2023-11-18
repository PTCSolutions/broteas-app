<script lang="ts">
	import type { NewsMeta } from '$lib/news';

	export let object: NewsMeta;
</script>

<div class="w-full h-auto flex flex-col gap-2 dark:bg-gray-600 dark:text-white rounded-lg">
	<img class="rounded" src={object.img} alt="img" />
	<div class="flex flex-row gap-1 items-center">
		<img class="h-4 w-4" src={object.favicon} alt="img" />
		<a href={object.domain} class="text-sm hover:underline">{object.domain}</a>
	</div>
	<div class="text-lg font-semibold">{object.title}</div>
	<span class="text-sm">{object.description} <a href={object.url} class="font-medium hover:underline text-blue-600">read more</a></span>
	
</div>
