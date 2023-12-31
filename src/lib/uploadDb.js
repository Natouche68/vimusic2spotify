import initSqlJs from "sql.js";
import { editSpotifyLibrary } from "./editLibrary";

export async function uploadDb(databaseFiles) {
	const backup = databaseFiles[0];
	const data = new Uint8Array(await backup.arrayBuffer());
	const SQL = await initSqlJs({
		locateFile: (file) => `https://sql.js.org/dist/${file}`,
	});

	const db = new SQL.Database(data);

	const likedSongs = db.exec(
		"SELECT * FROM Song WHERE likedAt > 1 ORDER BY likedAt"
	)[0].values;

	editSpotifyLibrary(likedSongs);
}
