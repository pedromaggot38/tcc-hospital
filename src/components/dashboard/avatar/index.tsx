import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import * as z from 'zod'

/**
 * Renderiza o avatar do usuário atual.
 *
 * @returns Componente de Avatar
 */

const getInitials = (name: string): string => {
    const names = name.split(' ');
    const initials = names.map(n => n.charAt(0)).join('');
    return initials.toUpperCase();
};
const userSchema = z.object({
    name: z.string().min(1).default(''),
    image: z.string().url().optional()
});

export default function AvatarDashboard() {
    const user = useCurrentUser();
    const validatedUser = userSchema.safeParse(user);
    const userName = validatedUser.success ? validatedUser.data.name : '';
    const userImage = validatedUser.success ? validatedUser.data.image : '';

    const initials = userName ? getInitials(userName) : '';
    return (
        <Avatar>
            <AvatarImage src={ ""} />
            <AvatarFallback></AvatarFallback>
        </Avatar>
    )
}