<script lang="ts">
    export let code: String;

    function copy() {
        navigator.clipboard.writeText(`Here's a link to join D1SCO. It's a place to discuss, discover and enjoy music.\n\nhttps://d1sco.vercel.app/signup/?c=${code}`);
        alert("Copied!");
    }
</script>

<div class="ticket">
	<div class="absolute mx-10 my-3 flex flex-col gap-2 font-medium">
		<div class="w-full h-[2px] bg-black" />
		<p>
			Here's a link to join D1SCO. It's a place to discuss, discover and enjoy music. <br />
			<br />{`https://d1sco.vercel.app/signup?code={code}`}
		</p>
        <div class="w-full h-[2px] bg-black" />
		<button on:click={copy} class="w-full rounded flex flex-col items-center bg-white bg-opacity-20 py-1 hover:font-bold hover:bg-opacity-20 font-semibold z-30"
			>Copy Link</button
		>
	</div>
</div>

<style>
	.ticket {
		width: 400px;
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

		width: 340px;
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

		width: 360px;
		height: 180px;

		background: linear-gradient(
			to right,
			rgba(255, 255, 13, 0.2),
			rgba(88, 70, 35, 0.4),
			rgba(46, 27, 11, 0.5),
			rgba(255, 255, 13, 0.2) 80%
		);


		transform: translateX(-50%);
	}
</style>
