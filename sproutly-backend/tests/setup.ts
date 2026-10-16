process.env.NODE_ENV = "test";
process.env.LOG_LEVEL = "silent";
process.env.DATABASE_URL ??= "postgresql://sproutly:sproutly@localhost:5432/sproutly?schema=public";
process.env.BETTER_AUTH_SECRET ??= "test-secret-test-secret-test-secret-123";
process.env.BETTER_AUTH_URL ??= "http://localhost:4000";
