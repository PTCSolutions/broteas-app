<script>
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	let postVisibilityOptions = ['People who follow you', 'Everyone'];
	let selectedPostVisibility = postVisibilityOptions[0];
	let postVisibilityDropdown = false;

    let commentVisibilityOptions = ['People who can see the post','People who follow you','Everyone'];
	let selectedCommentVisibility = commentVisibilityOptions[0];
	let commentVisibilityDropdown = false;

    let suggestedPostOptions = ['Yes', 'No'];
	let selectedSuggestedPosts = suggestedPostOptions[0];
	let suggestedPostsDropdown = false;
</script>

<div class="bg-white dark:bg-gray-600 rounded-lg p-4 flex flex-col gap-2">
	<div class="text-xl">
		Posts<span class="text-sm">{` [In development]`}</span>
	</div>
	<div class="flex flex-row items-center gap-4">
		<div>People who can your posts:</div>
		<Button size={'xs'}>{selectedPostVisibility}</Button>
		<Dropdown bind:open={postVisibilityDropdown}>
			{#each postVisibilityOptions as option}
				<DropdownItem
					on:click={() => {
                        postVisibilityDropdown = false;
						selectedPostVisibility = option;
					}}>{option}</DropdownItem
				>
			{/each}
		</Dropdown>
	</div>
	<div class="flex flex-row items-center gap-4">
		<div>People who can your comments:</div>
		<Button size={'xs'}>{selectedCommentVisibility}</Button>
		<Dropdown bind:open={commentVisibilityDropdown}>
			{#each commentVisibilityOptions as option}
				<DropdownItem
					on:click={() => {
                        commentVisibilityDropdown = false;
						selectedCommentVisibility = option;
					}}>{option}</DropdownItem
				>
			{/each}
		</Dropdown>
	</div>
	<div class="flex flex-row items-center gap-4">
		<div>Show suggested posts:</div>
		<Button size={'xs'}>{selectedSuggestedPosts}</Button>
		<Dropdown bind:open={suggestedPostsDropdown}>
			{#each suggestedPostOptions as option}
				<DropdownItem
					on:click={() => {
                        suggestedPostsDropdown = false;
						selectedSuggestedPosts = option;
					}}>{option}</DropdownItem
				>
			{/each}
		</Dropdown>
	</div>
</div>
