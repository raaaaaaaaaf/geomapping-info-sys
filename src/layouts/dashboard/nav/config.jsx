// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Mapping',
    path: '/dashboard/map',
    icon: icon('ic_user'),
  },
  {
    title: 'Barangay Information',
    path: '/dashboard/brgyinfo',
    icon: icon('ic_blog'),
  },
  {
    title: 'Residents Record',
    path: '/dashboard/record',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
