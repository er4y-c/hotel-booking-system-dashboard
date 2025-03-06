import React from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Row } from '@tanstack/react-table';

import { Room } from '@/types/room';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { roomServices } from '@/services/room';

export const EditButton: React.FC<{ row: Row<unknown> }> = ({ row }) => {
  const roomId = (row.original as Room)._id;
  return (
    <Link href={`/rooms/edit/${roomId}`}>
      <Button variant="secondary">Edit</Button>
    </Link>
  );
};

export const DeleteButton: React.FC<{ row: Row<unknown> }> = ({ row }) => {
  const queryClient = useQueryClient();
  const roomId = (row.original as Room)._id;
  const mutation = useMutation({
    mutationFn: () => roomServices.delete(roomId as string),
    onSuccess: () => {
      toast('Room deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
    onError: () => {
      toast.error('Error deleting room');
    },
  });

  return (
    <Button variant="destructive" onClick={() => mutation.mutate()}>
      Delete
    </Button>
  );
};
