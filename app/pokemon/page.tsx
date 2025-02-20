"use client";

import { useState } from "react";
import { useGetPokemonByNameQuery } from "../services/pokemons";

interface PokemonCardProps {
    name: string;
    pollingInterval: number;
}
const pokemonList = ['bulbasaur', 'pikachu', 'ditto'];

const PokemonCard = ({ name, pollingInterval }: PokemonCardProps) => {
    const { data, error, isLoading } = useGetPokemonByNameQuery(name, {
        pollingInterval: pollingInterval,
    });

    return (
        <div>
            {error ? (
                <>Oh no, there was an error</>
            ) : isLoading ? (
                <>Loading...</>
            ) : data ? (
                <>
                    <h3>{data.species.name}</h3>
                    <img src={data.sprites.front_shiny} alt={data.species.name} />
                </>
            ) : null}
        </div>
    );
};

export default function Pokemon() {
    const [pollingInterval, setPollingInterval] = useState(0);

    return (
        <>
            <div className="container mx-auto p-6 font-sans">
                <select
                    onChange={(change) => setPollingInterval(Number(change.target.value))}
                >
                    <option value={0}>Off</option>
                    <option value={1000}>1s</option>
                    <option value={5000}>5s</option>
                </select>
                <div>
                    {pokemonList.map((poke, index) => (
                        <PokemonCard key={index} name={poke} pollingInterval={pollingInterval} />
                    ))}
                </div>
            </div>
        </>
    );
}
