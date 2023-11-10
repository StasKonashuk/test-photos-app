-- Prisma migration for create-schema
CREATE SCHEMA IF NOT EXISTS test_app;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER EXTENSION "uuid-ossp" SET SCHEMA public;