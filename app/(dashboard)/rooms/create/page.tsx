'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import Breadcrumbs from '@/components/breadcrumbs';
import { Room } from '@/types/room';
import { roomServices } from '@/services/room';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const roomSchema = z.object({
  category: z.enum(['Basic', 'Premium', 'Suite']),
  basePrice: z.number().positive({ message: 'Base Price must be positive' }),
  hotelId: z.string().min(1, { message: 'Hotel ID is required' }),
  roomNumber: z.string().min(1, { message: 'Room Number is required' }),
});

export default function CreateRoomPage() {
  const methods = useForm<Room>({
    resolver: zodResolver(roomSchema),
  });
  const { handleSubmit, control } = methods;

  const mutation = useMutation({
    mutationFn: (data: Room) => roomServices.create(data),
    onSuccess: () => {
      toast('Room created successfully');
    },
    onError: () => {
      toast.error('Error creating room');
    },
  });

  const onSubmit = (data: Room) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <Breadcrumbs
        items={[
          { text: 'Rooms', href: '/rooms/list' },
          { text: 'Create Room', href: '/#' },
        ]}
      />
      <div className="p-4 border border-gray-200 rounded-lg mx-16 my-12 lg:mx-32 lg:my-24">
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="roomNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Room Number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                        <SelectItem value="Suite">Suite</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="basePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      placeholder="Base Price"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="hotelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hotel ID</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Hotel ID" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={mutation.isPending} className="btn">
              {mutation.isPending ? 'Creating...' : 'Create Room'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
