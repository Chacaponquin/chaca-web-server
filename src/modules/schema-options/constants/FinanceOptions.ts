import { SubOption } from "../../../modules/schema-options/interfaces/options.interface";
import { ARGUMENT_TYPE } from "@shared/constants/ARGUMENT_TYPE.enum";
import { schemas } from "chaca";

export const FinanceOptions: SubOption[] = [
  {
    name: "Money Code",
    arguments: [],
    getValue: (a) => schemas.finance.moneyCode().getValue(a),
    description: { en: "", es: "" },
    exampleValue: schemas.finance.moneyCode().getValue(),
  },
  {
    name: "Money Symbol",
    arguments: [],
    getValue: (a) => schemas.finance.moneySymbol().getValue(a),
    description: { en: "", es: "" },
    exampleValue: schemas.finance.moneySymbol().getValue(),
  },
  {
    name: "Currency Money Name",
    arguments: [],
    getValue: (a) => schemas.finance.currencyMoneyName().getValue(a),
    description: { en: "", es: "" },
    exampleValue: schemas.finance.currencyMoneyName().getValue(),
  },
  {
    name: "Pin",
    getValue: (a) => schemas.finance.pin().getValue(a),
    exampleValue: schemas.finance.pin(),
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
    exampleValue: schemas.finance.bitcoinAddress().getValue(),
    name: "Bitcoin Address",
    getValue: (a) => schemas.finance.bitcoinAddress().getValue(a),
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.finance.creditCard().getValue(),
    getValue: (a) => schemas.finance.creditCard().getValue(a),
    arguments: [],
    name: "Credit Card Number",
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.finance.ethereumAddress().getValue(),
    getValue: (a) => schemas.finance.ethereumAddress().getValue(a),
    arguments: [],
    name: "Ethereum Address",
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.finance.accountType().getValue(),
    name: "Account Type",
    getValue: (a) => schemas.finance.accountType().getValue(a),
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.finance.amount().getValue(),
    getValue: (a) => schemas.finance.amount().getValue(a),
    name: "Amount",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.finance.creditCardCVV().getValue(),
    getValue: (a) => schemas.finance.creditCardCVV().getValue(a),
    name: "Credict Card CVV",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.finance.routingNumber().getValue(),
    getValue: (a) => schemas.finance.routingNumber().getValue(a),
    name: "Routing Number",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.finance.bic().getValue(),
    getValue: (a) => schemas.finance.bic().getValue(a),
    name: "Bic",
    arguments: [],
    description: { en: "", es: "" },
  },
];
