import { NavLink } from "react-router-dom";
import { Home, Camera, Sprout, Wallet, LifeBuoy } from "lucide-react";
import { useTranslation } from "react-i18next";

const navItems = [
  { to: "/home", icon: Home, key: "home" },
  { to: "/upload", icon: Camera, key: "upload" },
  { to: "/services", icon: Sprout, key: "services" },
  { to: "/payouts", icon: Wallet, key: "payouts" },
  { to: "/support", icon: LifeBuoy, key: "support" },
] as const;

export function BottomNav() {
  const { t } = useTranslation();
  return (
    <nav aria-label="Primary" className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <ul className="grid grid-cols-5">
        {navItems.map(({ to, icon: Icon, key }) => (
          <li key={to}>
            <NavLink
              to={to}
              end
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-2 text-xs ${isActive ? 'text-primary' : 'text-muted-foreground'}`
              }
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
              <span className="mt-1">{t(`nav.${key}`)}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
