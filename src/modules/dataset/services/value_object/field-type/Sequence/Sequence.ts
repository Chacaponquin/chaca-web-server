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

  constructor(props: SequenceProps) {
    if (typeof props === "object" && props !== null) {
      const { startsWith, step } = props;

      this._startsWith = new StartsWith(startsWith).value();
      this._step = new Step(step).value();
    } else {
      this._startsWith = new StartsWith().value();
      this._step = new Step().value();
    }
  }

  get startsWith() {
    return this._startsWith;
  }

  get step() {
    return this._step;
  }

  getField(): SequenceField {
    return chaca.sequence({ starsWith: this._startsWith, step: this._step });
  }
}
