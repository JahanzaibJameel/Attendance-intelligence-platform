import React from 'react';
import { Trash2, Download, Mail } from 'lucide-react';
import type { BulkAction } from '../types/bulk';

export const commonBulkActions: BulkAction[] = [
  {
    id: 'delete',
    label: 'Delete',
    icon: React.createElement(Trash2, { className: "w-4 h-4" }),
    action: async (ids) => {
      console.log('Deleting items:', ids);
      // Implement delete logic
    },
    variant: 'danger'
  },
  {
    id: 'export',
    label: 'Export',
    icon: React.createElement(Download, { className: "w-4 h-4" }),
    action: async (ids) => {
      console.log('Exporting items:', ids);
      // Implement export logic
    },
    variant: 'secondary'
  },
  {
    id: 'email',
    label: 'Send Email',
    icon: React.createElement(Mail, { className: "w-4 h-4" }),
    action: async (ids) => {
      console.log('Sending email for items:', ids);
      // Implement email logic
    },
    variant: 'secondary'
  }
];
