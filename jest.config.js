/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest",
  roots: ['<rootDir>/tests'],
  testEnvironment: "node",
  clearMocks: true,
  moduleFileExtensions: ["ts", "js", "json"],
  testMatch: ["<rootDir>/tests/**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
