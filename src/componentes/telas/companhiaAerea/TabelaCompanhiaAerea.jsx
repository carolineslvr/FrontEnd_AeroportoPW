import { useContext } from "react";
import CompanhiaAereaContext from "./CompanhiaAereaContext";
import Alerta from "../../comuns/Alerta";

function TabelaCompanhiaAerea() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } =
        useContext(CompanhiaAereaContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1 className="header-title">Companhias Aéreas</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary"
            data-bs-toggle="modal" data-bs-target="#modalEdicao"
            onClick={ () =>  novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </button>
            {listaObjetos.length === 0 &&
                <h1>Nenhum registro encontrado</h1>}
            {listaObjetos.length > 0 &&
                <div className="table-responsive table-background">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" style={{
                                    textAlign: 'center'
                                }}>Ações</th>
                                <th scope="col">Código</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Código IATA</th>
                                <th scope="col">País</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaObjetos.map(objeto => (
                                    <tr key={objeto.codigo}>
                                        <td align="center">
                                            <button className="btn btn-warning" title="Editar"
                                            data-bs-toggle="modal" 
                                            data-bs-target="#modalEdicao"
                                            onClick={ () =>  editarObjeto(objeto.codigo)}>
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button className="btn btn-danger" title="Remover"
                                                onClick={() => { remover(objeto.codigo) }}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                        <th scope="row">{objeto.codigo}</th>
                                        <td>{objeto.nome}</td>
                                        <td>{objeto.codIATA}</td>
                                        <td>{objeto.pais}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )

}

export default TabelaCompanhiaAerea;