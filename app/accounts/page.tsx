import Sidebar from "@/components/layout/sidebar";

export default function AccountsPage() {
  return (
    <main className="bg-black text-white min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">
            Accounts
          </h1>

          <button className="bg-white text-black px-4 py-2 rounded-lg">
            Add Account
          </button>
        </div>

        <div className="mt-8 bg-zinc-900 rounded-xl p-6">
          No accounts yet
        </div>
      </section>
    </main>
  );
}
