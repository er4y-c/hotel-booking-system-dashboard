'use client';

import * as React from 'react';
import { ChevronsUpDown, Hotel } from 'lucide-react';

import { hotelServices } from '@/services/hotel';
import { useHotelStore } from '@/stores/hotelStore';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { CreateHotelPopup } from '@/components/create-hotel-popup';

export function HotelSwitcher() {
  const { hotels, setHotels, setSelectedHotel, selectedHotel, setIsLoading } = useHotelStore();
  const { isMobile } = useSidebar();

  React.useEffect(() => {
    setIsLoading(true);
    hotelServices
      .list()
      .then((response) => {
        // Assuming response.data holds Hotel[]
        setHotels(response.data);
        setSelectedHotel(response.data[0]);
      })
      .catch((error) => {
        console.error('Error fetching hotels:', error);
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!selectedHotel) {
    return null;
  }
  console.log(selectedHotel);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Hotel className="w-4 h-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{selectedHotel.name}</span>
                <span className="truncate text-xs">{selectedHotel.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">Hotels</DropdownMenuLabel>
            {hotels.map((hotel, index) => (
              <DropdownMenuItem
                key={hotel.name}
                onClick={() => setSelectedHotel(hotel)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-xs border">
                  <Hotel className="w-4 h-4 shrink-0" />
                </div>
                {hotel.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <CreateHotelPopup />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
