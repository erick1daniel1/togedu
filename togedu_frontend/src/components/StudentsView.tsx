import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Mail, Phone, MapPin, Award, TrendingUp, Search } from "lucide-react";
import { useState } from "react";

const students = [
  {
    id: 1,
    name: "María López",
    grade: "3° Secundaria",
    section: "A",
    email: "maria.lopez@estudiante.edu",
    phone: "+52 555 1234",
    address: "Colonia Centro",
    average: 9.5,
    status: "active",
    subjects: ["Matemáticas", "Física", "Química"],
  },
  {
    id: 2,
    name: "Juan Pérez",
    grade: "3° Secundaria",
    section: "A",
    email: "juan.perez@estudiante.edu",
    phone: "+52 555 5678",
    address: "Colonia Norte",
    average: 8.8,
    status: "active",
    subjects: ["Literatura", "Historia", "Inglés"],
  },
  {
    id: 3,
    name: "Sofia González",
    grade: "3° Secundaria",
    section: "B",
    email: "sofia.gonzalez@estudiante.edu",
    phone: "+52 555 9012",
    address: "Colonia Sur",
    average: 9.2,
    status: "active",
    subjects: ["Matemáticas", "Química", "Inglés"],
  },
  {
    id: 4,
    name: "Diego Ramírez",
    grade: "2° Secundaria",
    section: "A",
    email: "diego.ramirez@estudiante.edu",
    phone: "+52 555 3456",
    address: "Colonia Este",
    average: 8.5,
    status: "active",
    subjects: ["Física", "Literatura", "Historia"],
  },
  {
    id: 5,
    name: "Ana Torres",
    grade: "3° Secundaria",
    section: "A",
    email: "ana.torres@estudiante.edu",
    phone: "+52 555 7890",
    address: "Colonia Oeste",
    average: 9.7,
    status: "active",
    subjects: ["Matemáticas", "Física", "Química", "Inglés"],
  },
  {
    id: 6,
    name: "Carlos Mendoza",
    grade: "2° Secundaria",
    section: "B",
    email: "carlos.mendoza@estudiante.edu",
    phone: "+52 555 2345",
    address: "Colonia Centro",
    average: 8.0,
    status: "active",
    subjects: ["Literatura", "Historia"],
  },
];

const topStudents = [...students].sort((a, b) => b.average - a.average).slice(0, 5);

export function StudentsView() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StudentCard = ({ student }: { student: typeof students[0] }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-[#60a5fa] text-white">
              {student.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-[#1e293b] mb-1">{student.name}</CardTitle>
            <div className="flex gap-2 mb-2">
              <Badge variant="outline">{student.grade}</Badge>
              <Badge variant="outline">Sección {student.section}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#10b981]" />
              <span className="text-sm">Promedio: </span>
              <span className="text-[#2563eb]">{student.average}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 text-sm text-[#64748b]">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {student.email}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            {student.phone}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {student.address}
          </div>
        </div>

        <div className="pt-2 border-t border-[#e2e8f0]">
          <p className="text-xs text-[#64748b] mb-2">Materias inscritas:</p>
          <div className="flex flex-wrap gap-1">
            {student.subjects.map((subject, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {subject}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1">
            Ver Perfil
          </Button>
          <Button className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8]">
            Mensaje
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-[#1e293b] mb-2">Estudiantes</h2>
        <p className="text-[#64748b]">Directorio y gestión de estudiantes</p>
      </div>

      {/* Búsqueda */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-[#64748b]" />
            <Input
              type="text"
              placeholder="Buscar estudiante por nombre, grado o sección..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todos ({students.length})</TabsTrigger>
          <TabsTrigger value="top">Mejores Promedios</TabsTrigger>
          <TabsTrigger value="stats">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
          {filteredStudents.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-[#64748b]">No se encontraron estudiantes</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="top" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topStudents.map((student, index) => (
              <div key={student.id} className="relative">
                {index < 3 && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-[#fbbf24]' : index === 1 ? 'bg-[#cbd5e1]' : 'bg-[#fb923c]'
                    }`}>
                      <Award className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
                <StudentCard student={student} />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stats" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1e293b]">Total Estudiantes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#2563eb]">{students.length}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1e293b]">Promedio General</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#10b981]">
                  {(students.reduce((acc, s) => acc + s.average, 0) / students.length).toFixed(2)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1e293b]">Mejor Promedio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#fbbf24]">
                  {Math.max(...students.map(s => s.average))}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1e293b]">Grados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#60a5fa]">
                  {new Set(students.map(s => s.grade)).size}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-[#1e293b]">Distribución por Grado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from(new Set(students.map(s => s.grade))).map((grade) => {
                  const count = students.filter(s => s.grade === grade).length;
                  const percentage = (count / students.length) * 100;
                  return (
                    <div key={grade}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-[#1e293b]">{grade}</span>
                        <span className="text-sm text-[#64748b]">{count} estudiantes</span>
                      </div>
                      <div className="w-full bg-[#f1f5f9] rounded-full h-2">
                        <div
                          className="bg-[#2563eb] h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
