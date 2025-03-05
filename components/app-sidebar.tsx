'use client';

import * as React from 'react';
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Settings2,
  Home,
  Book,
  Activity,
  DollarSign,
  BarChart,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavReports } from '@/components/nav-reports';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Room Management',
      url: '#',
      icon: Home,
      isActive: true,
      items: [
        {
          title: 'List Rooms',
          url: '#',
        },
        {
          title: 'Add New Room',
          url: '#',
        },
        {
          title: 'Delete Room',
          url: '#',
        },
      ],
    },
    {
      title: 'Booking',
      url: '#',
      icon: Book,
      items: [
        {
          title: 'List Bookings',
          url: '#',
        },
        {
          title: 'Approve Bookings',
          url: '#',
        },
        {
          title: 'Cancel Bookings',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Hotel',
          url: '#',
        },
        {
          title: 'Profile',
          url: '#',
        },
      ],
    },
  ],
  reports: [
    {
      name: 'Room Occupancy',
      url: '#',
      icon: Activity,
    },
    {
      name: 'Sales',
      url: '#',
      icon: DollarSign,
    },
    {
      name: 'Performance Metrics',
      url: '#',
      icon: BarChart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavReports reports={data.reports} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
