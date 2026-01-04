import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import './styles/index.css';

import { Dropdown, Ripple, initTWE, Collapse, Modal } from 'tw-elements';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ComingSoon from './pages/ComingSoon';
import Invoices from './pages/Invoices';
import fakePdf from './sample-invoice.pdf';
const App: React.FC = () => {
  useEffect(() => {
    initTWE({ Dropdown, Ripple, Collapse, Modal });
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <Routes>
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/" element={<Invoices fileUrl={fakePdf} />} />
      </Routes>
    </I18nextProvider>
  );
};

export default App;
