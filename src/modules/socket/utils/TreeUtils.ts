import {
  CustomValueNode,
  MixedValueNode,
  RefValueNode,
  SchemaValueNode,
  Node,
} from "../classes/Tree";
import { DATA_TYPES } from "../constants/DATA_TYPE.enum";
import { ChacaDatasetError } from "../errors/ChacaDatasetError";
import { InputDatasetField } from "../dto/datasetsDTO.dto";
import {
  ApiOption,
  SubOption,
} from "@modules/schema-options/interfaces/options.interface";

export class TreeUtils {
  public static orderFieldsByPriority(nodes: Array<Node>): Array<Node> {
    const normalNodes: Array<Node> = [];
    const customNodes: Array<CustomValueNode> = [];
    const refNodes: Array<RefValueNode> = [];

    for (const n of nodes) {
      if (n instanceof RefValueNode) {
        refNodes.push(n);
      } else if (n instanceof CustomValueNode) {
        customNodes.push(n);
      } else {
        normalNodes.push(n);
      }
    }

    return [...normalNodes, ...refNodes, ...customNodes];
  }

  public static createNodeByDatatype(
    field: InputDatasetField,
    schemas: Array<ApiOption>,
  ): Node {
    const fieldConfig = {
      id: field.id,
      isArray: field.isArray,
      isPosibleNull: field.isPosibleNull,
      name: field.name,
    };

    switch (field.dataType.type) {
      case DATA_TYPES.SINGLE_VALUE: {
        return new SchemaValueNode(
          fieldConfig,
          {
            option: field.dataType.fieldType.type,
            parent: field.dataType.fieldType.parent,
          },
          field.dataType.fieldType.args,
          TreeUtils.filterOption(
            fieldConfig.name,
            field.dataType.fieldType.parent,
            field.dataType.fieldType.type,
            schemas,
          ),
        );
      }

      case DATA_TYPES.MIXED: {
        const newNode = new MixedValueNode(fieldConfig);

        newNode.insertSubFields(field.dataType.object, schemas);

        return newNode;
      }

      case DATA_TYPES.REF: {
        return new RefValueNode(fieldConfig, field.dataType.ref);
      }

      case DATA_TYPES.CUSTOM: {
        return new CustomValueNode(fieldConfig, field.dataType.code);
      }

      default:
        throw new ChacaDatasetError(
          `The field '${field.name}' has an incorrect dataType`,
        );
    }
  }

  public static filterOption(
    fieldName: string,
    parent: string,
    option: string,
    schemas: Array<ApiOption>,
  ): SubOption {
    const findParent = schemas.find((o) => {
      return o.parent === parent;
    });

    if (findParent) {
      const findSchema = findParent.options.find((o) => o.name === option);

      if (findSchema) return findSchema;
      else
        throw new ChacaDatasetError(`'${fieldName}' not have a correct schema`);
    } else {
      throw new ChacaDatasetError(`'${fieldName}' not have a correct schema`);
    }
  }
}
