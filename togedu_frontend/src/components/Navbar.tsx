import { Search, LogOut, User, Settings, Bell } from "lucide-react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavbarProps {
  user: { name: string; role: string; email: string };
  onLogout: () => void;
}

export function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-[#e2e8f0] z-10">
      <div className="h-full px-6 flex items-center gap-6">
        {/* Buscador */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
            <Input 
              placeholder="Buscar en San Martín..." 
              className="pl-12 bg-[#f1f5f9] border-[#f1f5f9] focus:bg-white h-11 rounded-full"
            />
          </div>
        </div>

        {/* Notificaciones */}
        <Button variant="ghost" size="icon" className="relative h-10 w-10 hover:bg-[#f8fafc]">
          <Bell className="w-5 h-5 text-[#64748b]" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-[#fbbf24] text-[#1e293b] text-xs">
            3
          </Badge>
        </Button>

        {/* Usuario */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 gap-2 hover:bg-[#f8fafc] px-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-[#60a5fa] text-white text-sm">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm text-[#1e293b]">{user.name}</span>
                <span className="text-xs text-[#64748b]">@{user.email.split("@")[0]}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm">{user.name}</span>
                <span className="text-xs text-[#64748b]">{user.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="w-4 h-4 mr-2" />
              Mi Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-[#ef4444]">
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
