import { Module } from '@nestjs/common';
import { ApiController } from './controller/api.controller';

@Module({
  imports: [],
  controllers: [ApiController],
  exports: [],
  providers: [],
})
export class ApiModule {}
