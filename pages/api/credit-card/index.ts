import type { NextApiRequest, NextApiResponse } from "next";

var omise = require("omise")({
  publicKey: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY,
  secretKey: process.env.NEXT_PUBLIC_OMISE_SECRET_KEY,
});

type Data = {
  name: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log("PUBLIC", process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY);
  console.log("SECRE", process.env.NEXT_PUBLIC_OMISE_SECRET_KEY);
  const { email, name, amount, token } = req.body;
  try {
    const customer = await omise.customers.create({
      //customer info
      email,
      description: name,
      card: token,
    });

    const charges = await omise.charges.create({
      // create transaction
      amount,
      currency: "thb",
      customer: customer.id,
    });

    console.log("charges::", charges);
    res.status(200).json(charges.status);
  } catch (err) {
    res.status(400).json(err);
  }
};
