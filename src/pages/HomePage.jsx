import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { List } from '../components/List';
import { Card } from '../components/Card';
import { Controls } from '../components/Controls';
import {
    selectAllCountries,
    selectCountriesInfo,
} from '../store/coutries/countries-selector';
import { loadCountries } from '../store/coutries/countries-actions';

export const HomePage = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const countries = useSelector(selectAllCountries);
    const { status, error, qty } = useSelector(selectCountriesInfo);

    useEffect(() => {
        if (!qty) {
            dispatch(loadCountries());
        }
    }, [qty, dispatch]);

    return (
        <>
            <Controls />

            {error && <h2>Can't fetch data</h2>}
            {status === 'loading' && <h2> Loading...</h2>}
            {status === 'received' && (
                <List>
                    {countries.map((item) => {
                        const countryInfo = {
                            img: item.flags.png,
                            name: item.name,
                            info: [
                                {
                                    title: 'Population',
                                    description:
                                        item.population.toLocaleString(),
                                },
                                {
                                    title: 'Region',
                                    description: item.region,
                                },
                                {
                                    title: 'Capital',
                                    description: item.capital,
                                },
                            ],
                        };
                        return (
                            <Card
                                key={item.name}
                                onClick={() =>
                                    navigate(`/country/${item.name}`)
                                }
                                {...countryInfo}
                            />
                        );
                    })}
                </List>
            )}
        </>
    );
};
