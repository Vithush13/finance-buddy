import { Link, useLocation } from "react-router-dom";
import { Home, Wallet, Target, Users } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: <Home size={20} /> },
    { name: "Expenses", path: "/expenses", icon: <Wallet size={20} /> },
    { name: "Challenges", path: "/challenges", icon: <Target size={20} /> },
    { name: "Friends", path: "/friends", icon: <Users size={20} /> },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg">
      <div className="p-6 text-2xl font-bold">💰 Finance Buddy</div>
      <nav className="mt-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 
              ${
                location.pathname === item.path
                  ? "bg-white text-indigo-600 font-semibold shadow-md"
                  : "hover:bg-indigo-500 hover:pl-8"
              }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
