import axios from 'axios';
import { FilterData } from 'types/FilterData';

const baseURL = 'http://localhost:8080';

export const requestBackend = axios.create({
    baseURL
});

export const buildFilterParams = (filterData? : FilterData, extraParams? : Record<string, unknown>) => {
    return {
        store: filterData?.store,
        ...extraParams
    };
};