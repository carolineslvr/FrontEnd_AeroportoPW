import { getToken } from '../seguranca/Autenticacao';

export const getCompanhiasAereasAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/companhiaaerea`,
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "authorization" : getToken()
            }
        });
    const data = await response.json();
    return data;
}

export const getCompanhiaAereaPorCodigoAPI = async codigo => {
    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/companhiaaerea/${codigo}`,
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "authorization" : getToken()
            }
        });
    const data = await response.json();
    return data;
}

export const deleteCompanhiaAereaAPI = async codigo => {
    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/companhiaaerea/${codigo}`,
        {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "authorization" : getToken()
            }
        });
    const data = await response.json();
    return data;
}

export const cadastraCompanhiaAereaAPI = async (objeto, metodo) => {
    const response = await fetch(
        `${process.env.REACT_APP_ENDERECO_API}/companhiaaerea`,
        {
            method : metodo,
            headers : {
                "Content-Type" : "application/json",
                "authorization" : getToken()
            },
            body : JSON.stringify(objeto)
        });
    const data = await response.json();
    return data;
}