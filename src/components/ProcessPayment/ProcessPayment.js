import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitForm from './SplitForm';
const stripePromise = loadStripe('pk_test_51J1AYAD3bnxXnaxvRM2J9UxAchuzzVHS2DQDgrvxLbppCZ8oSb9oWEvqKmjCfTeUPsepcupLmK6aMq9nEV2yDML000v264x2lb');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
          <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
        
    );
};

export default ProcessPayment;