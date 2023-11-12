<script lang="ts">
	import { enhance } from '$app/forms';
	import Input from '$lib/components/forms/Input.svelte';
	import LoginButton from '$lib/components/forms/LoginButton.svelte';
	interface Form {
		error: string;
		location: string;
	}
	let form: Form;
</script>

<!-- Use progressive enhancement so that we can get nice transitions if js enabled-->
<form
	class="z-10 fixed right-0 top-0 w-1/2 px-12 py-20 h-full"
	method="POST"
	use:enhance={() => {
		return ({ result, update }) => {
			form = result.data;
			update();
		};
	}}
>
	<!-- TODO: Make this use form validation instead of html validation-->
	<div class="p-12 bg-white rounded-xl w-full gap-6 flex flex-col h-full justify-center">
		<div class="text-6xl font-bold">Login</div>
		<div>
			<Input id="email" type="email" placeholder="Email" />
		</div>
		<div class="flex flex-col gap-2">
			<Input id="password" type="password" placeholder="Password" />
			<!-- If there is an error on submitting the form, show it in red underneath-->
			{#if form?.error != undefined}
				<!-- TODO: Have used normal css because cant get tailwind to work-->
				<div class="text-red-500">{form.error}</div>
			{/if}
		</div>

		<div class="w-full"><LoginButton text="Log In" /></div>

		<div>
			Don't have an account? <a class="text-blue-500 font-medium" href="/signup">Sign up</a>
		</div>
	</div>
</form>
