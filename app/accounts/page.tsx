export default function AccountsPage() {
  return (
    <div className="p-8">
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
    </div>
  );
}
