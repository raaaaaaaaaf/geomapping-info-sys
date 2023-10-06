// component
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <Iconify icon={'carbon:analytics'}/>,
  },
  {
    title: 'Mapping',
    path: '/dashboard/map',
    icon: <Iconify icon={'carbon:map'}/>,
  },
  {
    title: 'Barangay Information',
    path: '/dashboard/brgyinfo',
    icon: <Iconify icon={'akar-icons:person'}/>,
  },
  {
    title: 'Residents Record',
    path: '/dashboard/record',
    icon: <Iconify icon={'tabler:file-type-doc'}/>,
  },
];

export default navConfig;
