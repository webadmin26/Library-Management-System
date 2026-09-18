function Header ({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <header className="fixed top-0 z-30 flex h-14 w-full items-center justify-center bg-[#9182C5] text-white lg:left-60 lg:w-[calc(100%-15rem)]">
          {/* Mobile / Tablet Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute left-4 text-2xl lg:hidden"
          >
            ☰
          </button>

          <h2 className="text-lg">LIBRARY MANAGEMENT SYSTEM</h2>
        </header>
  );
}

export default Header;
