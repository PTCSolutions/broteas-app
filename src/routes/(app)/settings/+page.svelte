<script lang="ts">
    import {enhance} from "$app/forms";
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
    <div class="h-14"></div>
    <div>Enter the uid of your friends below, and click the button to follow them!</div>
    <form method="POST" action="?/follow" use:enhance>
        <label>
            UID
            <input name="uid" type="text" />
        </label>
        <button>Follow!</button>
    </form>
    <div>Or unfollow them!</div>
    <form method="POST" action="?/unfollow" use:enhance>
        <label>
            UID
            <input name="uid" type="text" />
        </label>
        <button>Unfollow!</button>
    </form>
    {/if}
</div>
<div class="grow" />

<style>
    input {
        border: solid 1px black;
    }
</style>