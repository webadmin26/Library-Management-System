function Dashboard() {
  const statistics = [
    "Total Books",
    "Total Members",
    "Borrowed Books",
    "Overdue",
    "Unpaid Fines",
    "Lost Books",
  ];

  return (
    <>
    {/* WELCOME MESSAGE */}
              <div className="hidden">
                <h1 className="text-l font-semibold">
                Hi, Welcome Back User!👌</h1>
              </div>
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
        {statistics.map((stat) => (
          <div
            key={stat}
            className="flex h-28 justify-center rounded-lg bg-white shadow-md"
          >
            <h3 className="mt-1 text-xl">{stat}</h3>
          </div>
        ))}
      </div>

      <section className="mt-10 h-48 rounded-lg bg-white pl-5 pt-1 shadow-md">
        <h3 className="mt-1 text-xl">Recent Activities</h3>
      </section>
    </>
  );
}

export default Dashboard;
