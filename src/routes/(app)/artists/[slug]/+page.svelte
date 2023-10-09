<script lang='ts'>
	import { getContext } from 'svelte';

	let json;
    
    const response = await fetch(`https://api.spotify.com/v1/artists/${data.artistId}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			});
			if (response.status == 200) {
				let json = await response.json();
				
			} else {

			}
</script>

<div>
    <h1>{data.artistId}</h1>
	<p>{json.name}</p>
</div>