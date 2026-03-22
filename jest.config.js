const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

module.exports = createJestConfig({
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/tests/unit/**/*.test.js"],
  setupFilesAfterFramework: [],
});
