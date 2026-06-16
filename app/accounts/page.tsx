import Sidebar from "@/components/layout/sidebar";
import AddAccountModal from "@/components/accounts/add-account-modal";
import { prisma } from "@/lib/prisma";

export default async function AccountsPage() {
  const accounts = await prisma.tradingAccount.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {accounts.length === 0 ? (
            <div className="bg-zinc-900 rounded-xl p-6">
              No accounts yet
            </div>
          ) : (
            accounts.map((account) => (
              <div
                key={account.id}
                className="bg-zinc-900 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold">
                  {account.accountName}
                </h3>

                <p className="text-zinc-400 mt-2">
                  Broker: {account.brokerName}
                </p>

                <p className="mt-2">
                  Balance: $
                  {account.currentBalance.toLocaleString()}
                </p>

                <p className="mt-2">
                  Status: {account.status}
                </p>

                <p className="mt-2">
                  Phase: {account.phase}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
