import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
}

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="p-6">
        <p className="text-zinc-400 text-sm">
          {title}
        </p>

	  <h3 className="text-3xl font-bold mt-3 text-white">
          {value}
        </h3>
      </CardContent>
    </Card>
  );
}
