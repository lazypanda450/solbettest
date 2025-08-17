// pages/api/gamba/status.ts
import type { NextApiRequest, NextApiResponse } from "next";

import { fetchDataFromGambaAPI } from "./utils/fetchGamba";

export default async function handleStatus(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const data = await fetchDataFromGambaAPI("/status", {});
    res.status(200).json(data);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
}
