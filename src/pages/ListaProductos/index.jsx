import React from 'react';
import axios from 'axios';
import Categorias from '../Categorias';
import ListaItemProducto from '../ListaItemProducto';
import "./styles.scss";

export default class ListaProductos extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], categories: {} };
    }

    componentDidMount() {
        this.loadProductsFromServer();
    }

    loadProductsFromServer() {

        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        const queryParam = params.q;

        axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${queryParam}&&limit=4`)
            .then((res) => {
                this.setState({
                    items: res.data.results,
                    categories: res.data.filters[0].values[0]
                    
                });
            });
    }

    render() {
        return (
            <section className="andes-card">
                {this.state.categories.path_from_root ? (
                    <Categorias
                        categories={this.state.categories.path_from_root}
                    />
                ) : ''}
                <section className="item-results">
                    {this.state.items.map(item => (
                        <ListaItemProducto key={item.id} item={item} />
                    ))}
                    {(this.state.items.length === 0)}
                </section>
            </section>
        );
    }
}