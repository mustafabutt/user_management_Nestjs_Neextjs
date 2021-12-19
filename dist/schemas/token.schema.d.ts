import { Document } from 'mongoose';
export declare type TokenDocument = Token & Document;
export declare class Token {
    token: string;
}
export declare const TokenSchema: import("mongoose").Schema<Document<Token, any, any>, import("mongoose").Model<Document<Token, any, any>, any, any, any>, {}>;
