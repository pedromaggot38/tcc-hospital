import { useState } from 'react';
import { useTransition } from 'react';

// Define o hook useDialog
export const useDialog = (onConfirm: () => void) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    // Função para abrir o Dialog
    const openDialog = () => setDialogOpen(true);

    // Função para fechar o Dialog
    const closeDialog = () => setDialogOpen(false);

    // Função para confirmar a ação
    const handleConfirm = () => {
        closeDialog();
        // Aqui chamamos a função onConfirm passada como argumento
        startTransition(() => {
            onConfirm();
        });
    };

    // Função para cancelar a ação
    const handleCancel = () => closeDialog();

    return {
        dialogOpen,
        openDialog,
        closeDialog,
        handleConfirm,
        handleCancel,
        isPending
    };
};