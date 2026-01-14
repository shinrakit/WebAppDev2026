import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* ใช้ Utilities กำหนดขนาด สี และความโปร่งใส */}
      <Spinner className="size-8 text-purple-500 opacity-75" />
    </div>
  );
}