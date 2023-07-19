type DatasetModelParams = {
  id: string;
  name: string;
  model: string;
  likes: Array<string>;
  tags: Array<string>;
  description: string;
};

export class DatasetModel {
  public id: string;
  public name: string;
  public model: string;
  public likes: Array<string>;
  public tags: Array<string>;
  public description: string;

  constructor({
    description,
    id,
    likes,
    model,
    name,
    tags,
  }: DatasetModelParams) {
    this.id = id;
    this.description = description;
    this.name = name;
    this.tags = tags;
    this.model = model;
    this.likes = likes;
  }
}
