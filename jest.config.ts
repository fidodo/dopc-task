const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest",
      {
        tsconfig: "./tsconfig.test.json",
      },
    
    ],
    
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", // Mock CSS modules
    "\\.(jpg|jpeg|png|svg)$": "<rootDir>/mocks/imageMock.ts",
    "^@/(.*)$": "<rootDir>/$1",
  },
};

export default config;
