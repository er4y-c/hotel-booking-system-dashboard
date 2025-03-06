'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter, useParams } from 'next/navigation';

import { roomServices } from '@/services/room';
import { Room } from '@/types/room';

// Define zod schema for room form
const roomSchema = z.object({
  category: z.enum(['Basic', 'Premium', 'Suite']),
  basePrice: z.number().positive({ message: 'Base Price must be positive' }),
  hotelId: z.string().min(1, { message: 'Hotel ID is required' }),
  roomNumber: z.string().min(1, { message: 'Room Number is required' }),
});

export default function EditRoomPage() {
  const router = useRouter();
  const params = useParams() as { id: string };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['room', params.id],
    queryFn: () => roomServices.details(params.id),
  });

  const defaultValues =
    isLoading || isError
      ? {}
      : {
          roomNumber: data?.data.roomNumber,
          category: data?.data.category,
          basePrice: data?.data.basePrice,
          hotelId: data?.data.hotelId,
        };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Room>({
    resolver: zodResolver(roomSchema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: (data: Room) => roomServices.update(data),
    onSuccess: () => {
      toast('Room updated successfully');
      router.push('/rooms/list');
    },
    onError: () => {
      toast.error('Error updating room');
    },
  });

  const onSubmit = (formData: Room) => {
    mutation.mutate({ ...formData, _id: params.id });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading room details.</div>;

  return (
    <div className="p-4">
      <h1>Edit Room</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Room Number</label>
          <input {...register('roomNumber')} />
          {errors.roomNumber && <p>{errors.roomNumber.message}</p>}
        </div>
        <div>
          <label>Category</label>
          <select {...register('category')}>
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="Suite">Suite</option>
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </div>
        <div>
          <label>Base Price</label>
          <input type="number" {...register('basePrice', { valueAsNumber: true })} />
          {errors.basePrice && <p>{errors.basePrice.message}</p>}
        </div>
        <div>
          <label>Hotel ID</label>
          <input {...register('hotelId')} />
          {errors.hotelId && <p>{errors.hotelId.message}</p>}
        </div>
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Updating...' : 'Update Room'}
        </button>
      </form>
    </div>
  );
}
