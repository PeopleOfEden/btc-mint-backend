import nconf from "nconf";
import { Request, Response } from "express";
import { Submission } from "./database/submissions";

export const uploadEntry = async (req: Request, res: Response) => {
  await Submission.create(req.body);
  res.json({ success: false });
};

export const getWinners = async (req: Request, res: Response) => {
  const winners = await Submission.find({ isWinner: true });
  res.json({ success: true, winners });
};

export const getProgress = async (req: Request, res: Response) => {
  const mintAmount = nconf.get("MINT_AMOUNT") || 0.03;

  const mintWallet = nconf.get("MINT_WALLET");
  const mintWalletBalance = 0; // todo add a api to check wallet balance

  const totalMintAmount = nconf.get("MINT_SUPPLY_CAP") || 222;

  const progress =
    (Math.min(mintWalletBalance / mintAmount, totalMintAmount) /
      totalMintAmount) *
    100;

  res.json({ success: true, progress, mintWallet, mintWalletBalance });
};
