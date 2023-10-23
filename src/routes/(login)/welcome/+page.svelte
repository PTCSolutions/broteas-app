<script>

	import { fade } from "svelte/transition";

</script>
<div class="w-full min-h-screen background pt-16">
    <div class="flex flex-col items-center justify-center">
    <div class="text-6xl z-10 absolute top-32" in:fade>DISCUSS, DISCOVER, <span class="font-semibold">DISCO</span></div>
    <img src="/CD.svg" alt="CD" class="w-7/12 ">
    </div>
</div>

<style>
    .background {
        background: linear-gradient(169deg, #EBEBEB 6.63%, #F3EAEA 98.31%);
        font-family: 'Inter', sans-serif;
    }
</style>