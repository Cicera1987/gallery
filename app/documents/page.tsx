export default function Documentos() {
    return (
        <>
            <section className="container mx-auto p-6 bg-gray-400 font-sans rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Redux RTK Query e suas Aplicações
                </h1>
                <article className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2 text-gray-700">O que é RTK Query?</h2>
                    <p className="text-gray-600 mb-4">
                        O <strong>RTK Query</strong> é uma biblioteca integrada ao Redux Toolkit que facilita o gerenciamento de dados assíncronos e chamadas de API no Redux. Ele reduz a necessidade de configuração manual de **reducers, actions e thunks**, tornando o código mais limpo e eficiente.
                    </p>

                    <h2 className="text-xl font-semibold mb-2 text-gray-700">Principais Benefícios</h2>
                    <ul className="list-disc list-inside text-gray-600 mb-4">
                        <li>Reduz código repetitivo para requisições assíncronas.</li>
                        <li>Gerencia automaticamente o cache e refetch de dados.</li>
                        <li>Fornece um sistema otimizado de invalidação de cache.</li>
                        <li>Suporte integrado para polling e WebSockets.</li>
                    </ul>

                    <h2 className="text-xl font-semibold mb-2 text-gray-700">Exemplo de Uso</h2>
                    <pre className="bg-gray-200 p-3 rounded-md text-sm text-gray-800 overflow-auto">
                        {`import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.example.com' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
  }),
});

export const { useGetProductsQuery } = apiSlice;`}
                    </pre>
                </article>
            </section>
        </>
    );
}
