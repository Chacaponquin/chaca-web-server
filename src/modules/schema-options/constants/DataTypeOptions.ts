import { SchemaOption } from "@modules/schema-options/interfaces/options.interface";
import { ARGUMENT_TYPE } from "@shared/constants/ARGUMENT_TYPE.enum";
import { schemas } from "chaca";

export const DataTypeOptions: SchemaOption[] = [
  {
    schemaField: () => schemas.dataType.boolean(),
    name: "Boolean",
    arguments: [],
    description: { en: "", es: "Devuelve un valor boolean. (true o false)" },
  },
  {
    schemaField: (a) => schemas.dataType.int(a),
    name: "Integer",
    arguments: [
      {
        argument: "min",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "Valor mínimo que puede tomar el número" },
      },
      {
        argument: "max",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "Valor máximo que puede tomar el número" },
      },
    ],
    description: { en: "", es: "Devuelve un número entero" },
  },
  {
    schemaField: (a) => schemas.dataType.hexadecimal(a),
    name: "Hexadecimal",
    arguments: [
      {
        argument: "length",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "Devuelve un valor hexadecimal" },
  },
  {
    schemaField: (a) => schemas.dataType.float(a),
    name: "Float",
    arguments: [
      {
        argument: "min",
        inputType: ARGUMENT_TYPE.FLOAT,
        description: { en: "", es: "Valor mínimo que puede tomar el número" },
      },
      {
        argument: "max",
        inputType: ARGUMENT_TYPE.FLOAT,
        description: { en: "", es: "Valor máximo que puede tomar el número" },
      },
      {
        argument: "precision",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: {
          en: "",
          es: "Precisión decimal del número. Debe ser un valor entre 0 y 20",
        },
      },
    ],
    description: { en: "", es: "Devuelve un número decimal o flotante" },
  },
  {
    schemaField: (a) => schemas.dataType.matrix(a),
    name: "Matriz",
    arguments: [
      {
        argument: "x_size",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: {
          en: "",
          es: "Cantidad de columnas que debe tener la matriz",
        },
      },
      {
        argument: "y_size",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: {
          en: "",
          es: "Cantidad de filas que debe tener la matriz",
        },
      },
      {
        argument: "precision",
        inputType: ARGUMENT_TYPE.FLOAT,
        description: {
          en: "",
          es: "Precisión decimal de los números en la matriz",
        },
      },
      {
        argument: "min",
        inputType: ARGUMENT_TYPE.FLOAT,
        description: {
          en: "",
          es: "Valor mínimo que pueden tener los números de la matriz",
        },
      },
      {
        argument: "max",
        inputType: ARGUMENT_TYPE.FLOAT,
        description: {
          en: "",
          es: "Valor máximo que pueden tener los números de la matriz",
        },
      },
    ],
    description: { en: "", es: "Devuelve una matriz de números" },
  },
];
