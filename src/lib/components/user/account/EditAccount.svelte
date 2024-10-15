<script lang="ts">
	import { enhance } from "$app/forms";
	import type { User } from "$lib/user";
	import { Button, Input } from "flowbite-svelte";
    
    export let user: User
    let edit = false
</script>

<div class="bg-white dark:bg-gray-600 rounded-lg p-4">
    <form
        class="flex flex-col gap-2"
        method="POST"
        use:enhance={() => {
            return async ({ result, update }) => {
                await update({ reset: false });
                edit = false;
            };
        }}
    >
        <div class="flex flex-row gap-2 items-center mb-2">
            <div class="text-xl">Profile</div>
            <button
                type="button"
                on:click={() => {
                    edit = !edit;
                }}
                class="flex flex-col"
            >
                <span class="material-symbols-outlined text-sm"> edit </span></button
            >
        </div>
        <div>Email<span class="font-semibold ml-2">{user.email}</span></div>
        <div>Username<span class="font-semibold ml-2">{user.username}</span></div>
        <div class="flex flex-row gap-2 items-center">
            <div>First Name</div>
            {#if edit}
                <Input
                    class="w-50 border-none focus:ring-0 text-base"
                    name={'firstName'}
                    type="text"
                    value={user.firstName}
                />
            {:else}
                <Input
                    class="w-50 border-none focus:ring-0 cursor-default text-base"
                    name={'firstName'}
                    type="text"
                    readonly
                    value={user.firstName}
                />
            {/if}
        </div>
        <div class="flex flex-row gap-2 items-center">
            <div>Last Name</div>
            {#if edit}
                <Input
                    class="w-50 border-none focus:ring-0 text-base"
                    name={'lastName'}
                    type="text"
                    value={user.lastName}
                />
            {:else}
                <Input
                    class="w-50 border-none focus:ring-0 cursor-default text-base"
                    name={'lastName'}
                    type="text"
                    readonly
                    value={user.lastName}
                />
            {/if}
        </div>
        {#if edit}
            <div class="w-1/12">
                <Button type="submit" class="focus:ring-0" color="dark" size="sm">Save</Button>
            </div>
        {/if}
        <input type="hidden" value={user.uid} name="uid" />
    </form>
</div>