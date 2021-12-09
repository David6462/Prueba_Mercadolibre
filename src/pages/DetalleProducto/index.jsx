import React, { useState } from 'react';
import axios from 'axios';
import Categorias from '../Categorias';
import { useParams } from 'react-router';
import { useEffect } from "react";

import "./styles.scss";

export default function DetalleProducto() {
    const { id } = useParams();
    const [state, setState] = useState({});
    const [category, setCategory] = useState({});
    const [description, setDescription] = useState({});

    useEffect(async() => {
        const result = await axios(`https://api.mercadolibre.com/items/${id}`);
        setState({
            categoria_id: result.data.category_id,
            imagen: result.data.pictures[0].secure_url,
            condicion: result.data.condition,
            cant_vendidas: result.data.sold_quantity,
            titulo: result.data.title,
            precio: result.data.price,
        });

        const categoria = await axios(`https://api.mercadolibre.com/categories/${result.data.category_id}`);
        setCategory({ categoria: categoria.data.path_from_root });

        const descripcion = await axios(`https://api.mercadolibre.com/items/${id}/description`);
        setDescription({ description: descripcion.data.plain_text });

    }, []);

    return (
        <section>
            <div className="body-content">
                <section>
                    { category.categoria ? (
                        <Categorias
                            categories={category.categoria}
                        />
                    ) : ''}
                </section>
                <section className="product-body">
                    <div className="product-image">
                        <img
                            src={state.imagen}
                            alt="Imagen del Producto"
                        />
                    </div>
                    <div className="product-resume">
                        <div>
                            <small className="product-usage">
                                {state.condicion === 'new'
                                    ? 'Nuevo'
                                    : 'Usado'}
                                <span>&nbsp;-&nbsp;</span>
                                {state.cant_vendidas} vendidos
                                {' '}
                            </small>
                        </div>
                        <p className="product-title">
                            {state.titulo}
                        </p>
                        <h2 className="product-resume__h2">
                            <span>${state.precio}</span>
                        </h2>
                        <button type="button" className="product-resume__button">
                            Comprar
                        </button>
                    </div>
                </section>
            </div>
            <div>
                <div className="product-description">
                    <h3 className="description__h3">Descripción del producto</h3>
                    <p className="description__p">
                        {description.description}
                    </p>
                </div>
            </div>
        </section>
    );
}
