'use client'

import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import AvatarDashboard from "@/components/dashboard/avatarDashboard";
import { Badge } from "@/components/ui/badge";
import { User } from "@/lib/types";
interface UserHoverCardProps {
  user: User;
}

const UserHoverCard: React.FC<UserHoverCardProps> = ({ user }) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <span className={user.name ? "" : "text-gray-500"}>
          {user.name || "Não informado"}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <AvatarDashboard user={user} />
          <div className="space-y-1">
            <div className="flex justify-between">
              <h4 className="text-sm font-semibold">@{user.username}</h4>
              <Badge
                variant={
                  user.role === "root"
                    ? "destructive"
                    : user.role === "admin"
                      ? "default"
                      : "secondary"
                }
              >
                {user.role}
              </Badge>
            </div>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserHoverCard;
