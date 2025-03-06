import React from 'react';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { hotelServices } from '@/services/hotel';
import { useHotelStore } from '@/stores/hotelStore';
import { toast } from 'sonner';
import { Hotel } from '@/types/hotel';

const createHotelSchema = z.object({
  name: z.string().min(1, { message: 'Hotel Name is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  description: z.string().optional(),
  contactMail: z.string().email({ message: 'Invalid email' }).optional(),
  contactPhone: z.string().optional(),
  gallery: z.array(z.string()).optional(),
});
type CreateHotelInput = z.infer<typeof createHotelSchema>;

export function CreateHotelPopup() {
  const { setSelectedHotel } = useHotelStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateHotelInput>({
    resolver: zodResolver(createHotelSchema),
  });

  const mutation = useMutation(
    (newHotel: CreateHotelInput) => hotelServices.create(newHotel as Hotel),
    {
      onSuccess: (res: { data: Hotel }) => {
        setSelectedHotel({
          _id: res.data._id,
          name: res.data.name,
          address: res.data.address,
          description: res.data.description,
          contactMail: res.data.contactMail,
          contactPhone: res.data.contactPhone,
          gallery: res.data.gallery,
        });
      },
      onError: () => {
        toast.error('Hotel ', { duration: 5000, position: 'top-right' });
      },
    },
  );

  const onSubmit = (data: CreateHotelInput) => {
    mutation.mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <div className="bg-background flex size-6 items-center justify-center rounded-md border">
            <Plus className="size-4" />
          </div>
          <span className="text-muted-foreground font-medium">Add hotel</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create New Hotel</DialogTitle>
        <DialogDescription>Provide details below to create a new hotel.</DialogDescription>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input type="text" placeholder="Hotel Name" {...register('name')} />
          {errors.name && <p>{errors.name.message}</p>}

          <Input type="text" placeholder="Address" {...register('address')} />
          {errors.address && <p>{errors.address.message}</p>}

          <Input placeholder="Description" {...register('description')} />
          {errors.description && <p>{errors.description.message}</p>}

          <Input type="email" placeholder="Contact Email" {...register('contactMail')} />
          {errors.contactMail && <p>{errors.contactMail.message}</p>}

          <Input type="tel" placeholder="Contact Phone" {...register('contactPhone')} />
          {errors.contactPhone && <p>{errors.contactPhone.message}</p>}

          <DialogFooter>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.status === 'pending' ? 'Creating...' : 'Create'}
            </Button>
            <DialogClose asChild>
              <Button type="button">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
