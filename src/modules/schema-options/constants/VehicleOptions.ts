import { schemas } from "chaca";
import { SchemaOption } from "@modules/schema-options/interfaces/options";

export const VehicleOptions: SchemaOption[] = [
  {
    schemaField: () => schemas.vehicle.bicycle(),
    name: "Bicycle",
    arguments: [],
    description: { en: "", es: "Devuelve un tipo de bicicleta" },
  },
  {
    schemaField: () => schemas.vehicle.manufacturer(),
    name: "Manufacturer",
    arguments: [],
    description: { en: "", es: "Devuelve un tipo de manofactura" },
  },
  {
    schemaField: () => schemas.vehicle.vehicleModel(),
    name: "Model",
    arguments: [],
    description: { en: "", es: "Devuelve un modelo de vehículo" },
  },
  {
    schemaField: () => schemas.vehicle.vehicleType(),
    name: "Type",
    arguments: [],
    description: { en: "", es: "Devuelve un tipo de vehículo" },
  },
  {
    schemaField: () => schemas.vehicle.vehicle(),
    name: "Vehicle",
    arguments: [],
    description: { en: "", es: "Devuelve la marca de un vehículo" },
  },
  {
    schemaField: () => schemas.vehicle.fuel(),
    name: "Fuel",
    arguments: [],
    description: { en: "", es: "Devuelve un tipo de combustible" },
  },
];
