// component
import { Menu, MenuItem } from '@mui/material';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------



const userConfig = [
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
    icon: <Iconify icon={'tabler:file-type-doc'} />,
  },
  {
    title: 'Barangay Issurance',
    path: '/user/view',
    icon: <Iconify icon={'akar-icons:person'} />,
    subMenu: [
      {
        title: '•   Barangay Clearance',
        path: '/user/reqbrgyclearance',
      },
      {
        title: '•  Residency Certification',
        path: '/user/reqresidency',
      },
      {
        title: '•  Business Clearance',
        path: '/user/reqbusiness',
      },
      {
        title: '•  View Requested Certification/Clearance',
        path: '/user/view',
      },
    ],
  },
];

export default userConfig;
