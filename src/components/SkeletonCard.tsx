import { Skeleton } from "@/components/ui/skeleton";
import AddtoBagButton from "@/components/AddtoBagButton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col justify-between items-center space-y-5 p-5 border-[0.5px] shadow-lg rounded-lg">
      <Skeleton className="h-[25px] w-[250px] rounded-md" />
      <Skeleton className="h-[18px] w-[280px] rounded-md" />
      <Skeleton className="h-[18px] w-[200px] rounded-md" />
      <Skeleton className="h-[18px] w-[100px] rounded-md" />
      <AddtoBagButton />
    </div>
  );
}
