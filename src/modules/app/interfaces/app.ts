import { Api } from "@/core/interfaces"

export namespace App {
  export interface UserAuthRequest {}
  export type UserAuthResult = string

  export interface RouterState {
    backgroundLocation?: Location
  }
  export enum UserRole {
    USER = "user",
    ANON = "anon",
    ADMIN = "admin",
  }

  export interface JWTUser {
    id: string
    exp: number
    role: UserRole
    firstName: string
  }

  export interface LoginToken {
    loginToken: string
    botUsername: string
  }

  export interface AuthSuccess {
    id: string
    access_token: string
  }

  export type LoginReq = Api.Request
  export type LoginRes = LoginToken

  export type AuthReq = Api.Request<{ body: { loginToken: string } }>
  type AuthResNotAuth = null
  type AuthResSuccess = string
  export type AuthRes = AuthResSuccess | AuthResNotAuth
}
