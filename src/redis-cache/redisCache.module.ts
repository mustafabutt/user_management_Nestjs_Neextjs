import { Module, CacheModule } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisCacheService } from './redis-cache.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: async () => ({
        store: redisStore,
        // host: 'localhost',
        // port: '6379',
        // ttl: '1000',
      }),
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
