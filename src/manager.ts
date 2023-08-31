import { addons, types } from "@storybook/manager-api";
import { ADDON_ID, TOOL_ID } from "./constants";
import { ThemeSwitcher } from "./ThemeSwitcher";

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Theme switcher",
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: ThemeSwitcher,
  });
});
