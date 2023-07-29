export class UserImage {
  private _image: string | null;

  constructor(image: string | null) {
    if (typeof image === "string") {
      if (image.trim() === "") {
        this._image = null;
      } else {
        this._image = image;
      }
    } else {
      this._image = image;
    }
  }

  public get value() {
    return this._image;
  }
}
