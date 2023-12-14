// component
import { Menu, MenuItem } from '@mui/material';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------



const userConfig = [
  {
    title: 'dashboard',
    path: '/user/app',
    icon: <Iconify icon={'carbon:analytics'} />,
  },
  {
    title: 'Mapping',
    path: '/user/map',
    icon: <Iconify icon={'carbon:map'} />,
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
  {
    title: 'Blotter Record',
    path: '/user/blotter',
    icon: <Iconify icon={'carbon:map'} />,
  },
];

export default userConfig;
