<script lang="ts">
	import ProfileBanner from '$lib/components/user/ProfileBanner.svelte';
import { userProfileStore } from '$lib/stores/userStore';
</script>

<div class="h-full p-4 overflow-hidden flex flex-col">
	{#if $userProfileStore?.user?.uid != '' && $userProfileStore?.user?.uid != undefined && !$userProfileStore?.loading}
		<ProfileBanner user={$userProfileStore.user} />
	{/if}

</div>
