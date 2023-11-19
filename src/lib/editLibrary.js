export function editSpotifyLibrary(likedSongsVimusic) {
	const accessToken = localStorage.getItem("access_token");

	const unfoundableSongs = [];

	likedSongsVimusic.forEach(async (song) => {
		const songName = song[1];
		const songArtist = song[2];

		const searchResponse = await fetch(
			`https://api.spotify.com/v1/search?q=${songName} artist:${songArtist}&type=track&limit=1`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		const searchResults = await searchResponse.json();

		if (searchResults.tracks.items[0]) {
			const trackId = searchResults.tracks.items[0].id;

			await fetch(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
		} else {
			unfoundableSongs.push({
				name: songName,
				artist: songArtist,
			});
		}
	});
}
