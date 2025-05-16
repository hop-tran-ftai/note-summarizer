import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@workspace/db';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}

enum PrismaErrorCodes {
  UniqueConstraintViolation = 'P2002',
}

const isPrismaError = (error) =>
  error instanceof Prisma.PrismaClientKnownRequestError;

export { PrismaErrorCodes, isPrismaError };
