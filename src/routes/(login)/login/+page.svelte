<script>
	import { enhance } from '$app/forms';
	import Button from '../../(app)/components/forms/Button.svelte';
	import Input from '../../(app)/components/forms/Input.svelte';
	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<!-- Use progressive enhancement so that we can get nice transitions if js enabled-->
<form method="POST" use:enhance>
	<div class="flex flex-col pl-5 w-1/2 gap-2 pt-5">
		<Input id="email" type="email" placeholder="Email" />
		<Input id="password" type="password" placeholder="Password" />
		<div class="w-1/6"><Button text="Log In"/></div>
	</div>
	
	
</form>
<!-- If there is an error on submitting the form , show it in red underneath-->
{#if form?.error != undefined}
	<!-- TODO: Have used normal css because cant get tailwind to work-->
	<div class="redText">{form.error}</div>
{/if}

<style>
	.redText {
		color: red;
	}
</style>
