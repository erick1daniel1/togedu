import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { GraduationCap } from "lucide-react";

interface LoginPageProps {
  onLogin: (user: { name: string; role: string; email: string }) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulamos el login con datos de ejemplo
    onLogin({
      name: email.includes("profesor") ? "María García" : "Carlos Rodríguez",
      role: email.includes("profesor") ? "Profesor" : "Estudiante",
      email: email || "usuario@colegio.edu"
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2563eb] via-[#60a5fa] to-[#2563eb] p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-[#2563eb] rounded-full flex items-center justify-center">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-[#1e293b]">Colegio San Martín</CardTitle>
          <CardDescription>Inicia sesión en tu cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="usuario@colegio.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-[#e2e8f0]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-[#e2e8f0]"
              />
            </div>
            <Button type="submit" className="w-full bg-[#2563eb] hover:bg-[#1d4ed8]">
              Iniciar Sesión
            </Button>
          </form>
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-[#64748b]">Usuarios de prueba:</p>
            <p className="text-xs text-[#64748b]">estudiante@colegio.edu | profesor@colegio.edu</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
