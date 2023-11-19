<script>
	import { onMount } from "svelte";
	import { login, getToken } from "./lib/login";
	import { uploadDb } from "./lib/uploadDb";

	let state = "login";
	let databaseFiles;

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);

		if (urlParams.has("error")) {
			alert("There was a probkem while logging in :" + urlParams.get("error"));
		}

		if (urlParams.has("code")) {
			let code = urlParams.get("code");
			getToken(code);
			state = "upload_vimusic";
		}
	});
</script>

<div class="app">
	<h1>ViMusic 2 Spotify</h1>

	{#if state == "login"}
		<button class="button" on:click={login}>Login to Spotify</button>
	{:else if state == "upload_vimusic"}
		<form
			class="upload-form"
			on:submit|preventDefault={() => uploadDb(databaseFiles)}
		>
			<label for="database" class="file-input">ViMusic backup</label>
			<input
				type="file"
				id="database"
				class="hide-input"
				bind:files={databaseFiles}
				required
			/>

			<button type="submit" class="button">Upload</button>
		</form>
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

	.button {
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

	.button:hover {
		transform: scale(1.1);
	}

	.upload-form {
		margin: 4rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.file-input {
		color: var(--text-color);
		font-size: 1.5rem;
		font-weight: 500;
		text-decoration: underline;
		transition: all 0.4s ease;
		cursor: pointer;
	}

	.file-input:hover {
		color: var(--primary-color);
	}

	.hide-input {
		display: none;
	}
</style>
