import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import ComingSoon from './pages/ComingSoon';
import './styles/index.css';
const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <ComingSoon />
    </I18nextProvider>
  );
};

export default App;
