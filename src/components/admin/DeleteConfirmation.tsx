
import React from 'react';
import { Button } from '@/components/ui/button';

interface DeleteConfirmationProps {
  userName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmation = ({ userName, onConfirm, onCancel }: DeleteConfirmationProps) => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Are you sure you want to delete <span className="font-semibold text-gray-900">{userName}</span>? 
        This action cannot be undone.
      </p>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={onConfirm}
          className="bg-red-600 hover:bg-red-700"
        >
          Delete User
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
