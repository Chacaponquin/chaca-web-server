import { SchemaOption } from "@modules/schema-options/domain";
import AccountType from "./AccountType";
import Amount from "./Amount";
import Bic from "./Bic";
import Bitcoin from "./Bitcoin";
import CreditCard from "./CreditCard";
import CurrencyMoney from "./CurrencyMoney";
import CVV from "./CVV";
import Ethereum from "./Ethereum";
import MoneyCode from "./MoneyCode";
import MoneySymbol from "./MoneySymbol";
import Pin from "./Pin";
import RoutingNumber from "./RoutingNumber";

export const FinanceOptions: SchemaOption[] = [
  AccountType,
  Amount,
  Bic,
  Bitcoin,
  CreditCard,
  CurrencyMoney,
  CVV,
  Ethereum,
  MoneyCode,
  MoneySymbol,
  Pin,
  RoutingNumber,
];
