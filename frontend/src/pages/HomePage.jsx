import React, { useState } from 'react'
import EuroChart from '../charts/EuroChart';
import ChfChart from '../charts/ChfChart';
import GbpChart from '../charts/GbpChart';
import UsdChart from '../charts/UsdChart';
import AllChart from '../charts/AllChart';
import JpyChart from '../charts/JpyChart';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import {TabContext} from '@mui/lab';
import {TabList} from '@mui/lab';
import {TabPanel} from '@mui/lab';

 function HomePage() {
  const [value, setValue] = useState('0');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Wszystkie waluty" value="0" />
            <Tab label="Euro" value="1" />
            <Tab label="Dolar amerykański" value="2" />
            <Tab label="Frank szwajcarski" value="3" />
            <Tab label="Funt szterling" value="4" />
            <Tab label="Jen japoński" value="5" />
          </TabList>
        </Box>
        <TabPanel value="0" ><AllChart/></TabPanel>
        <TabPanel value="1"><EuroChart/></TabPanel>
        <TabPanel value="2"><UsdChart/></TabPanel>
        <TabPanel value="3"><ChfChart/></TabPanel>
        <TabPanel value="4"><GbpChart/></TabPanel>
        <TabPanel value="5"><JpyChart/></TabPanel>
      </TabContext>
    </Box>
  );
}

export default HomePage
