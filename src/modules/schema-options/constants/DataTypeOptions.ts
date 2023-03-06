import { SubOption } from "../../../modules/schema-options/interfaces/options.interface";
import { ARGUMENT_TYPE } from "@shared/constants/ARGUMENT_TYPE.enum";
import { schemas } from "chaca";

export const DataTypeOptions: SubOption[] = [
  {
    exampleValue: schemas.dataType.boolean().getValue(),
    getValue: (a) => schemas.dataType.boolean().getValue(a),
    name: "Boolean",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.dataType.int().getValue(),
    getValue: (a) => schemas.dataType.int().getValue(a),
    name: "Integer",
    arguments: [
      {
        argument: "min",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
      {
        argument: "max",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.dataType.hexadecimal().getValue(),
    getValue: (a) => schemas.dataType.hexadecimal().getValue(a),
    name: "Hexadecimal",
    arguments: [
      {
        argument: "length",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.dataType.float().getValue(),
    getValue: (a) => schemas.dataType.float().getValue(a),
    name: "Float",
    arguments: [
      {
        argument: "min",
        inputType: ARGUMENT_TYPE.FLOAT,
        description: { en: "", es: "" },
      },
      {
        argument: "max",
        inputType: ARGUMENT_TYPE.FLOAT,
        description: { en: "", es: "" },
      },
      {
        argument: "precision",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.dataType.matriz().getValue(),
    getValue: (a) => schemas.dataType.matriz().getValue(a),
    name: "Matriz",
    arguments: [
      {
        argument: "x_size",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
      {
        argument: "y_size",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
      {
        argument: "precision",
        inputType: ARGUMENT_TYPE.FLOAT,
        description: { en: "", es: "" },
      },
      {
        argument: "min",
        inputType: ARGUMENT_TYPE.FLOAT,
        description: { en: "", es: "" },
      },
      {
        argument: "max",
        inputType: ARGUMENT_TYPE.FLOAT,
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "" },
  },
];
