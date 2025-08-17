// pages/api/gamba/player.ts
import type { NextApiRequest, NextApiResponse } from "next";

import { fetchDataFromGambaAPI } from "./utils/fetchGamba";

export default async function handlePlayer(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const queryParams: Record<string, string> = {};
    if (req.query.user) queryParams.user = req.query.user as string;
    if (req.query.creator) queryParams.creator = req.query.creator as string;
    if (req.query.token) queryParams.token = req.query.token as string;

    const data = await fetchDataFromGambaAPI("/player", queryParams);
    res.status(200).json(data);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
}
