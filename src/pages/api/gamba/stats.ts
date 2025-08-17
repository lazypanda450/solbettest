// pages/api/gamba/stats.ts
import type { NextApiRequest, NextApiResponse } from "next";

import { fetchDataFromGambaAPI } from "./utils/fetchGamba";

export default async function handleStats(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const queryParams: Record<string, string> = {};
    if (req.query.creator) queryParams.creator = req.query.creator as string;

    const data = await fetchDataFromGambaAPI("/stats", queryParams);
    res.status(200).json(data);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
}
