"use client";

import { Cheader, Icon, NavBar, Drawer } from "@eloisallena/web_components";

const NAV_ITEMS = [
  { id: 1, label: "Home", href: "#home" },
  { id: 2, label: "About Me", href: "#about-me" },
  { id: 3, label: "Projects", href: "#projects" },
  { id: 4, label: "Skills", href: "#skills" },
  { id: 5, label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <div className="sticky top-0 z-50">
      <Cheader style="bg-transparent border-none shadow-none">
        <Icon logo="/elogo.png" title="" titleClassName="hidden" />

        <div data-testid="navbar-desktop">
          <NavBar
            navBar={NAV_ITEMS}
            navLabelClassName="text-black hover:text-orange"
          />
        </div>

        <div data-testid="navbar-drawer-wrapper">
          <Drawer navDrawer={NAV_ITEMS} />
        </div>
      </Cheader>
    </div>
  );
}