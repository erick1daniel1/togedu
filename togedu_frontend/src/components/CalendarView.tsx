import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Clock, MapPin, Video, Users } from "lucide-react";
import { useState } from "react";

const events = [
  {
    id: 1,
    title: "Examen de Matemáticas",
    type: "exam",
    date: "2025-10-22",
    time: "10:00 - 11:30",
    location: "Aula 205",
    subject: "Matemáticas",
  },
  {
    id: 2,
    title: "Reunión de Padres de Familia",
    type: "meeting",
    date: "2025-10-24",
    time: "16:00 - 18:00",
    location: "Auditorio Principal",
    subject: "General",
  },
  {
    id: 3,
    title: "Feria de Ciencias",
    type: "event",
    date: "2025-10-25",
    time: "09:00 - 15:00",
    location: "Gimnasio",
    subject: "Ciencias",
  },
  {
    id: 4,
    title: "Clase Online - Inglés",
    type: "class",
    date: "2025-10-22",
    time: "07:00 - 08:00",
    location: "Virtual",
    subject: "Inglés",
  },
  {
    id: 5,
    title: "Entrega Proyecto Final - Historia",
    type: "deadline",
    date: "2025-10-28",
    time: "23:59",
    location: "Plataforma Virtual",
    subject: "Historia",
  },
  {
    id: 6,
    title: "Taller de Orientación Vocacional",
    type: "workshop",
    date: "2025-10-29",
    time: "14:00 - 16:00",
    location: "Sala de Conferencias",
    subject: "Orientación",
  },
  {
    id: 7,
    title: "Torneo Deportivo Intercolegial",
    type: "sport",
    date: "2025-10-30",
    time: "08:00 - 17:00",
    location: "Estadio Municipal",
    subject: "Deportes",
  },
];

const getEventColor = (type: string) => {
  switch (type) {
    case "exam": return "bg-[#ef4444] text-white";
    case "class": return "bg-[#2563eb] text-white";
    case "meeting": return "bg-[#8b5cf6] text-white";
    case "event": return "bg-[#10b981] text-white";
    case "deadline": return "bg-[#fbbf24] text-[#1e293b]";
    case "workshop": return "bg-[#60a5fa] text-white";
    case "sport": return "bg-[#f97316] text-white";
    default: return "bg-[#64748b] text-white";
  }
};

const getEventTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    exam: "Examen",
    class: "Clase",
    meeting: "Reunión",
    event: "Evento",
    deadline: "Fecha límite",
    workshop: "Taller",
    sport: "Deportivo",
  };
  return labels[type] || type;
};

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export function CalendarView() {
  const [currentDate] = useState(new Date(2025, 9, 21)); // October 21, 2025
  const [selectedDate, setSelectedDate] = useState<string>("2025-10-22");

  // Generar días del mes
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Días del mes anterior
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ day: 0, isCurrentMonth: false });
    }
    
    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);
  const selectedEvents = events.filter(e => e.date === selectedDate);
  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date(currentDate));

  const hasEvent = (day: number) => {
    const dateStr = `2025-10-${day.toString().padStart(2, '0')}`;
    return events.some(e => e.date === dateStr);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-[#1e293b] mb-2">Calendario Académico</h2>
        <p className="text-[#64748b]">Visualiza todos tus eventos, clases y fechas importantes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendario */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1e293b]">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center text-sm text-[#64748b] p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {days.map((dayInfo, index) => {
                  const dateStr = dayInfo.isCurrentMonth 
                    ? `2025-10-${dayInfo.day.toString().padStart(2, '0')}`
                    : '';
                  const isSelected = dateStr === selectedDate;
                  const isToday = dayInfo.day === 21 && dayInfo.isCurrentMonth;
                  const eventExists = dayInfo.isCurrentMonth && hasEvent(dayInfo.day);

                  return (
                    <button
                      key={index}
                      onClick={() => dateStr && setSelectedDate(dateStr)}
                      disabled={!dayInfo.isCurrentMonth}
                      className={`
                        aspect-square p-2 rounded-lg text-sm relative
                        ${!dayInfo.isCurrentMonth ? 'text-[#cbd5e1] cursor-not-allowed' : 'cursor-pointer hover:bg-[#f1f5f9]'}
                        ${isSelected ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]' : ''}
                        ${isToday && !isSelected ? 'border-2 border-[#2563eb]' : ''}
                      `}
                    >
                      {dayInfo.day > 0 && dayInfo.day}
                      {eventExists && !isSelected && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#2563eb] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Eventos del día seleccionado */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-[#1e293b]">
                Eventos del {new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-ES', { 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 border border-[#e2e8f0] rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-[#1e293b]">{event.title}</h4>
                        <Badge className={getEventColor(event.type)}>
                          {getEventTypeLabel(event.type)}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm text-[#64748b]">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          {event.location === "Virtual" ? (
                            <Video className="w-4 h-4" />
                          ) : (
                            <MapPin className="w-4 h-4" />
                          )}
                          {event.location}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {event.subject}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#64748b] text-center py-8">No hay eventos para este día</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Próximos eventos */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1e293b]">Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className="p-3 border border-[#e2e8f0] rounded-lg cursor-pointer hover:bg-[#f1f5f9]"
                  onClick={() => setSelectedDate(event.date)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm text-[#1e293b]">{event.title}</p>
                    <Badge className={`${getEventColor(event.type)} text-xs`}>
                      {getEventTypeLabel(event.type)}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-[#64748b]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(event.date + 'T00:00:00').toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {event.time}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#1e293b]">Leyenda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {["exam", "class", "meeting", "event", "deadline", "workshop", "sport"].map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${getEventColor(type)}`} />
                  <span className="text-sm text-[#64748b]">{getEventTypeLabel(type)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
