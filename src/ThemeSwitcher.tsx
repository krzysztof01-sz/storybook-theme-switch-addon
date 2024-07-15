import React, { useEffect, useState } from "react";
import { useGlobals, useStorybookApi } from "@storybook/manager-api";
import { WithTooltip, TooltipLinkList } from "@storybook/components";
import { changeStylesheet } from "./helpers";
import { GlobalTypes, Theme } from "./preview";
import { PaintBrushIcon } from "@storybook/icons";

type ThemeID = Theme["id"];

const getTooltipLinks = (
  themes: any[], // Link interface not accessible
  setTheme: (id: ThemeID) => void,
  close: () => void
) => {
  return themes.map((i) => ({
    ...i,
    onClick: () => {
      setTheme(i.id);
      close();
    },
  }));
};

const getTheme = (
  stylesheets: GlobalTypes["stylesheets"],
  themeID: ThemeID
) => {
  const { themes } = stylesheets;
  const selectedTheme = themes.find(({ id }) => id === themeID);
  return selectedTheme || themes[0];
};

const getInitialTheme = () => {
  const themeParam = new URLSearchParams(window.location.href).get("globals");
  if (themeParam) {
    const [_, theme] = themeParam.split(":");
    return theme;
  }
};

export const ThemeSwitcher = () => {
  const api = useStorybookApi();
  const [_, updateGlobals] = useGlobals();
  const [selectedThemeID, setSelectedThemeID] = useState(getInitialTheme);
  const [prevThemeHref, setPrevThemeHref] = useState<Theme["url"]>();

  const { stylesheets } = api.getGlobalTypes() as GlobalTypes;

  useEffect(() => {
    if (stylesheets) {
      const { url: currentHref, id } = getTheme(stylesheets, selectedThemeID);
      changeStylesheet(currentHref, prevThemeHref);
      updateGlobals({ theme: id });
    }
  }, [selectedThemeID]);

  useEffect(() => {
    if (stylesheets) {
      const { url: currentHref } = getTheme(stylesheets, selectedThemeID);
      changeStylesheet(currentHref, prevThemeHref);
    }
  }, [stylesheets]);

  const setTheme = (id: ThemeID) => {
    if (id !== selectedThemeID) {
      setSelectedThemeID((prevThemeID) => {
        const { url } = getTheme(stylesheets, prevThemeID);
        setPrevThemeHref(url);
        return id;
      });
    }
  };

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltip={({ onHide }: any) => {
        if (stylesheets) {
          const { themes } = stylesheets;
          return (
            <TooltipLinkList
              links={getTooltipLinks(themes, setTheme, onHide)}
            />
          );
        }
      }}
    >
      <PaintBrushIcon />
    </WithTooltip>
  );
};
