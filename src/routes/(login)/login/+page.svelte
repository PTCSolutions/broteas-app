<script>
	import { enhance } from '$app/forms';
	/** @type {import('./$types').ActionData} */
	export let form;
</script>
<!-- Use progressive enhancement so that we can get nice transitions if js enabled-->
<form method="POST" use:enhance>
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
<!-- If there is an error on submitting the form, show it in red underneath-->
{#if form?.error != undefined}
	<!-- TODO: Have used normal css because cant get tailwind to work-->
	<div class="redText">{form.error}</div>
{/if}

<style>
	.redText {
		color: red;
	}
	
	input {
		border: solid 1px black;
	}
</style>
