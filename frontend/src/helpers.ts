import { SalesByGender } from "types/SalesByGender";

export const buildSalesByGenderChart = (sales : SalesByGender[]) => {
    const labels = sales.map(sale => sale.gender);
    const series = sales.map(sale => sale.sum);

    return {
        labels, 
        series
    };
};