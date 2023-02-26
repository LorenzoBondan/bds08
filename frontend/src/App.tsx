import Filter, { SalesFilterData } from 'components/Filter';
import Navbar from 'components/Navbar';
import { useState } from 'react';
import './App.css';
import './assets/styles/custom.scss'

type ControlComponentsData = {
  filterData: SalesFilterData;
}

function App() {
    //manter o estado de todos os componentes que fazem a listagem
    const [controlComponentsData, setControlComponentsData] = useState<ControlComponentsData>({filterData: { store: null },});
    
    // função do componente Filter
    const handleSubmitFilter = (data : SalesFilterData) => {
      setControlComponentsData({filterData: data});
    }

  return (
    <>
      <Navbar/>

      <div className="app-container">
        <Filter onSubmitFilter={handleSubmitFilter}/>
      </div>
    </>
  );
}

export default App;
