import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserByEmail } from "@/data/user";
import { useCurrentUser } from "@/hooks/use-current-user";
import { CircleUser } from "lucide-react";

/**
 * Renderiza o avatar do usuário atual.
 *
 * @returns Componente de Avatar
 */
const getInitials = (name: string) => {
    const names = name.split(' ');
    const initials = names.map(n => n.charAt(0)).join('');
    return initials.toUpperCase();
};

export default function AvatarDashboard() {
    const user = useCurrentUser();
    const image = getUserByEmail(user?.name || '');

    return (
        <Avatar>
            <AvatarImage
                src={user?.image || undefined}
                alt="User Avatar"
            />
            <AvatarFallback>
                {user?.name ? getInitials(user.name) : <CircleUser />}
            </AvatarFallback>
        </Avatar>
    )
}
