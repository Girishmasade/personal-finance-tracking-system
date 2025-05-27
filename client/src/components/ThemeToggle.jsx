import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ThemeToggle = ({ mode, setMode }) => {
  const isDark = mode === 'dark';

  const handleToggle = () => {
    setMode(isDark ? 'light' : 'dark');
  };

  return (
    <FormControlLabel
      control={<Switch checked={isDark} onChange={handleToggle} />}
      label={isDark ? <Brightness4Icon /> : <Brightness7Icon />}
    />
  );
};

export default ThemeToggle;
