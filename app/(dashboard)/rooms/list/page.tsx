'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { roomServices } from '@/services/room';
import PaginatedTable from '@/components/table';
import { ColumnDef, Row } from '@tanstack/react-table';

import Breadcrumbs from '@/components/breadcrumbs';
import { Room } from '@/types/room';
import { EditButton, DeleteButton } from '@/components/room-buttons';

const columns: ColumnDef<Room>[] = [
  {
    header: 'Room Number',
    accessorKey: 'roomNumber',
  },
  {
    header: 'Category',
    accessorKey: 'category',
  },
  {
    header: 'Base Price',
    accessorKey: 'basePrice',
  },
  {
    header: 'Hotel ID',
    accessorKey: 'hotelId',
  },
];

const RoomActions = ({ row }: { row: Row<unknown> }) => (
  <div className="flex gap-2 justify-center">
    <EditButton row={row} />
    <DeleteButton row={row} />
  </div>
);

export default function RoomListPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['rooms'],
    queryFn: roomServices.list,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;

  const rooms: Room[] = data?.data;

  return (
    <div className="p-4">
      <Breadcrumbs
        items={[
          { text: 'Rooms', href: '/rooms/list' },
          { text: 'Rooms', href: '/rooms/list' },
        ]}
      />
      <div className="mx-16 my-12 lg:mx-32 lg:my-24">
        <PaginatedTable
          data={rooms}
          columns={columns}
          title="Room List"
          createLink="/rooms/create"
          createLabel="Create Room"
          ButtonGroup={RoomActions}
        />
      </div>
    </div>
  );
}
