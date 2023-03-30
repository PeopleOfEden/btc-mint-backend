import nconf from "nconf";
import axios from "axios";
import { Request, Response } from "express";
import { Submission } from "./database/submissions";
import cache from "node-cache";

const c = new cache();

const getWalletBalance = async (addr: string): Promise<number> => {
  // @ts-ignore
  if (c.get("cache")) return c.get("cache");

  const url = "https://blockchain.info/q/addressbalance/" + addr;
  const val = axios.get(url).then(async (d) => Number(await d.data));
  c.set("cache", val, 60);
  return val;
};

export const uploadEntry = async (req: Request, res: Response) => {
  const data = await Submission.create(req.body);
  res.json({ success: true, data });
};

export const getWinners = async (req: Request, res: Response) => {
  const winners = await Submission.find({ isWinner: true });
  res.json({ success: true, winners });
};

export const getProgress = async (req: Request, res: Response) => {
  const mintAmount = nconf.get("MINT_AMOUNT") || 0.03;

  const mintWallet = nconf.get("MINT_WALLET");
  const mintWalletBalance = (await getWalletBalance(mintWallet)) / 100000000;

  const totalMintAmount = nconf.get("MINT_SUPPLY_CAP") || 222;

  const progress =
    (Math.min(mintWalletBalance / mintAmount, totalMintAmount) /
      totalMintAmount) *
    100;

  res.json({ success: true, progress, mintWallet, mintWalletBalance });
};
