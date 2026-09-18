import { useState } from "react";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";
import BookManagement from "./pages/BookManagement";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const handleNavigate = (page) => {
    setActivePage(page);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        isSidebarOpen={isSidebarOpen}
        onNavigate={handleNavigate}
      />

      {/* Main Area */}
      <main className="min-h-screen pt-14 lg:ml-60">

        {/* Header */}
        <Header 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        />
        

        {/* Dashboard Content */}
        <section className="pt-3 pb-4 px-4 ">

          {/* WELCOME MESSAGE */}
          <div className={activePage === "dashboard" ? "mb-8" : "hidden"}>
            <h1 className="text-l font-semibold">
            Hi, Welcome Back User!👌</h1>
          </div>

          {activePage === "dashboard" ? <Dashboard /> : <BookManagement />}

        </section>
      </main>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}
    </div>
  );
}

export default App;
