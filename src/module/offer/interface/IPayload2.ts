export interface IPayload2DataOffer {
  campaign_id: number;
  store_id: string | null;
  tracking_type: string;
  campaign_vertical: string;
  currency_name_singular: string;
  currency_name_plural: string;
  network_epc: string;
  icon: string;
  name: string;
  tracking_url: string;
  instructions: string;
  disclaimer: string | null;
  description: string;
  short_description: string;
  offer_sticker_text_1: string | null;
  offer_sticker_text_2: string | null;
  offer_sticker_text_3: string | null;
  offer_sticker_color_1: string | null;
  offer_sticker_color_2: string | null;
  offer_sticker_color_3: string | null;
  sort_order_setting: string | null;
  category_1: string | null;
  category_2: string | null;
  amount: number;
  payout_usd: number;
  start_datetime: string;
  end_datetime: string;
  is_multi_reward: boolean;
}

export interface IPayload2DataCountry {
  include: {
    US: {
      id: number;
      code: string;
      name: string;
    };
  };
  exclude: string[];
}

export interface IPayload2DataState {
  include: string[];
  exclude: string[];
}

export interface IPayload2DataCity {
  include: string[];
  exclude: string[];
}

export interface IPayload2DataConnectionType {
  cellular: boolean;
  wifi: boolean;
}

export interface IPayload2DataDevice {
  include: string[];
  exclude: string[];
}

export interface IPayload2DataOS {
  android: boolean;
  ios: boolean;
  web: boolean;
  min_ios: string | null;
  max_ios: string | null;
  min_android: string | null;
  max_android: string | null;
}

export interface IPayload2Data {
  Offer: IPayload2DataOffer;
  Country: IPayload2DataCountry;
  State: IPayload2DataState;
  City: IPayload2DataCity;
  Connection_Type: IPayload2DataConnectionType;
  Device: IPayload2DataDevice;
  OS: IPayload2DataOS;
}

export interface IPayload2 {
  status: string;
  data: Record<string, IPayload2Data>;
}
