import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { BookOpen, Users, Clock, Calendar, FileText } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const classes = [
  {
    id: 1,
    name: "Matemáticas Avanzadas",
    teacher: "Prof. Ana Martínez",
    schedule: "Lunes y Miércoles 10:00 - 11:30",
    students: 28,
    progress: 75,
    nextClass: "Mañana",
    image: "https://images.unsplash.com/photo-1580699228119-7be487b3137f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMHN0dWR5fGVufDF8fHx8MTc2MTAzNTI2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    topics: ["Álgebra Lineal", "Cálculo Diferencial", "Ecuaciones"],
  },
  {
    id: 2,
    name: "Física II",
    teacher: "Prof. Roberto Silva",
    schedule: "Martes y Jueves 8:00 - 9:30",
    students: 25,
    progress: 60,
    nextClass: "Jueves",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc2MTAxMDU2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    topics: ["Termodinámica", "Ondas", "Óptica"],
  },
  {
    id: 3,
    name: "Literatura Contemporánea",
    teacher: "Prof. Carmen Díaz",
    schedule: "Lunes, Miércoles y Viernes 14:00 - 15:00",
    students: 30,
    progress: 45,
    nextClass: "Lunes",
    image: "https://images.unsplash.com/photo-1623303366639-0e330d7c3d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHNjaG9vbHxlbnwxfHx8fDE3NjEwNzc1MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    topics: ["Narrativa Moderna", "Poesía", "Ensayo"],
  },
  {
    id: 4,
    name: "Química Orgánica",
    teacher: "Prof. Luis Hernández",
    schedule: "Martes y Jueves 11:30 - 13:00",
    students: 22,
    progress: 80,
    nextClass: "Martes",
    image: "https://images.unsplash.com/photo-1580699228119-7be487b3137f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMHN0dWR5fGVufDF8fHx8MTc2MTAzNTI2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    topics: ["Hidrocarburos", "Reacciones", "Síntesis"],
  },
  {
    id: 5,
    name: "Historia Mundial",
    teacher: "Prof. Patricia Gómez",
    schedule: "Miércoles y Viernes 9:30 - 11:00",
    students: 27,
    progress: 55,
    nextClass: "Miércoles",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwY2xhc3Nyb29tfGVufDF8fHx8MTc2MTAxMDU2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    topics: ["Siglo XX", "Guerras Mundiales", "Posguerra"],
  },
  {
    id: 6,
    name: "Inglés Avanzado",
    teacher: "Prof. Michael Johnson",
    schedule: "Lunes a Viernes 7:00 - 8:00",
    students: 24,
    progress: 70,
    nextClass: "Mañana",
    image: "https://images.unsplash.com/photo-1623303366639-0e330d7c3d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHNjaG9vbHxlbnwxfHx8fDE3NjEwNzc1MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    topics: ["Grammar", "Conversation", "Writing"],
  },
];

export function ClassesView() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-[#1e293b] mb-2">Mis Clases</h2>
        <p className="text-[#64748b]">Gestiona y accede a tus clases y materiales</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <Card key={classItem.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-32 overflow-hidden">
              <ImageWithFallback
                src={classItem.image}
                alt={classItem.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-[#1e293b]">{classItem.name}</CardTitle>
                <Badge className="bg-[#2563eb] text-white">{classItem.students}</Badge>
              </div>
              <CardDescription>{classItem.teacher}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-[#64748b]">
                  <Clock className="w-4 h-4" />
                  {classItem.schedule}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#64748b]">
                  <Calendar className="w-4 h-4" />
                  Próxima clase: {classItem.nextClass}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748b]">Progreso del curso</span>
                  <span className="text-[#2563eb]">{classItem.progress}%</span>
                </div>
                <Progress value={classItem.progress} className="h-2" />
              </div>

              {classItem.topics && (
                <div className="space-y-2">
                  <p className="text-sm text-[#64748b]">Temas actuales:</p>
                  <div className="flex flex-wrap gap-2">
                    {classItem.topics.slice(0, 2).map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {classItem.topics.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{classItem.topics.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8]">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Acceder
                </Button>
                <Button variant="outline">
                  <FileText className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
