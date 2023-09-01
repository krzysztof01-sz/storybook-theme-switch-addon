const loadStylesheet = (href: string) => {
  if (typeof window !== "undefined") {
    const storybookIFrameElement = document.querySelector(
      "#storybook-preview-iframe"
    ) as HTMLIFrameElement;

    const link = document.createElement("link");

    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", href);

    const storybookHead =
      storybookIFrameElement.contentDocument.querySelector("head");

    storybookHead.appendChild(link);
  }
};

const removeCurrentStylesheet = (href: string) => {
  if (typeof window !== "undefined") {
    const storybookIFrameElement = document.querySelector(
      "#storybook-preview-iframe"
    ) as HTMLIFrameElement;

    const stylesheetElements =
      storybookIFrameElement.contentDocument.querySelectorAll(
        `head link[href='${href}']`
      );

    if (stylesheetElements) {
      stylesheetElements.forEach((element) => {
        element.remove();
      });
    }
  }
};

export const changeStylesheet = (currentHref: string, previousHref: string) => {
  removeCurrentStylesheet(previousHref);
  loadStylesheet(currentHref);
};
