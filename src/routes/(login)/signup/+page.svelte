<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$lib/components/forms/Button.svelte';
	import Input from '$lib/components/forms/Input.svelte';
	interface Form {
		error: string;
		location: string;
	}
	let form: Form;
</script>

<div class="h-full overflow-hidden">
	<img src="/WeirdTree.png" class="z-0 h-full overflow-hidden min-h-screen object-cover" alt="" />
	<!-- TODO: Get this to Use progressive enhancement so that we can get nice transitions if js enabled-->
	<form
		class="z-10 fixed right-0 top-0 w-1/2 p-8 h-full"
		method="POST"
		use:enhance={() => {
			return ({ result, update }) => {
				form = result.data;
				update();
			};
		}}
	>
		<div class="p-16 w-full gap-6 flex flex-col h-full justify-center">
			<div class="text-6xl font-bold">Sign up now</div>
			<div class="flex gap-4">
				<div class="w-1/2">
					<Input
						id="firstName"
						type="text"
						placeholder="First Name"
						required={true}
					/>
				</div>
				<div class="w-1/2">
					<Input
						id="lastName"
						type="text"
						placeholder="Last Name"
						required={true}
					/>
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<Input
					id="username"
					type="text"
					placeholder="Username"
				/>
				{#if form?.error != undefined && form?.location == 'username'}
					<!-- TODO: Have used normal css because cant get tailwind to work-->
					<div class="text-red-500">{form.error}</div>
				{/if}
			</div>
			<div class="flex flex-col gap-2">
				<Input id="email" type="email" placeholder="Email"/>
				{#if form?.error != undefined && form?.location == 'email'}
					<!-- TODO: Have used normal css because cant get tailwind to work-->
					<div class="text-red-500">{form.error}</div>
				{/if}
			</div>
			<div class="flex flex-col gap-2">
				<Input
					id="password"
					type="password"
					placeholder="Password"
				/>
				{#if form?.error != undefined && form?.location == 'password'}
					<!-- TODO: Have used normal css because cant get tailwind to work-->
					<div class="text-red-500">{form.error}</div>
				{/if}
			</div>
			<div class="flex flex-col gap-2">
				<Input
					id="code"
					type="text"
					placeholder="Invite Code"
				/>
				{#if form?.error != undefined && form?.location == 'code'}
					<!-- TODO: Have used normal css because cant get tailwind to work-->
					<div class="text-red-500">{form.error}</div>
				{/if}
			</div>
			<div class="w-full"><Button text="Join" /></div>
			<div>
				Already have an account? <a class="text-blue-500 font-medium" href="/login">Login</a>
			</div>
		</div>
	</form>
</div>
