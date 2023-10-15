<script lang="ts">
	export let form;
    export let data;
    let user: User = data;
</script>

<div class="h-full p-4 overflow-hidden flex flex-col gap-4">
	{#if user}
        <div class="text-4xl font-semibold">Manage your account</div>
        <div class="bg-white dark:bg-gray-600 rounded-lg p-4">
            <div class="text-xl">Profile</div>
            <div>Firstname: {user.firstName}</div>
            <div>Lastname: {user.lastName}</div>
            <div>Email: ??</div>
            <div>Passoword: ??</div>
        </div>
        <div class="bg-white dark:bg-gray-600 rounded-lg p-4">
            <div class="text-xl">Posts</div>
            <div>People who can your posts: "People who follow you"</div>
            <div>People who can see your comments: "Anyone who can see the post"</div>
            <div>Show suggested posts: "Yes"</div>
        </div>
	{/if}
</div>