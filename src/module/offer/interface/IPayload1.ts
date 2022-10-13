export interface IPayload1Query {
  pubid: string;
  appid: number;
  country: string;
  platform: string;
}

export interface IPayload1OfferVertical {
  vertical_id: string;
  vertical_name: string;
}

export interface IPayload1Offer {
  offer_id: string;
  offer_name: string;
  offer_desc: string;
  call_to_action: string;
  disclaimer: string;
  offer_url: string;
  offer_url_easy: string;
  payout: number;
  payout_type: string;
  amount: number;
  image_url: string;
  image_url_220x124: string;
  countries: string[];
  platform: string;
  device: string;
  category: Record<string, string>;
  last_modified: number;
  preview_url: string;
  package_id: string;
  verticals: IPayload1OfferVertical[];
}

export interface IPayload1Response {
  currency_name: string;
  offers_count: number;
  offers: IPayload1Offer[];
}

export interface IPayload1 {
  query: IPayload1Query;
  response: IPayload1Response;
}
