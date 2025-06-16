// postcss.config.js
// import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [tailwind, autoprefixer],
};
