import React, { useState, useEffect } from "react";
// import { Redirect } from "react-router-dom";
import { cartEmpty } from "../Cart/Cart";
import { getToken, processPayment } from "../../auth/payment";
import { createOrder } from "../../auth/order";
import { isAuthenticated, signout } from "../../auth/auth";

import DropIn from "braintree-web-drop-in-react";

const PaymentB = ({
  products,
  reload = undefined,
  setReload = (f) => f,
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });
  const {success}=info

  const userId = isAuthenticated && isAuthenticated().user.id;
  const token = isAuthenticated && isAuthenticated().token;

  const get_Token = (userId, token) => {
    getToken(userId, token)
      .then((info) => {
        if (info.error) {
          setInfo({
            ...info,
            error: info.error,
          });
          // signout(() => {
          //   // return <Redirect to="/" />;
          // });
        } else {
          const clientToken = info.clientToken;
          setInfo({...info, clientToken });
        }
      });
  };

  useEffect(() => {
    get_Token(userId, token);
  }, []);

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + parseInt(p.price);
    });
    return amount;
  };
  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce = info.instance.requestPaymentMethod().then((data) => {
      console.log("MYDATA", data);
      nonce = data.nonce;
      const paymentData = {
        paymentNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          console.log("POINT-1", response);
          if (response.error) {
            if (response.code === "1") {
              console.log("PAYMENT Failed!");
              signout(() => {
                // return <Redirect to="/" />;
              });
            }
          } else {
            setInfo({ ...info, success: response.success, loading: false });
            console.log("PAYMENT SUCCESS");

            let product_names = "";
            products.forEach(function (item) {
              product_names += item.name + ", ";
            });

            const orderData = {
              products: product_names,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
            };
            createOrder(userId, token, orderData)
              .then((response) => {
                if (response.error) {
                  if (response.code === "1") {
                    console.log("Order Failed!");
                    signout(() => {
                    //   return <Redirect to="/" />;
                    });
                  }
                } else {
                  if (response.success === true) {
                    console.log("ORDER PLACED!!");
                  }
                }
              })
              .catch((error) => {
                setInfo({ loading: false, success: false });
                console.log("Order FAILED", error);
              });
            cartEmpty(() => {
              console.log("Did we got a crash?");
            });

            setReload(!reload);
          }
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED", error);
        });
    });
  };
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            payment is successfully completed.
          </div>
        </div>
      </div>
    );
  };
  const showbtnDropIn = () => {
    return (
      <div>
       {/* {successMessage()} */}
        {info.clientToken !== null && products.length > 0
          ? (
            <div>
              <DropIn
                options={{ authorization: info.clientToken }}
                onInstance={(instance) => (info.instance = instance)}
              >
              </DropIn>
              <button
                onClick={onPurchase}
                className="btn btn-success"
              >
                Buy Now
              </button>
            </div>
          )
          : (
            <h3>Please login first or add something in cart</h3>
          )}
      </div>
    );
  };
console.log(info.clientToken)
  return (
    <div>
     
      
      {showbtnDropIn()}
      <h3>Total : {getAmount()}</h3>
    </div>
  );
};

export default PaymentB;
