import { v2 } from "cloudinary";

export const CloudinaryProvider = {
  provide: "Cloudinary",
  useFactory: () => {
    return v2.config({
      cloud_name: "chaca-sa",
      api_key: process.env.CLAUDINARY_API_KEY,
      api_secret: process.env.CLAUDINARY_API_SECRET,
    });
  },
};
