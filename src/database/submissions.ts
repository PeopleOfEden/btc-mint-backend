import mongoose from "mongoose";

export interface ISubmission {
  twitterHandle: string;
  btcDepositAddress: string;
  ordinalWalletAddress: string;
  transactionHash: string;
  isWinner: boolean;
}

const schema = new mongoose.Schema(
  {
    twitterHandle: String,
    btcDepositAddress: String,
    ordinalWalletAddress: String,
    transactionHash: String,
    isWinner: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export type ISubmissionModel = ISubmission & mongoose.Document;
export const Submission = mongoose.model<ISubmissionModel>(
  "Submission",
  schema
);
