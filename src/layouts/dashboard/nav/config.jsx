// component
import { Menu, MenuItem } from '@mui/material';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------



const navConfig = [
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
    // Use state to manage the anchor element for the dropdown

  },
  {
    title: 'Residents Record',
    path: '/dashboard/record',
    icon: <Iconify icon={'tabler:file-type-doc'} />,
  },
];

export default navConfig;
