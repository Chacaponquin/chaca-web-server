import { SchemaOption } from "../../interfaces/options";
import { ARGUMENT_TYPE } from "@modules/dataset/constants/ARGUMENT_TYPE";
import { schemas } from "chaca";

export const FinanceOptions: SchemaOption[] = [
  {
    name: "Money Code",
    arguments: [],
    description: { en: "", es: "" },
    schemaField: () => schemas.finance.moneyCode(),
  },
  {
    name: "Money Symbol",
    arguments: [],
    description: { en: "", es: "" },
    schemaField: () => schemas.finance.moneySymbol(),
  },
  {
    name: "Currency Money Name",
    arguments: [],
    description: { en: "", es: "" },
    schemaField: () => schemas.finance.currencyMoneyName(),
  },
  {
    name: "Pin",
    schemaField: (a) => schemas.finance.pin(a),
    arguments: [
      {
        argument: "length",
        description: { en: "", es: "" },
        inputType: ARGUMENT_TYPE.NUMBER,
      },
    ],
    description: { en: "", es: "" },
  },
  {
    schemaField: () => schemas.finance.bitcoinAddress(),
    name: "Bitcoin Address",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    schemaField: () => schemas.finance.creditCard(),
    arguments: [],
    name: "Credit Card Number",
    description: { en: "", es: "" },
  },
  {
    schemaField: () => schemas.finance.ethereumAddress(),
    arguments: [],
    name: "Ethereum Address",
    description: { en: "", es: "" },
  },
  {
    schemaField: () => schemas.finance.accountType(),
    name: "Account Type",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    schemaField: (a) => schemas.finance.amount(a),
    name: "Amount",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    schemaField: () => schemas.finance.creditCardCVV(),
    name: "Credict Card CVV",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    schemaField: () => schemas.finance.routingNumber(),
    name: "Routing Number",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    schemaField: () => schemas.finance.bic(),
    name: "Bic",
    arguments: [],
    description: { en: "", es: "" },
  },
];
