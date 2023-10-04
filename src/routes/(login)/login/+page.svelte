<script>
    import {enhance} from "$app/forms";

    /** @type {import('./$types').ActionData} */
    export let form;

    $: message = "Is there an error: " + form?.error;
</script>

<form method="POST" action="?/signUp" use:enhance>
	<label>
		Email
		<input name="email" type="email"/>
	</label>
	<label>
		Password
		<input name="password" type="password" />
	</label>
	<button>Sign Up</button>
</form>

<div>{message}</div>

<form method="POST" action="?/logIn">
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
