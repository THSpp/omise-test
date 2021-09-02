import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const customerData = {
  name: "John doe",
  email: "testOmise@mercil.com",
  amount: 100000, //satang unit
};

export default function creditCard() {
  const [status, setStatus] = useState<any>(null);
  const router = useRouter();
  // const { OmiseCard } = window;

  // if (window == undefined) {
  //   const { OmiseCard } = window;
  // }

  const internetBankingConfigure = () => {
    console.log("PUBLIC", process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY);
    window.OmiseCard.configure({
      publicKey: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY,
      currency: "thb",
      defaultPaymentMethod: "internet_banking",
      //   defaultPaymentMethod: "truemoney",
      otherPaymentMethods: [
        "truemoney",
        "alipay",
        "rabbit_linepay",
        "internet_banking_bay",
        "internet_banking_bbl",
        "internet_banking_ktb",
        "internet_banking_scb",
      ],
    });
    window.OmiseCard.configureButton("#internet-banking");

    window.OmiseCard.attach();
    console.log("finish", window.OmiseCard);
  };

  const omiseHandler = () => {
    window.OmiseCard.open({
      amount: customerData.amount,
      submitFormTarget: "#checkout-form",
      onCreateTokenSuccess: async (token: any) => {
        console.log("token:", token);

        const statusResult = await axios.post(
          `${process.env.NEXT_PUBLIC_APP}/api/internet-banking`,
          {
            name: customerData.name,
            email: customerData.email,
            amount: customerData.amount,
            token,
          }
        );
        console.log("temp", statusResult);
        const { authorizeUri } = statusResult.data;
        if (authorizeUri) {
          router.push(authorizeUri);
        }
      },
      onFormClosed: () => {
        /* Handler on form closure. */
      },
    });
  };

  const handleOnClick = (e: any) => {
    e.preventDefault();
    internetBankingConfigure();
    omiseHandler();
  };
  return (
    <div>
      <form>
        <button
          id="internet-banking"
          type="button"
          className="btn"
          onClick={handleOnClick}
        >
          Pay with internet banking
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
