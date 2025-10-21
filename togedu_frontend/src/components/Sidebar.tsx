import { Home, BookOpen, ClipboardList, Calendar, Users, GraduationCap } from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const navItems = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "classes", label: "Clases", icon: BookOpen },
    { id: "assignments", label: "Tareas", icon: ClipboardList },
    { id: "calendar", label: "Calendario", icon: Calendar },
    { id: "students", label: "Estudiantes", icon: Users },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-[#e2e8f0] flex flex-col">
      {/* Logo */}
      <div className="h-16 p-4 border-b border-[#e2e8f0] flex items-center">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#2563eb] rounded-full flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-[#1e293b] text-lg">San Martín</span>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => onViewChange(item.id)}
                className={`w-full justify-start h-12 px-4 ${
                  isActive 
                    ? "bg-[#eff6ff] text-[#2563eb] hover:bg-[#dbeafe]" 
                    : "text-[#1e293b] hover:bg-[#f8fafc]"
                }`}
              >
                <Icon className={`w-6 h-6 mr-4 ${isActive ? "stroke-[2.5px]" : ""}`} />
                <span className={isActive ? "" : ""}>{item.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
