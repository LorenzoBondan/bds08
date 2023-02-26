
import ReactApexChart from 'react-apexcharts';
import { buildPieChartConfig } from './helpers';
import './styles.css';

type Props = {
    labels : string[];
    name : string;
    series : number[];
}

const ChartCard = ( {labels, name, series} : Props) => {
    return(
        <div className='base-card chart-card-container'>

            <div className='chart-card-content-container'>
                <h2>R$ 746.484,00</h2>
                <p>Total de vendas</p>
            </div>

            <div className='chart-card-chart-container'>
                <ReactApexChart 
                    options={buildPieChartConfig(labels, name)}
                    type="donut"
                    width="400"
                    height={400}
                    series={series}
                />
            </div>
        </div>
    );
}

export default ChartCard;