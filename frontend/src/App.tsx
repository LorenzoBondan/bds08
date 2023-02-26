import ChartCard from 'components/ChartCard';
import Filter from 'components/Filter';
import Navbar from 'components/Navbar';
import { buildSalesByGenderChart } from 'helpers';
import { useEffect, useMemo, useState } from 'react';
import { FilterData } from 'types/FilterData';
import { PieChartConfig, SalesByGender } from 'types/SalesByGender';
import { Summary } from 'types/Summary';
import { formatPrice } from 'util/formatters';
import { buildFilterParams, requestBackend } from 'util/request';
import './App.css';
import './assets/styles/custom.scss'

function App() {

  const [filterData, setFilterData] = useState<FilterData>();

  const [salesByGender, setSalesByGender] = useState<PieChartConfig>();

  const [total, setTotal] = useState<Summary>({
    avg: 0,
    count: 0,
    max: 0,
    min: 0,
    sum: 0
  });
    
    // função do componente Filter
    const handleSubmitFilter = (filter : FilterData) => {
      setFilterData(filter);
    }

    /* gráficos pizza */

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  // gráfico de gêneros
  useEffect(() => {
    requestBackend.get<SalesByGender[]>('/sales/by-gender', {params})
      .then(response => {
        const newSalesByGender = buildSalesByGenderChart(response.data);
        setSalesByGender(newSalesByGender);
    })
    .catch(() => {
        console.log('Error to fetch sales by store');
    });
  }, [params])

  useEffect(() => {
    requestBackend.get('/sales/summary', { params }).then((response) => {
      setTotal(response.data);
    });
  }, [params]);

  return (
    <>
      <Navbar/>

      <div className="app-container">

        <Filter onSubmitFilter={handleSubmitFilter}/>

        <ChartCard 
          name='Gênero'
          labels={ 
            
            salesByGender?.labels || []}
          series={salesByGender?.series || []}
          total={formatPrice(total.sum)}
        />

      </div>
    </>
  );
}

export default App;


