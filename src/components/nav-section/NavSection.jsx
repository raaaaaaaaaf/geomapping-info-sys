import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText, Menu, MenuItem } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { useState } from 'react';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info, subMenu } = item;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSubMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledNavItem
      component={subMenu ? 'div' : RouterLink}
      to={subMenu ? '' : path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
      onClick={handleSubMenuClick}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}

      {subMenu && (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleSubMenuClose}>
          {subMenu.map((subItem) => (
            <MenuItem
              key={subItem.title}
              component={RouterLink}
              to={subItem.path}
              onClick={handleSubMenuClose}
            >
              {subItem.title}
            </MenuItem>
          ))}
        </Menu>
      )}
    </StyledNavItem>
  );
}