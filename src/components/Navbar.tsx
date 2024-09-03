import Logo from "./Logo";
import Notifications from "./Notifications";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between">
      <Logo />
      <Notifications />
    </div>
  );
}
