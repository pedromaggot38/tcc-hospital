import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface ActionMenuProps {
    article: {
        id: number;
        slug: string;
    };
}

const ActionMenu: React.FC<ActionMenuProps> = ({ article }) => {
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => null}
                >
                    Random Button
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => {
                            router.push(`/dashboard/articles/${article.slug}/`);
                        }}
                    >
                        Editar publicação
                    </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionMenu;
