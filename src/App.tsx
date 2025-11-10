import './index.css';
import { PatientList } from './components/PatientList';
import { ActionsBar } from './components/ActionsBar';

function App() {
  return (
    <div className="container mx-auto px-4 py-6">
      <ActionsBar />
      <PatientList />
    </div>
  );
}

export default App;
