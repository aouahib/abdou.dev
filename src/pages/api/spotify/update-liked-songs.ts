import { NextApiHandler } from "next";
import { updateLikedSongsPlaylist } from "../../../lib/spotify";

const handler: NextApiHandler = async (req, res) => {
  if (req.method != "PUT") {
    return res
      .status(400)
      .json({ error: `Can't ${req.method} /api/spotify/update-liked-songs` });
  }
  let secret: string | undefined;
  try {
    const json = JSON.parse(req.body);
    secret = json.secret;
    // eslint-disable-next-line no-empty
  } catch (e) {}
  if (secret != process.env.SPOTIFY_CLIENT_SECRET) {
    return res.status(401).json({ error: "Invalid client secret", secret });
  }
  await updateLikedSongsPlaylist();
  res.status(201).json({ message: "Updated successfully" });
};

export default handler;
