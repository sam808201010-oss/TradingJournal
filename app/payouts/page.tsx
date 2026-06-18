import Sidebar from "@/components/layout/sidebar";
import { prisma } from "@/lib/prisma";
import AddPayoutModal from "@/components/payouts/add-payout-modal";

export default async function PayoutsPage() {
  const payouts = await prisma.payout.findMany({
    include: {
      account: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalPaid = payouts
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payouts
    .filter((p) => p.status !== "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <main className="bg-black text-white min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-8">
	<div className="flex justify-between items-center">
	  <h1 className="text-4xl font-bold">
	    Payouts
	  </h1>

	  <AddPayoutModal />
	</div>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-zinc-900 rounded-xl p-6">
            <h3>Total Payouts</h3>
            <p className="text-3xl font-bold mt-3">
              {payouts.length}
            </p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6">
            <h3>Total Paid</h3>
            <p className="text-3xl font-bold mt-3">
              ${totalPaid.toLocaleString()}
            </p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6">
            <h3>Pending</h3>
            <p className="text-3xl font-bold mt-3">
              ${pendingAmount.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {payouts.length === 0 ? (
            <div className="bg-zinc-900 rounded-xl p-6">
              No payouts yet
            </div>
          ) : (
            payouts.map((payout) => (
              <div
                key={payout.id}
                className="bg-zinc-900 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold">
                  {payout.account.accountName}
                </h3>

                <p className="mt-2">
                  Amount: $
                  {payout.amount.toLocaleString()}
                </p>

                <p>Status: {payout.status}</p>

                <p>
                  Requested:
                  {" "}
                  {new Date(
                    payout.requestDate
                  ).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
