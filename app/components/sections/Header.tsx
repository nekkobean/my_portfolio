// "use client";

// import { Cheader, Icon, NavBar, Drawer } from "@eloisallena/web_components";

// const NAV_ITEMS = [
//   { id: 1, label: "Home", href: "#home" },
//   { id: 2, label: "About Me", href: "#about-me" },
//   { id: 3, label: "Projects", href: "#projects" },
//   { id: 4, label: "Skills", href: "#skills" },
//   { id: 5, label: "Contact", href: "#contact" },
// ];

// export default function Header() {
//   return (
//     <div className="sticky top-0 z-50">
//       <Cheader style="bg-transparent border-none shadow-none">
//         <Icon logo="/elogo.png" title="" titleClassName="hidden" />

//         <div data-testid="navbar-desktop">
//           <NavBar
//             navBar={NAV_ITEMS}
//             navLabelClassName="text-black hover:text-orange"
//           />
//         </div>

//         <div data-testid="navbar-drawer-wrapper">
//           <Drawer navDrawer={NAV_ITEMS} />
//         </div>
//       </Cheader>
//     </div>
//   );
// }
"use client";

import {
  Cheader,
  Drawer,
  Icon,
  NavBar,
} from "@eloisallena/web_components";

const NAV_ITEMS = [
  { id: 1, label: "Home", href: "#home" },
  { id: 2, label: "About Me", href: "#about-me" },
  { id: 3, label: "Projects", href: "#projects" },
  { id: 4, label: "Skills", href: "#skills" },
  { id: 5, label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <div
      data-testid="site-header"
      className="
        sticky
        top-0
        z-50
        isolate
      "
    >
      {/* Transparent blurred background */}
      <div
        aria-hidden="true"
        data-testid="header-backdrop"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          border-b
          border-black/10
          bg-white/10
          backdrop-blur-md
          supports-backdrop-filter:bg-white/20
          "
      />

      <Cheader
        transparent
        style="
          relative
          z-10
        "
      >
        <Icon
          logo="/elogo.png"
          title=""
          alt="Eloisa Marie Llena logo"
        />

        <div data-testid="navbar-desktop">
          <NavBar
            navBar={NAV_ITEMS}
            ariaLabel="Primary navigation"
            navLabelClassName="
              text-black
              hover:text-orange
            "
          />
        </div>

        <div data-testid="navbar-drawer-wrapper">
          <Drawer
            navDrawer={NAV_ITEMS}
            title="Menu"
          />
        </div>
      </Cheader>
    </div>
  );
}