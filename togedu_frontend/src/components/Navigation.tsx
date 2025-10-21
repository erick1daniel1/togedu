import { Home, BookOpen, ClipboardList, Calendar, Users, Bell, LogOut, GraduationCap } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  user: { name: string; role: string; email: string };
  onLogout: () => void;
}

export function Navigation({ currentView, onViewChange, user, onLogout }: NavigationProps) {
  const navItems = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "classes", label: "Clases", icon: BookOpen },
    { id: "assignments", label: "Tareas", icon: ClipboardList },
    { id: "calendar", label: "Calendario", icon: Calendar },
    { id: "students", label: "Estudiantes", icon: Users },
  ];

  return (
    <div className="border-b border-[#e2e8f0] bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#2563eb] rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-[#1e293b]">Colegio San Martín</span>
          </div>

          {/* Navegación central */}
          <nav className="hidden md:flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => onViewChange(item.id)}
                  className={isActive ? "bg-[#2563eb] hover:bg-[#1d4ed8]" : "text-[#64748b] hover:text-[#1e293b]"}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Usuario y notificaciones */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-[#fbbf24] text-[#1e293b]">
                3
              </Badge>
            </Button>
            
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-[#60a5fa] text-white">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm text-[#1e293b]">{user.name}</p>
                <p className="text-xs text-[#64748b]">{user.role}</p>
              </div>
            </div>

            <Button variant="ghost" size="icon" onClick={onLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Navegación móvil */}
        <nav className="md:hidden flex overflow-x-auto gap-2 pb-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewChange(item.id)}
                className={isActive ? "bg-[#2563eb] hover:bg-[#1d4ed8]" : "text-[#64748b]"}
              >
                <Icon className="w-4 h-4 mr-1" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
