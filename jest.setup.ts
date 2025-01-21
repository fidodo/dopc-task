import type { Config } from 'jest';
import '@testing-library/jest-dom';
import { configure } from "@testing-library/react";

configure({
  testIdAttribute: "data-test-id", 
});

const config: Config = {
  testEnvironment: 'jest-environment-jsdom', 
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', 
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], 
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], 
};

export default config;
