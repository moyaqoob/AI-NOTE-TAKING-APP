import { PrismaClient } from "@/generated/prisma";

const globalForPrisma  = global as unknown as {prisma:PrismaClient}


export const prisma = globalForPrisma.prisma || new PrismaClient();

if(process.env.DATABASE_URL!="production") globalForPrisma.prisma = prisma

