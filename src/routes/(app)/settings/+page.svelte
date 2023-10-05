<script lang="ts">
    import type {User} from "$lib/user";
    // Get User from load page
    export let data : User | null;
</script>

<div class="flex flex-col">
    <h1>SETTINGS</h1>
    <h2>Your profile:</h2>
    {#if data != null}
    <div>{`Uid: ${data?.uid}`}</div>
    <div>{`First Name: ${data?.firstName}`}</div>
    <div>{`Last Name: ${data?.lastName}`}</div>
    <div>{`Followers: ${data?.followers.length}`}</div>
    <div>{`Following: ${data?.following.length}`}</div>
    {/if}
</div>
<div class="grow" />