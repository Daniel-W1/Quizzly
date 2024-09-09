import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"

import React from 'react'

interface FinishDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onFinish: () => void;
    questionsLeft: number;
}

const FinishDialog: React.FC<FinishDialogProps> = ({ isOpen, onClose, onFinish, questionsLeft }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to finish the test?</DialogTitle>
                    <DialogDescription>
                        You have {questionsLeft} {questionsLeft === 1 ? 'question' : 'questions'} left.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={onClose}>No, continue</Button>
                    <Button onClick={onFinish} variant={'outline'} className="border-[1px] border-red-300">Yes, finish the test</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default FinishDialog