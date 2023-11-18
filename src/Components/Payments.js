import { useEffect, useState, useRef } from "react";
import { loadPaymentWidget, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import Header from "./Header";

const Payments = () => {
  const clientKey = process.env.REACT_APP_TOSSPAYMENTS_CLIENT_KEY;
  const apiKey = process.env.REACT_APP_TOSSPAYMENTS_SECRET_KEY;

  const customerKey = "fdafiodjv231ksjf";
  const paymentWidgetRef = useRef(null);
  const price = 50_000;

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

      paymentWidget.renderPaymentMethods("#payment-widget", price);

      paymentWidgetRef.current = paymentWidget;
    })();
  }, []);

  const payBtnClick = async () => {
    const paymentWidget = paymentWidgetRef.current;

    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: "지구를 지켜요 후드티",
        customerName: "지구인",
        customerEmail: "orbita@gmail.com",
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <button onClick={payBtnClick}>결제하기</button>
      </div>
    </div>
  );
};

export default Payments;
