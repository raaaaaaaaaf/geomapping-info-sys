// component
import { Menu, MenuItem } from '@mui/material';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------



const adminConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <Iconify icon={'carbon:analytics'} />,
  },
  {
    title: 'Mapping',
    path: '/dashboard/map',
    icon: <Iconify icon={'carbon:map'} />,
  },
  {
    title: 'Barangay Information',
    path: '/dashboard/brgyinfo',
    icon: <Iconify icon={'akar-icons:person'} />,
    subMenu: [
      {
        title: '•   Barangay Officials',
        path: '/dashboard/brgyinfo',
      },
      {
        title: '•  Barangay Hall Address & Emergency Hotline',
        path: '/dashboard/brgyinfo/location',
      },
      {
        title: '•  Demographic analysis',
        path: '/dashboard/brgyinfo/demographic',
      },
    ],
  },
  {
    title: 'Residents Record',
    path: '/dashboard/record',
    icon: <Iconify icon={'pepicons-pencil:people'} />,
  },
  {
    title: 'Barangay Issurance',
    path: '/dashboard/clearance',
    icon: <Iconify icon={'octicon:issue-closed-24'} />,
  },
  {
    title: 'Blotter Record',
    path: '/dashboard/blotter',
    icon: <Iconify icon={'guidance:police'} />,
  },
];

export default adminConfig;
