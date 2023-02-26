
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Store } from 'types/Store';
import { requestBackend } from 'util/request';
import './styles.css';

export type SalesFilterData = {
    store: Store | null;
}

type Props = {
    onSubmitFilter : (data: SalesFilterData) => void;
}

const Filter = ( {onSubmitFilter} : Props) => {

    const { handleSubmit, control, setValue, getValues } = useForm<SalesFilterData>();

    const [selectStore, setSelectStore] = useState<Store[]>();

    //trazer os stores pra povoar o combobox
    useEffect(() => {
        requestBackend({url: '/stores', params: {page: 0, size: 50, },})
            .then(response => {
                setSelectStore(response.data)
            })
    }, []);

    const handleChangeStore = (value: Store) => {
        setValue('store', value);

        const obj : SalesFilterData = {
            store: getValues('store'), 
        };

        onSubmitFilter(obj);
    }

    const onSubmit = (formData : SalesFilterData) => {
        onSubmitFilter(formData);
    };
    
    return(
        <div className="filter-container base-card">
            <form onSubmit={handleSubmit(onSubmit)} className='store-filter-form'>
                <div className='store-filter-container text-secondary' style={{fontSize:"20px"}}>
                    <Controller 
                        name = 'store'
                        control = {control}
                        render = {( {field} ) => (
                        <Select 
                            {...field}
                            options={selectStore?.sort()}
                            isClearable
                            classNamePrefix="store-filter-select"
                            placeholder="Loja"
                            getOptionLabel={(store: Store) => store.name}
                            getOptionValue={(store: Store) => store.id.toString()}

                            onChange={value => handleChangeStore(value as Store)}
                        />    
                        )}
                    />
                </div>
            </form>
        </div>
    );
}

export default Filter;