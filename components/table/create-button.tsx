import React from 'react';
import Link from 'next/link';
import { CirclePlus } from 'lucide-react';

import { ButtonProps } from '@/types/dashboard';

const CreateButton: React.FC<ButtonProps> = ({ href, label }: ButtonProps) => (
  <Link href={href} className="rounded-lg p-2 bg-blue-600 text-white font-semibold min-w-24">
    <CirclePlus className="inline-block mr-2 font-bold text-lg w-4 h-4" />
    {label}
  </Link>
);

export default CreateButton;
