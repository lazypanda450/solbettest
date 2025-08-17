// pages/api/gamba/top-plays.ts
import type { NextApiRequest, NextApiResponse } from "next";

import { fetchDataFromGambaAPI } from "./utils/fetchGamba";

export default async function handleTopPlays(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const queryParams: Record<string, string> = {};
    if (req.query.creator) queryParams.creator = req.query.creator as string;
    if (req.query.pool) queryParams.pool = req.query.pool as string;
    if (req.query.token) queryParams.token = req.query.token as string;
    if (req.query.player) queryParams.player = req.query.player as string;

    queryParams.orderBy = ["multiplier", "usd_profit"].includes(
      req.query.orderBy as string,
    )
      ? (req.query.orderBy as string)
      : "usd_profit";
    queryParams.sorting = ["ASC", "DESC"].includes(req.query.sorting as string)
      ? (req.query.sorting as string)
      : "ASC";

    const data = await fetchDataFromGambaAPI("/top-plays", queryParams);
    res.status(200).json(data);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
}
