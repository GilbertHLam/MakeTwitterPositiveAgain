import { Dispatch } from "react";
import { string } from "prop-types";

export interface StateType {
  credentials: credentialsType;
  sortMethod: string;
  navigation: string;
}

export type StateReducerType = (
  prevState: StateType,
  action: Action
) => StateType;

export interface StateProviderProps {
  children: any;
}

export type StateContextProps = Array<StateType | Dispatch<Action>>;

export type StateProviderType = (
  reducer: StateReducerType,
  initialState: StateType,
  children: any
) => any;

export type Action =
  | { type: "request" }
  | { type: "setCredentials"; credentials: credentialsType }
  | { type: "setSortMethod"; sortMethod: string }
  | { type: "setNavigation"; navigation: string }
  | { type: "failure"; error: string };

export interface credentialsType {
  oauth_token: string;
  oauth_token_secret: string;
  screen_name: string;
  user_id: string;
}

export interface TweetType {
  score: number;
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  truncated: string;
  entities: Array<object>;
  in_reply_to_status_id: string;
  in_reply_to_status_id_str: string;
  in_reply_to_user_id: string;
  in_reply_to_user_id_str: string;
  in_reply_to_screen_name: string;
  geo: string;
  coordinates: string;
  place: string;
  contributors: string;
  is_quote_status: string;
  quoted_status_id: number;
  quoted_status_id_str: string;
  retweet_count: number;
  favorite_count: number;
  possibly_sensitive: string;
  lang: string;
}
