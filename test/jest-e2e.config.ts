import type { Config } from "@jest/types";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "../tsconfig.json";

const config: Config.InitialOptions = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  roots: ["<rootDir>/../"],
  moduleDirectories: ["<rootDir>/../", "node_modules"],
  modulePaths: ["src"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  detectOpenHandles: true,
};

export default config;
