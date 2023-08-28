import { ISchemaField } from "@modules/dataset/interfaces/field_value.interface";
import { SequenceField, chaca } from "chaca";
import { StartsWith, Step } from "./value_object";

interface SequenceProps {
  startsWith?: number;
  step?: number;
}

export class SequenceValueField implements ISchemaField {
  private _startsWith: number;
  private _step: number;

  constructor({ startsWith, step }: SequenceProps) {
    this._startsWith = new StartsWith(startsWith).value();
    this._step = new Step(step).value();
  }

  getField(): SequenceField {
    return chaca.sequence({ starsWith: this._startsWith, step: this._step });
  }
}
