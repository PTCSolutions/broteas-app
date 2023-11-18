<script lang="ts">
	import { userProfileStore } from "$lib/stores/userStore";

	let code: string = $userProfileStore?.user?.invite_code.code ?? "";

	let copied =false;

    function copy() {
        navigator.clipboard.writeText(`Here's an exclusive link to join D1SCO. It's a place to discuss, discover and enjoy music.\n\nhttps://d1sco.vercel.app/signup/?c=${code}`);
		copied = true;
		setTimeout(() => {
			copied = false
		}, 2000);
    }
</script>

<div class="ticket">
	<div class="absolute mx-10 my-3 flex flex-col gap-2 font-medium">
		<div class="w-full h-[2px] bg-black" />
		<p class="z-30">
			Here's an exclusive link to join D1SCO. It's a place to discuss, discover and enjoy music. <br />
			<br />{`https://d1sco.vercel.app/signup?c=${code}`}
		</p>
        <div class="w-full h-[2px] bg-black" />
		<button on:click={copy} class="w-full rounded flex flex-col items-center bg-white bg-opacity-20 py-1 hover:font-bold hover:bg-opacity-30 font-semibold z-30"
			>{copied ? "Copied!" : "Copy Link"}</button
		>
	</div>
</div>

<style>
	.ticket {
		width: 420px;
		height: 180px;
		/* margin: 0 auto; */
		margin-top: 100px;
		margin-bottom: -50px;

		background-repeat: repeat-y;
		background-position: 0 0, 0 0, 100% 0, 100% 0;
		background-image: linear-gradient(45deg, transparent 75%, #e2af3c 75%),
			linear-gradient(135deg, transparent 75%, #e2af3c 75%),
			linear-gradient(-45deg, transparent 75%, #e2af3c 75%),
			linear-gradient(-135deg, transparent 75%, #e2af3c 75%);
		background-size: 30px 15px;

		transform: translateY(-50%);
		box-shadow: 0 40px 15px -35px rgba(0, 0, 0, 0.4);
	}

	.ticket::before {
		content: '';
		position: absolute;
		left: 50%;

		width: 360px;
		height: 180px;

		padding: 20px;

		background-color: #e2af3c;

		font-weight: 600;

		transform: translateX(-50%);
	}

	.ticket::after {
		content: '';
		position: absolute;
		left: 50%;

		width: 380px;
		height: 180px;

		background: linear-gradient(
			to right,
			rgba(255, 255, 13, 0.1),
			rgba(88, 70, 35, 0.3),
			rgba(46, 27, 11, 0.4),
			rgba(255, 255, 13, 0.1) 80%
		);


		transform: translateX(-50%);
	}
</style>
