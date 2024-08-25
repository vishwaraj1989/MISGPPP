

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import TmpGP from './pages/GP/TmpGP';
import SingleQMSIGP from './pages/GP/SingleQMSIGP';
import ThreeQMSIGP from './pages/GP/ThreeQMSIGP';
import Settings from './pages/GP/Settings';
import RgprGP from './pages/GP/RgprGP';
import TmpPP from './pages/PP/TmpPP';
import SingleQMSIPP from './pages/PP/SingleQMSIPP';
import ThreeQMSIPP from './pages/PP/ThreeQMSIPP';
import RgprPP from './pages/PP/RgprPP';
import RegisterForm from './components/RegisterForm';
import H3 from './pages/PP/H3';
import SRDetailsLookup from './components/SRDetailsLookup';
import WO from './components/WO';

import AgGP from './pages/GP/AgGP';
import AgPP from './pages/PP/AgPP';
import LeLr from './components/LeLr'; 
import RgprLeGP from './pages/GP/RgprLeGP'; 
import RgprLrGP from './pages/GP/RgprLrGP'; 
import SingleQMSILeGP from './pages/GP/SingleQMSILeGP'; 
import SingleQMSILrGP from './pages/GP/SingleQMSILrGP'; 
import ThreeQMSILeGP from './pages/GP/ThreeQMSILeGP'; 
import ThreeQMSILrGP from './pages/GP/ThreeQMSILrGP'; 

import GlpSLLeGP from './pages/GP/GlpSLLeGP'; 
import GlpSLLrGP from './pages/GP/GlpSLLrGP'; 

import GlpSLGP from './pages/GP/GlpSLGP';
import GlpSLPP from './pages/PP/GlpSLPP';


import AgLeGP from './pages/GP/AgLeGP'; 
import AgLrGP from './pages/GP/AgLrGP'; 
import RgprLePP from './pages/PP/RgprLePP';
import RgprLrPP from './pages/PP/RgprLrPP';
import SingleQMSILePP from './pages/PP/SingleQMSILePP';
import SingleQMSILrPP from './pages/PP/SingleQMSILrPP';
import ThreeQMSILePP from './pages/PP/ThreeQMSILePP';
import ThreeQMSILrPP from './pages/PP/ThreeQMSILrPP';
import GlpSLLePP from './pages/PP/GlpSLLePP';
import GlpSLLrPP from './pages/PP/GlpSLLrPP';

import AgLePP from './pages/PP/AgLePP';
import AgLrPP from './pages/PP/AgLrPP';
import More from './components/More'; 
import Dashboard from './components/Dashboard'
import Signup from './components/Signup'; // Import the Signup component
import Login from './components/login';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />


        <Route path="/RegisterForm/*" element={<RegisterForm />} />
        <Route path="/tmp-gp/*" element={<TmpGP />} />
        <Route path="/1q-msi-gp/*" element={<SingleQMSIGP />} />
        <Route path="/3q-msi-gp/*" element={<ThreeQMSIGP />} />
        <Route path="/settings/*" element={<Settings />} />
        <Route path="/rgpr-gp/*" element={<RgprGP />} />
        <Route path="/glpsl-gp/*" element={<GlpSLGP />} />

        <Route path="/tmp-pp/*" element={<TmpPP />} />
        <Route path="/1q-msi-pp/*" element={<SingleQMSIPP />} />
        <Route path="/3q-msi-pp/*" element={<ThreeQMSIPP />} />
        <Route path="/rgpr-pp/*" element={<RgprPP />} />
        <Route path="/glpsl-pp/*" element={<GlpSLPP />} />

        <Route path="/h3-pp/*" element={<H3 />} />
        <Route path="/SRDetailsLookup" element={<SRDetailsLookup />} />
        <Route path="/WO" element={<WO />} />

        <Route path="/ag-gp/*" element={<AgGP />} />
        <Route path="/ag-pp/*" element={<AgPP />} />
        <Route path="/LeLr" element={<LeLr />} />
        <Route path="/RGPR-LE-GP" element={<RgprLeGP />} />
        <Route path="/RGPR-LR-GP" element={<RgprLrGP />} />
        <Route path="/1Q-MSI-LE-GP" element={<SingleQMSILeGP />} />
        <Route path="/1Q-MSI-LR-GP" element={<SingleQMSILrGP />} />
        <Route path="/3Q-MSI-LE-GP" element={<ThreeQMSILeGP />} />
        <Route path="/3Q-MSI-LR-GP" element={<ThreeQMSILrGP />} />

        <Route path="/GLP&SL-LE-GP" element={<GlpSLLeGP />} />
        <Route path="/GLP&SL-LR-GP" element={<GlpSLLrGP />} />


        <Route path="/AG-LE-GP" element={<AgLeGP />} />
        <Route path="/AG-LR-GP" element={<AgLrGP />} />
        <Route path="/RGPR-LE-PP" element={<RgprLePP />} />
        <Route path="/RGPR-LR-PP" element={<RgprLrPP />} />
        <Route path="/1Q-MSI-LE-PP" element={<SingleQMSILePP />} />
        <Route path="/1Q-MSI-LR-PP" element={<SingleQMSILrPP />} />
        <Route path="/3Q-MSI-LE-PP" element={<ThreeQMSILePP />} />
        <Route path="/3Q-MSI-LR-PP" element={<ThreeQMSILrPP />} />
        <Route path="/GLP&SL-LE-PP" element={<GlpSLLePP />} />
        <Route path="/GLP&SL-LR-PP" element={<GlpSLLrPP />} />

        <Route path="/AG-LE-PP" element={<AgLePP />} />
        <Route path="/AG-LR-PP" element={<AgLrPP />} />
        <Route path="/more" element={<More />} />
        <Route path="/Dashboard" element={<Dashboard />} />


      </Routes>
    </Router>
  );
}

export default App;
