export const checkoutApi ={
    createPaymentIntent: async () => {
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
  });
  const { clientSecret } = await response.json();
  return clientSecret;
},
}