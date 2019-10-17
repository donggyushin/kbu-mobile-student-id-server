import mognoose from 'mongoose'
export interface IVerifyPhone extends mognoose.Document {
    number: string,
    verified: boolean,
    name: string,
    date: string
}