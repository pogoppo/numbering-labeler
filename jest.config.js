module.exports = {
  preset: 'ts-jest',
  verbose: true,
  coverageProvider: 'v8',
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.svelte$": ["svelte-jester", { preprocess: true }]
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!(@jamescoyle))"],
  moduleNameMapper: {
    "~/(.+)": "<rootDir>/src/$1"
  },
  moduleFileExtensions: ["js", "ts", "svelte"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jsdom",
}
