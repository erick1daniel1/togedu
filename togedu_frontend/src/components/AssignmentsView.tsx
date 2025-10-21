import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Clock, CheckCircle2, AlertCircle, FileText, Upload } from "lucide-react";

const assignments = [
  {
    id: 1,
    title: "Resolver ejercicios de Álgebra Lineal",
    subject: "Matemáticas",
    dueDate: "Mañana",
    dueTime: "23:59",
    status: "pending",
    priority: "high",
    points: 20,
    description: "Completar los ejercicios 1-15 del capítulo 5 sobre matrices y determinantes.",
  },
  {
    id: 2,
    title: "Informe de Laboratorio - Termodinámica",
    subject: "Física",
    dueDate: "En 3 días",
    dueTime: "18:00",
    status: "pending",
    priority: "high",
    points: 30,
    description: "Redactar informe detallado del experimento realizado en clase sobre calorimetría.",
  },
  {
    id: 3,
    title: "Análisis literario: García Márquez",
    subject: "Literatura",
    dueDate: "En 5 días",
    dueTime: "23:59",
    status: "in-progress",
    priority: "medium",
    points: 25,
    description: "Escribir un ensayo de 1000 palabras sobre 'Cien años de soledad'.",
  },
  {
    id: 4,
    title: "Nomenclatura de compuestos orgánicos",
    subject: "Química",
    dueDate: "Hace 2 días",
    dueTime: "23:59",
    status: "late",
    priority: "high",
    points: 15,
    description: "Completar ejercicios sobre nomenclatura IUPAC.",
  },
  {
    id: 5,
    title: "Línea de tiempo - Segunda Guerra Mundial",
    subject: "Historia",
    dueDate: "En 1 semana",
    dueTime: "23:59",
    status: "pending",
    priority: "low",
    points: 20,
    description: "Crear una línea de tiempo detallada de los eventos principales de la WWII.",
  },
  {
    id: 6,
    title: "Presentación oral en inglés",
    subject: "Inglés",
    dueDate: "Entregado",
    dueTime: "",
    status: "completed",
    priority: "medium",
    points: 30,
    grade: 28,
    description: "Presentación sobre cultura estadounidense.",
  },
  {
    id: 7,
    title: "Ejercicios de gramática - Past Perfect",
    subject: "Inglés",
    dueDate: "Entregado",
    dueTime: "",
    status: "completed",
    priority: "low",
    points: 10,
    grade: 10,
    description: "Completar workbook páginas 45-48.",
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "bg-[#ef4444] text-white";
    case "medium": return "bg-[#fbbf24] text-[#1e293b]";
    case "low": return "bg-[#60a5fa] text-white";
    default: return "bg-[#64748b] text-white";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed": return <CheckCircle2 className="w-5 h-5 text-[#10b981]" />;
    case "late": return <AlertCircle className="w-5 h-5 text-[#ef4444]" />;
    default: return <Clock className="w-5 h-5 text-[#fbbf24]" />;
  }
};

export function AssignmentsView() {
  const pendingAssignments = assignments.filter(a => a.status === "pending" || a.status === "in-progress" || a.status === "late");
  const completedAssignments = assignments.filter(a => a.status === "completed");

  const AssignmentCard = ({ assignment }: { assignment: typeof assignments[0] }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getStatusIcon(assignment.status)}
              <CardTitle className="text-[#1e293b]">{assignment.title}</CardTitle>
            </div>
            <CardDescription>{assignment.description}</CardDescription>
          </div>
          <Badge className={getPriorityColor(assignment.priority)}>
            {assignment.priority === "high" ? "Alta" : assignment.priority === "medium" ? "Media" : "Baja"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-[#64748b]">Materia:</span>
            <Badge variant="outline">{assignment.subject}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#64748b]">Puntos:</span>
            <span className="text-[#2563eb]">{assignment.points}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-[#64748b]" />
          <span className="text-[#64748b]">Fecha límite:</span>
          <span className={assignment.status === "late" ? "text-[#ef4444]" : "text-[#1e293b]"}>
            {assignment.dueDate} {assignment.dueTime && `- ${assignment.dueTime}`}
          </span>
        </div>

        {assignment.status === "completed" && assignment.grade !== undefined && (
          <div className="flex items-center gap-2 p-3 bg-[#f1f5f9] rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
            <span className="text-sm">Calificación: {assignment.grade}/{assignment.points}</span>
          </div>
        )}

        {assignment.status !== "completed" && (
          <div className="flex gap-2">
            <Button className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8]">
              <Upload className="w-4 h-4 mr-2" />
              Entregar
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4" />
            </Button>
          </div>
        )}

        {assignment.status === "completed" && (
          <Button variant="outline" className="w-full">
            <FileText className="w-4 h-4 mr-2" />
            Ver entrega
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-[#1e293b] mb-2">Tareas y Trabajos</h2>
        <p className="text-[#64748b]">Gestiona tus tareas pendientes y completadas</p>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748b]">Total Pendientes</p>
                <p className="text-[#2563eb]">{pendingAssignments.length}</p>
              </div>
              <Clock className="w-8 h-8 text-[#2563eb]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748b]">Completadas</p>
                <p className="text-[#10b981]">{completedAssignments.length}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-[#10b981]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748b]">Atrasadas</p>
                <p className="text-[#ef4444]">{assignments.filter(a => a.status === "late").length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-[#ef4444]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748b]">Promedio</p>
                <p className="text-[#fbbf24]">
                  {completedAssignments.length > 0
                    ? (completedAssignments.reduce((acc, a) => acc + (a.grade || 0), 0) / completedAssignments.length).toFixed(1)
                    : "N/A"}
                </p>
              </div>
              <FileText className="w-8 h-8 text-[#fbbf24]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de tareas */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="pending">Pendientes ({pendingAssignments.length})</TabsTrigger>
          <TabsTrigger value="completed">Completadas ({completedAssignments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {pendingAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {completedAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
