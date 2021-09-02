import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const customerData = {
  name: "John doe",
  email: "testOmise@mercil.com",
  amount: 100000, //satang unit
};

export default function creditCard() {
  const [status, setStatus] = useState<any>(null);
  // const { OmiseCard } = window;

  // if (window == undefined) {
  //   const { OmiseCard } = window;
  // }

  const creditCardConfigure = () => {
    console.log("PUBLIC", process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY);
    window.OmiseCard.configure({
      publicKey: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY,
      currency: "thb",
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: [],
    });
    window.OmiseCard.configureButton("#checkout-button-alt");

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
          `${process.env.NEXT_PUBLIC_APP}/api/credit-card`,
          {
            name: customerData.name,
            email: customerData.email,
            amount: customerData.amount,
            token,
          }
        );
        setStatus(statusResult);
        console.log("temp", statusResult);
        {
          statusResult.status == 200
            ? // ? console.log("sucess")
              toast.success("Payment successful")
            : toast.error("Payment failed");
        }
      },
      onFormClosed: () => {
        /* Handler on form closure. */
      },
    });
  };

  const handleOnClick = (e: any) => {
    e.preventDefault();
    creditCardConfigure();
    omiseHandler();
  };
  return (
    <div>
      <form>
        <button
          id="checkout-button-alt"
          type="button"
          className="btn"
          onClick={handleOnClick}
        >
          Pay with creditCard
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
