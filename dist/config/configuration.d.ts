export declare const configuration: () => {
    NODE_ENV: string;
    port: number;
    jwt: {
        secret: string;
        expiresIn: string;
    };
};
