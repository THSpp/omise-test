import type { NextApiRequest, NextApiResponse } from "next";

var omise = require("omise")({
  publicKey: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY,
  secretKey: process.env.NEXT_PUBLIC_OMISE_SECRET_KEY,
});

type Data = {
  name: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  console.log("PUBLIC", process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY);
  console.log("SECRE", process.env.NEXT_PUBLIC_OMISE_SECRET_KEY);
  const { email, name, amount, token } = req.body;
  try {
    const charges = await omise.charges.create({
      amount,
      source: token,
      currency: "thb",
      return_uri: `${process.env.NEXT_PUBLIC_APP}`, // Link for notification page when sucess
    });

    console.log("charges::", charges);
    console.log("charges.authorize_uri::", charges.authorize_uri);
    res.status(200).json({ authorizeUri: charges.authorize_uri });
  } catch (err) {
    res.status(400).json(err);
  }
};
