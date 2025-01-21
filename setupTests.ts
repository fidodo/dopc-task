
import { enableFetchMocks } from "jest-fetch-mock";
import "@testing-library/jest-dom";
import { loadEnvConfig } from "@next/env";
import { TextEncoder, TextDecoder as NodeTextDecoder } from "util";
import { configure } from '@testing-library/react';

configure({ testIdAttribute: 'data-test-id' });

global.TextEncoder = TextEncoder;
global.TextDecoder = NodeTextDecoder as typeof TextDecoder;

enableFetchMocks();

loadEnvConfig(__dirname, true, { info: () => null, error: console.error });