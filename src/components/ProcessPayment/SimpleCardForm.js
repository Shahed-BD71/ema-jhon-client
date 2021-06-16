import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import './Style.css'

const SimpleCardForm = ({handlePayment}) => {
    const stripe = useStripe();
    const elements = useElements();

    const [paymentError, setPaymentError] = useState(null)
    const [paymentSuccess, setPaymentSuccess] = useState(null)

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setPaymentError(error.message)
            setPaymentSuccess(null);
            
        } else {
            handlePayment(paymentMethod.id)
            setPaymentSuccess(null)
            setPaymentSuccess(paymentMethod)
            console.log('[PaymentMethod]', paymentMethod);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <br></br>
                <button className="btn btn-primary" type="submit" disabled={!stripe}>
                    Pay Now
                </button>
            </form>
            <br></br>
            {
                paymentError && <h5 className="text-danger">{paymentError}</h5>
            }
            {
                paymentSuccess && <h5 className="text-success">Your Payment is Successful</h5>
            }
        </div>
       
    );
};

export default SimpleCardForm;