<script>
	import { onMount } from "svelte";
	import { login, getToken } from "./lib/login";

	let state = "login";

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);

		if (urlParams.has("error")) {
			alert("There was a probkem while logging in :" + urlParams.get("error"));
		}

		if (urlParams.has("code")) {
			let code = urlParams.get("code");
			getToken(code);
			state = "connected";
		}
	});
</script>

<div class="app">
	<h1>ViMusic 2 Spotify</h1>

	{#if state == "login"}
		<button class="login" on:click={login}>Login to Spotify</button>
	{/if}
</div>

<style>
	.app {
		text-align: center;
	}

	h1 {
		text-align: center;
		font-weight: 700;
		font-size: 3rem;
		color: var(--primary-color);
	}

	.login {
		margin: 3rem;
		padding: 1rem;
		font-size: 1.5rem;
		font-weight: 600;
		background: var(--primary-color);
		color: var(--background-color);
		border-radius: 2rem;
		cursor: pointer;
		transition: all 0.4s ease;
	}

	.login:hover {
		transform: scale(1.1);
	}
</style>
