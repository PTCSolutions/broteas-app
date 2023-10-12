<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/forms/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<!-- Use progressive enhancement so that we can get nice transitions if js enabled-->
<form method="POST" use:enhance>
	<!-- TODO: Make this use form validation instead of html validation-->
	<div class="p-6 w-1/2 gap-2 flex flex-col">
		<div>
			<Input id="firstName" type="text" placeholder="First Name" required={true} />
		</div>
		<div>
			<Input id="lastName" type="text" placeholder="Last Name" required={true} />
		</div>
		<div>
			<Input id="email" type="email" placeholder="Email" />
		</div>
		<div>
			<Input id="password" type="password" placeholder="Password" />
		</div>

		<div class="w-1/6"><Button text="Log In" /></div>
	</div>
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
</style>
