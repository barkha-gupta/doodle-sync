"use client";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useApiMutaion } from "@/hooks/use-api-mutations";

export const EmptyBoards = () => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutaion(api.board.create);

  const onClick = () => {
    if (!organization) return;

    mutate({ title: "Untitled", orgId: organization.id })
      .then(() => {
        toast.success("Board created");
      })
      .catch(() => toast.error("Failed to create board"));
  };
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Image src="/empty-board.svg" height={110} width={110} alt="empty" />
      <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your oragnistaion
      </p>
      <div className="mt-6">
        <Button disabled={pending} onClick={onClick} size="lg">
          Create Board
        </Button>
      </div>
    </div>
  );
};
