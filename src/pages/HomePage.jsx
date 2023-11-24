import { useNavigate } from 'react-router-dom';

import { List } from '../components/List';
import { Card } from '../components/Card';
import { Controls } from '../components/Controls';

export const HomePage = () => {
    const navigate = useNavigate();
    const countries = [];

    return (
        <>
            <Controls />
            <List>
                {countries.map((item) => {
                    const countryInfo = {
                        img: item.flags.png,
                        name: item.name,
                        info: [
                            {
                                title: 'Population',
                                description: item.population.toLocaleString(),
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
                            onClick={() => navigate(`/country/${item.name}`)}
                            {...countryInfo}
                        />
                    );
                })}
            </List>
        </>
    );
};
