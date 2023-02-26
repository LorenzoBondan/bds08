
import ReactApexChart from 'react-apexcharts';
import { buildPieChartConfig } from './helpers';
import './styles.css';

type Props = {
    labels : string[];
    name : string;
    series : number[];
    total: string;
}

const ChartCard = ( {labels, name, series, total} : Props) => {
    return(
        <div className='base-card chart-card-container'>

            <div className='chart-card-content-container'>
                <h2>{total}</h2>
                <p>Total de vendas</p>
            </div>

            <div className='chart-card-chart-container'>
                <ReactApexChart 
                    options={buildPieChartConfig(labels, name)}
                    type="donut"
                    width="300"
                    height={350}
                    series={series}
                />
            </div>
        </div>
    );
}

export default ChartCard;