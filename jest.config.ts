import type { Config } from "@jest/types";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const config: Config.InitialOptions = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "./src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  roots: ["<rootDir>/../"],
  moduleDirectories: ["<rootDir>/../", "node_modules"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  detectOpenHandles: true,
};

export default config;
