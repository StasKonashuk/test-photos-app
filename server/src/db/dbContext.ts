import { PrismaClient } from '@prisma/client';

class DbContext {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getPrisma() {
    return this.prisma;
  }

  async connect(): Promise<void> {
    await this.prisma.$connect();
  }

  async disconnect(): Promise<void> {
    try {
      await Promise.all([this.prisma.$disconnect()]);
    } catch (error) {
      console.error('Error disconnecting database', error);
      await this.prisma.$disconnect();
      process.exit(1);
    }
  }
}

export const dbContext = new DbContext();
