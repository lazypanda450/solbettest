// pages/api/solanaPrice.ts

import type { NextApiRequest, NextApiResponse } from "next";

import NodeCache from "node-cache";
import fetch from "node-fetch";

const cache = new NodeCache({ stdTTL: 60, checkperiod: 60 });

interface HeliusApiResponse {
  jsonrpc: string;
  result: {
    token_info: {
      price_info: {
        price_per_token: number;
      };
    };
  };
  id: string;
}

async function fetchSolanaPrice(): Promise<number> {
  const url = process.env.NEXT_PUBLIC_RPC_ENDPOINT as string;
  const body = JSON.stringify({
    jsonrpc: "2.0",
    id: "fetch-sol-price",
    method: "getAsset",
    params: {
      id: "So11111111111111111111111111111111111111112",
    },
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Solana price from Helius");
  }

  const data = (await response.json()) as HeliusApiResponse;
  return data.result.token_info.price_info.price_per_token;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    let solPrice = cache.get<number>("solPrice");

    if (!solPrice) {
      solPrice = await fetchSolanaPrice();
      cache.set("solPrice", solPrice);
    }

    res.status(200).json({ solanaPrice: solPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
