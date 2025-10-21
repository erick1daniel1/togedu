import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { TrendingUp, Calendar as CalendarIcon, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

export function RightPanel() {
  return (
    <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-[#f9fafb] overflow-y-auto">
      <div className="p-4 space-y-4">

        {/* Tendencias */}
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-[#e2e8f0]">
            <h3 className="text-[#1e293b]">Tendencias</h3>
          </div>
          <CardContent className="p-0">
            {[
              { topic: "Examen Matemáticas", posts: "24 publicaciones" },
              { topic: "Feria de Ciencias", posts: "18 publicaciones" },
              { topic: "Torneo Deportivo", posts: "12 publicaciones" },
            ].map((trend, index) => (
              <div key={index} className="p-4 hover:bg-[#f8fafc] transition-colors cursor-pointer border-b border-[#e2e8f0] last:border-0">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1">
                    <p className="text-xs text-[#64748b] mb-1">Trending en Educación</p>
                    <p className="text-[15px] text-[#1e293b]">#{trend.topic}</p>
                    <p className="text-xs text-[#64748b] mt-1">{trend.posts}</p>
                  </div>
                  <TrendingUp className="w-4 h-4 text-[#2563eb] mt-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Próximos Eventos */}
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-[#e2e8f0]">
            <h3 className="text-[#1e293b]">Próximos Eventos</h3>
          </div>
          <CardContent className="p-0">
            {[
              { title: "Examen Matemáticas", date: "Mañana", time: "10:00 AM", urgent: true },
              { title: "Reunión Padres", date: "Viernes", time: "4:00 PM", urgent: false },
              { title: "Feria de Ciencias", date: "Lunes 25", time: "9:00 AM", urgent: false },
            ].map((event, index) => (
              <div key={index} className="p-4 hover:bg-[#f8fafc] transition-colors border-b border-[#e2e8f0] last:border-0">
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-[#eff6ff] rounded-lg flex flex-col items-center justify-center shrink-0">
                    <CalendarIcon className="w-5 h-5 text-[#2563eb]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      <p className="text-sm text-[#1e293b] flex-1">{event.title}</p>
                      {event.urgent && <AlertCircle className="w-4 h-4 text-[#fbbf24] shrink-0" />}
                    </div>
                    <p className="text-xs text-[#64748b] mt-1">{event.date} · {event.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quién seguir / Estudiantes Activos */}
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-[#e2e8f0]">
            <h3 className="text-[#1e293b]">Activos Ahora</h3>
          </div>
          <CardContent className="p-0">
            {["María López", "Juan Pérez", "Sofia González"].map((name, index) => (
              <div key={index} className="p-4 hover:bg-[#f8fafc] transition-colors border-b border-[#e2e8f0] last:border-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-[#60a5fa] text-white text-sm">
                        {name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#10b981] border-2 border-white rounded-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#1e293b] truncate">{name}</p>
                    <p className="text-xs text-[#64748b]">Estudiante</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#2563eb] hover:bg-[#eff6ff] h-8 px-3 rounded-full text-xs">
                    Seguir
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-xs text-[#94a3b8] px-2 pb-4">
          <div className="flex flex-wrap gap-2">
            <a href="#" className="hover:underline">Términos</a>
            <a href="#" className="hover:underline">Privacidad</a>
            <a href="#" className="hover:underline">Ayuda</a>
          </div>
          <p className="mt-2">© 2025 Colegio San Martín</p>
        </div>
      </div>
    </div>
  );
}
