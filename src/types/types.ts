
import { Dispatch } from "react";

export interface StateType {
    credentials: credentialsType
}

export type StateReducerType = (prevState: StateType, action: Action) => StateType

export interface StateProviderProps {
  children: any
}

export type StateContextProps = Array<StateType | Dispatch<Action>>

export type StateProviderType = (
    reducer: StateReducerType,
    initialState: StateType,
    children: any,
) => any

export type Action =
 | { type: 'request' }
 | { type: 'setCredentials', credentials: credentialsType }
 | { type: 'failure', error: string };

export interface credentialsType { 
    oauth_token: string, 
    oauth_token_secret: string,
    screen_name: string,
    user_id: string
}