import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { RightPanel } from "./components/RightPanel";
import { HomePage } from "./components/HomePage";
import { ClassesView } from "./components/ClassesView";
import { AssignmentsView } from "./components/AssignmentsView";
import { CalendarView } from "./components/CalendarView";
import { StudentsView } from "./components/StudentsView";

export default function App() {
  const [user, setUser] = useState<{ name: string; role: string; email: string } | null>(null);
  const [currentView, setCurrentView] = useState("home");

  const handleLogin = (userData: { name: string; role: string; email: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("home");
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Navbar superior */}
      <Navbar user={user} onLogout={handleLogout} />
      
      {/* Sidebar izquierdo */}
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      {/* Panel derecho - solo visible en la página de inicio */}
      {currentView === "home" && <RightPanel />}
      
      {/* Contenido principal */}
      <main className={currentView === "home" ? "ml-64 mr-80 pt-16" : "ml-64 pt-16"}>
        {currentView === "home" && <HomePage />}
        {currentView === "classes" && <ClassesView />}
        {currentView === "assignments" && <AssignmentsView />}
        {currentView === "calendar" && <CalendarView />}
        {currentView === "students" && <StudentsView />}
      </main>
    </div>
  );
}
