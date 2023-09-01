# Storybook theme/stylesheet switcher addon

## Description

This addon allows you to switch easily between multiple themes declared in your CSS files. It's especially useful in [Tailwind CSS](https://tailwindcss.com/) if you have more themes in separate files.

In addition, on every theme change, your URL updates with a query param that points currently selected theme.

https://github.com/krzysztof01-sz/storybook-theme-switch-addon/assets/54471767/d38857f1-95ed-4a5a-a872-b51e78a5adcd

## Acknowledgements

The idea and code parts were inspired by [storybook-stylesheet-toggle](https://github.com/cheddam/storybook-stylesheet-toggle) addon.

## Getting started

Install the package:

```bash
npm i storybook-theme-switch-addon
```

Add the next addon to your `.storybook/main.(js,ts)` file:

```javascript
module.exports = {
  addons: ["storybook-theme-switch-addon"],
};
```

Configure your themes in `.storybook/preview.(js,ts)` by adding globalTypes to preview object:

```javascript
globalTypes: {
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
},
```

Remember to configure your storybook to serve static files in `public` directory:

```javascript
const config: StorybookConfig = {
  {...options},
  staticDirs: ["../public"],
};
```

### Development scripts

- `yarn start` runs babel in watch mode and starts Storybook
- `yarn build` build and package your addon code
