// pages/api/gamba/pools.ts
import type { NextApiRequest, NextApiResponse } from "next";

import { fetchDataFromGambaAPI } from "./utils/fetchGamba";

export default async function handlePools(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const data = await fetchDataFromGambaAPI("/pools", {});
    res.status(200).json(data);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
}
