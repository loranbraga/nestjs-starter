import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { EntityNotFoundExceptionFilter } from 'src/exceptions/entity-not-found.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  await app.listen(3333);
}
bootstrap();
