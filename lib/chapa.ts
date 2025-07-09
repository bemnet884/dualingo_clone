const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY!;

export const createChapaCheckoutSession = async ({
  amount,
  email,
  first_name,
  last_name,
  tx_ref,
  return_url,
  currency = "ETB",
}: {
  amount: number;
  email: string;
  first_name: string;
  last_name: string;
  tx_ref: string; // must be unique
  return_url: string;
  currency?: string;
}) => {
  const res = await fetch("https://api.chapa.co/v1/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      currency,
      email,
      first_name,
      last_name,
      tx_ref,
      return_url,
      customization: {
        title: "Lingo Pro",
        description: "Unlimited Hearts",
      },
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create Chapa session");
  }

  return data.data.checkout_url;
};
