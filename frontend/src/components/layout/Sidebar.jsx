function Sidebar({ activePage, isSidebarOpen, onNavigate }) {
  return (
    <aside
        className={`
          fixed
          top-0 left-0
          z-50
          h-screen w-60 overflow-y-auto
          bg-[#9182C5] text-white
          transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="h-28 flex items-center justify-center text-center">
          <h1 className="text-3xl font-normal leading-tight">
            COMPANY
            <br />
            LOGO
          </h1>
        </div>

        {/* Navigation */}
        <nav className="px-5 space-y-5 pt-7 [&>button]:cursor-pointer">
          <button
            aria-current={activePage === "dashboard" ? "page" : undefined}
            className={`w-full flex items-center gap-2 text-left text-lg hover:text-gray-200 ${activePage === "dashboard" ? "font-semibold" : ""}`}
            onClick={() => onNavigate("dashboard")}
            type="button"
          >
            <span>🔲</span>
            Dashboard
          </button>

          <button
            aria-current={activePage === "book-management" ? "page" : undefined}
            className={`w-full flex items-center gap-2 text-left text-lg hover:text-gray-200 ${activePage === "book-management" ? "font-semibold" : ""}`}
            onClick={() => onNavigate("book-management")}
            type="button"
          >
            <span>📚</span>
            Book Management
          </button>

          <button className="w-full flex items-center gap-2 text-left text-lg hover:text-gray-200">
            <span>👥</span>
            User Management
          </button>

          <button className="w-full flex items-center gap-2 text-left text-lg hover:text-gray-200">
            <span>🧾</span>
            Fine Management
          </button>

          <button className="w-full flex items-center gap-2 text-left text-lg hover:text-gray-200">
            <span>📊</span>
            Reports
          </button>

          <button className="w-full flex items-center gap-2 text-left text-lg hover:text-gray-200">
            <span>⚙️</span>
            Settings
          </button>

          <button className="w-full flex items-center gap-2 text-left text-lg hover:text-gray-200">
            <span>👤</span>
            Profile
          </button>

          <button className="w-full flex items-center gap-2 text-left text-lg hover:text-gray-200 pt-7">
            <span>🚪</span>
            Logout
          </button>
        </nav>
      </aside>
  );
}

export default Sidebar;
