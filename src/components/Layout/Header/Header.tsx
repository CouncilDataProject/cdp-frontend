import React, { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import styled from "@emotion/styled";

import { strings } from "../../../assets/LocalizedStrings";
import { screenWidths } from "../../../styles/mediaBreakpoints";

const Navigation = styled.div({
  boxSizing: "initial",
});

const CDPLogo = styled.div({
  float: "left",
  marginTop: "12px",
});

const HamburgerMenuButton = styled.button({
  display: "block",
  [`@media (min-width:${screenWidths.tablet})`]: {
    // Always hidden on tablet size or above
    display: "none",
  },
});

interface NavItemsProps {
  isVisible: boolean;
}
const NavItems = styled.div<NavItemsProps>((props) => ({
  // Visibility determined by props on mobile
  display: props.isVisible ? "block" : "none",
  [`@media (min-width:${screenWidths.tablet})`]: {
    // Always visible on tablet size or above
    display: "block",
  },
}));

export interface HeaderProps {
  /** The name of the municipality */
  municipalityName: string;
}

function currentUnderline(currentPath: string, componentPath: string): React.CSSProperties {
  const currUnderline: React.CSSProperties = { textDecoration: "underline" };
  if (currentPath === componentPath) {
    return currUnderline;
  } else if (componentPath.length > 1 && currentPath.includes(componentPath)) {
    return currUnderline;
  }

  return {};
}

const Header: FC<HeaderProps> = ({ municipalityName }: HeaderProps) => {
  const [navigationIsVisible, setNavigationIsVisible] = useState<boolean>(false);

  const location = useLocation().pathname;

  return (
    <header>
      <Navigation className="mzp-c-navigation">
        <div className="mzp-c-navigation-l-content">
          <div className="mzp-c-navigation-container">
            <HamburgerMenuButton
              className="mzp-c-navigation-menu-button"
              aria-controls="patterns.organisms.navigation.navigation"
              onClick={() => setNavigationIsVisible((prev) => !prev)}
            >
              {strings.menu}
            </HamburgerMenuButton>
            <CDPLogo>
              <a
                className="cdp-icon-black-bg-transparent-size-256"
                style={{ maxHeight: "64px", maxWidth: "64px" }}
                href="https://councildataproject.org"
                title={strings.council_data_project}
              >
                {strings.council_data_project}
              </a>
            </CDPLogo>

            <NavItems
              isVisible={navigationIsVisible}
              className="mzp-c-navigation-items"
              id="patterns.organisms.navigation.navigation"
            >
              <div className="mzp-c-navigation-container">
                <nav className="mzp-c-menu mzp-is-basic">
                  <ul className="mzp-c-menu-category-list">
                    <li className="mzp-c-menu-category">
                      <Link
                        to="/"
                        className="mzp-c-menu-title"
                        style={currentUnderline(location, "/")}
                      >
                        {municipalityName}
                      </Link>
                    </li>
                    <li className="mzp-c-menu-category">
                      <Link
                        to="/events"
                        className="mzp-c-menu-title"
                        style={currentUnderline(location, "/events")}
                      >
                        {strings.events}
                      </Link>
                    </li>
                    <li className="mzp-c-menu-category">
                      <Link
                        to="/people"
                        className="mzp-c-menu-title"
                        style={currentUnderline(location, "/people")}
                      >
                        {strings.people}
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </NavItems>
          </div>
        </div>
      </Navigation>
    </header>
  );
};

export default Header;
