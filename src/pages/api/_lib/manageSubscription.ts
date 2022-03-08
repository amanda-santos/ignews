import { query } from "faunadb";

import { fauna } from "../../../services/fauna";
import { stripe } from "./../../../services/stripe";

export const saveSubscription = async (
  subscriptionId: string,
  customerId: string,
  isCreateAction = false
) => {
  // search user on FaunaDB with stripe_customer_id = customerId
  const userRef = await fauna.query(
    query.Select(
      "ref",
      query.Get(
        query.Match(query.Index("user_by_stripe_customer_id"), customerId)
      )
    )
  );

  // save subscription data on FaunaDB
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  if (isCreateAction) {
    await fauna
      .query(
        query.Create(query.Collection("subscriptions"), {
          data: subscriptionData,
        })
      )
      .catch((error) => {
        console.log(error);
      });
  } else {
    await fauna
      .query(
        query.Replace(
          query.Select(
            "ref",
            query.Get(
              query.Match(query.Index("subscription_by_id"), subscriptionId)
            )
          ),
          { data: subscriptionData }
        )
      )
      .catch((error) => {
        console.log(error);
      });
  }
};
