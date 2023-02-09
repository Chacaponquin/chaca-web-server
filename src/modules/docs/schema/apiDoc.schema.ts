import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DB_MOELS } from "@shared/constants/DB_MODELS.enum";
import mongoose from "mongoose";

@Schema()
class ApiDoc {
  @Prop({ required: true, type: mongoose.SchemaTypes.String })
  sectionTitle: string;
  @Prop({
    default: [],
    type: Array<mongoose.Types.ObjectId>,
    ref: DB_MOELS.API_DOCS_SUB_SECTION,
  })
  subSections: Array<mongoose.Types.ObjectId>;
}
export const ApiDocSchema = SchemaFactory.createForClass(ApiDoc);
