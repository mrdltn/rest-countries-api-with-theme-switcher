import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { List } from '../components/List';
import { Card } from '../components/Card';
import { Controls } from '../components/Controls';
import {
    selectCountriesInfo,
    selectVisibleCountries,
} from '../store/coutries/countries-selectors';
import { loadCountries } from '../store/coutries/countries-actions';
import { selectControls } from '../store/controls/controls-selectors';

export const HomePage = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {search, region} = useSelector(selectControls);
    const countries = useSelector(state => selectVisibleCountries(state, {
        search, region
    }));
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
