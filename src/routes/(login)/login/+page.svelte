<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/forms/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<div class="h-full">
	<img src="/WeirdSofa.png" class="z-0 h-full overflow-hidden min-h-screen object-cover" alt="" />
	<!-- Use progressive enhancement so that we can get nice transitions if js enabled-->
	<form class="z-10 fixed right-0 top-0 w-1/2 p-8  h-full" method="POST" use:enhance>
		<!-- TODO: Make this use form validation instead of html validation-->
		<div class="p-16 w-full gap-6 flex flex-col h-full justify-center">
			<div class="text-6xl font-bold">Login</div>
			<div>
				<Input id="email" type="email" placeholder="Email" />
			</div>
			<div>
				<Input id="password" type="password" placeholder="Password" />
			</div>

			<div class="w-full"><Button text="Log In" /></div>
		</div>
	</form>
	<!-- If there is an error on submitting the form, show it in red underneath-->
	{#if form?.error != undefined}
		<!-- TODO: Have used normal css because cant get tailwind to work-->
		<div class="text-red-500">{form.error}</div>
	{/if}
</div>
