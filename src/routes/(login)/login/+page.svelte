<script>
	//TODO: Tidy up page and comment
	import { enhance } from '$app/forms';
	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<form method="POST" action="?/signUp" use:enhance>
	<label>
		Email
		<input name="email" type="email" />
	</label>
	<label>
		Password
		<input name="password" type="password" />
	</label>
	<button>Sign Up</button>
</form>
{#if form?.error != undefined}
	<!-- TODO: Have used normal css because cant get tailwind to work-->
	<div class="redText">{form.error}</div>
{/if}

<form method="POST" action="?/logIn" use:enhance>
	<label>
		Email
		<input name="email" type="email" />
	</label>
	<label>
		Password
		<input name="password" type="password" />
	</label>
	<button>Log In</button>
</form>

<style>
	.redText {
		color: red;
	}
</style>
