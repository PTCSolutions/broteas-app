<script>
	import GoldenTicket from './GoldenTicket.svelte';
	import { userProfileStore } from '$lib/stores/userStore';
</script>

<div
	class="flex flex-col items-center gap-2 text-black bg-white dark:bg-gray-800 dark:text-white overflow-hidden w-[420px] h-[280px]"
>
	
	<div class="font-medium mx-4 text-xl mb-1">Invite your friends to join D1SCO</div>
    <GoldenTicket />
	<!-- <div class="flex flex-row gap-2 items-center">
		<div class="font-semibold text-lg">Y A 3 4 3 P N</div>
		<div class="bg-gray-200 px-2 py-1 rounded-md">Copy</div>
	</div> -->
    <div class="absolute bottom-6">{`You have ${5 - ($userProfileStore?.user?.invite_code.times_used ?? 0)} invites remaining. Use them wisely!`}</div>
</div>
