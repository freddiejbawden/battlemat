import { Request } from "express"
export interface ISessionRequest extends Request {
  sessionID: string // or any other type
}