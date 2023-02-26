import ChartCard from 'components/ChartCard';
import Filter, { SalesFilterData } from 'components/Filter';
import Navbar from 'components/Navbar';
import { buildSalesByGenreChart } from 'helpers';
import { useEffect, useMemo, useState } from 'react';
import { FilterData } from 'types/FilterData';
import { PieChartConfig, SalesByGender } from 'types/SalesByGender';
import { buildFilterParams, requestBackend } from 'util/request';
import './App.css';
import './assets/styles/custom.scss'

type ControlComponentsData = {
  filterData: SalesFilterData;
}

function App() {

  const [filterData, setFilterData] = useState<FilterData>();

  const [salesByGender, setSalesByGender] = useState<PieChartConfig>();

    //manter o estado de todos os componentes que fazem a listagem
    const [controlComponentsData, setControlComponentsData] = useState<ControlComponentsData>({filterData: { store: null },});
    
    // função do componente Filter
    const handleSubmitFilter = (data : SalesFilterData) => {
      setControlComponentsData({filterData: data});
    }

    /* gráficos pizza */

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  // gráfico de gêneros
  useEffect(() => {
    requestBackend
      .get<SalesByGender[]>('/sales/by-gender', {params})
      .then(response => {
        const newSalesByGender = buildSalesByGenreChart(response.data);
        setSalesByGender(newSalesByGender);

    })
    .catch(() => {
        console.log('Error to fetch sales by store');
    });
  }, [params])

  return (
    <>
      <Navbar/>

      <div className="app-container">
        <Filter onSubmitFilter={handleSubmitFilter}/>
        <ChartCard 
          name='Gênero'
          labels={salesByGender?.labels || []}
          series={salesByGender?.series || []}
        />
      </div>
    </>
  );
}

export default App;


