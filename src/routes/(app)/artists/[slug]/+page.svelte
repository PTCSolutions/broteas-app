<script lang="ts">
	import { accessToken } from '$lib/stores/accessToken';
	export let data;

	async function getArtistData() {
		const response = await fetch(`https://api.spotify.com/v1/artists/${data.artistId}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${$accessToken}`
			}
		});
		if (response.status == 200) {
			let json = await response.json();
			return json;
		} else {
			return {};
		}
	}
</script>

<div>
	<h1>{data.artistId}</h1>
	{#await getArtistData()}
		<p>loading</p>
	{:then json}
		<p>{json.name}</p>
		<p>{json.popularity}</p>
	{:catch error}
		<div>{error}</div>
	{/await}
</div>
