import Sidebar from "@/components/layout/sidebar";
import AddAccountModal from "@/components/accounts/add-account-modal";

export default function AccountsPage() {
  return (
    <main className="bg-black text-white min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-8">
        <div className="flex items-center justify-between">
			<h1 className="text-4xl font-bold">
				Accounts
			</h1>

			<AddAccountModal />
		</div>

        <div className="mt-8 bg-zinc-900 rounded-xl p-6">
          No accounts yet
        </div>
      </section>
    </main>
  );
}
