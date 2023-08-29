import { SchemaOption } from "@modules/schema-options/domain";
import { schemas } from "chaca";

export const VehicleOptions: SchemaOption[] = [
  new SchemaOption({
    schemaField: () => schemas.vehicle.bicycle(),
    name: "Bicycle",
  }),
  new SchemaOption({
    schemaField: () => schemas.vehicle.manufacturer(),
    name: "Manufacturer",
  }),
  new SchemaOption({
    schemaField: () => schemas.vehicle.vehicleModel(),
    name: "Model",
  }),
  new SchemaOption({
    schemaField: () => schemas.vehicle.vehicleType(),
    name: "Type",
  }),
  new SchemaOption({
    schemaField: () => schemas.vehicle.vehicle(),
    name: "Vehicle",
  }),
  new SchemaOption({
    schemaField: () => schemas.vehicle.fuel(),
    name: "Fuel",
  }),
];
