import { Cache } from 'cache-manager';
export declare class RedisCacheService {
    private readonly cache;
    constructor(cache: Cache);
    get(key: any): Promise<any>;
    set(key: any, value: any): Promise<void>;
    del(key: any): Promise<void>;
}
