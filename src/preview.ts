import type { Renderer, ProjectAnnotations } from "@storybook/types";
import { PARAM_KEY } from "./constants";

type ArrayElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

const globalTypes = {
  stylesheets: {
    themes: [
      {
        id: "primary-theme",
        title: "Primary theme",
        url: "./primary-theme.css",
      },
      {
        id: "secondary-theme",
        title: "Secondary theme",
        url: "./secondary-theme.css",
      },
      {
        id: "tertiary-theme",
        title: "Tertiary theme",
        url: "./tertiary-theme.css",
      },
    ],
  },
};

const { themes } = globalTypes.stylesheets;

export type GlobalTypes = typeof globalTypes;
export type Theme = ArrayElement<typeof themes>;

const preview: ProjectAnnotations<Renderer> = {
  globals: {
    [PARAM_KEY]: undefined,
  },
  globalTypes,
};

export default preview;
