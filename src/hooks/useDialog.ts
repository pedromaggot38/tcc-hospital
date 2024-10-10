'use client'
import { useState } from 'react';
import { useTransition } from 'react';

export const useDialog = (onConfirm: () => void) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const openDialog = () => setDialogOpen(true);
    const closeDialog = () => setDialogOpen(false);

    const handleConfirm = () => {
        closeDialog();
        startTransition(() => {
            onConfirm();
        });
    };

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