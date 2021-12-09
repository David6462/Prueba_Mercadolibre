import { Route, Routes } from "react-router-dom";
import React from 'react';
import Home from '../pages/Home'
import BarraBusqueda from "../pages/BarraBusqueda";
import ListaProductos from "../pages/ListaProductos";
import DetalleProducto from "../pages/DetalleProducto";
import "../styles/app.scss";

export default function Switch() {
    return (
        <React.Fragment>
            <BarraBusqueda />
            <section className="meli-centered">
                <Routes>
                    <Route path="/items/:id"  element={<DetalleProducto />} />
                    <Route path="/items" element={<ListaProductos />} />
                    {/* <Route path="/not-found" component={NotFound} /> */}
                    <Route path="/" element={<Home />} />
                    {/* <Route component={NoPage} /> */}
                </Routes>
            </section>
        </React.Fragment>
    )
};