import { useContext } from "react";
import VooContext from "./VooContext";
import Alerta from "../../comuns/Alerta";
import { format } from 'date-fns';

function TabelaVoo() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } =
        useContext(VooContext);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd/MM/yyyy');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1 className="header-title">Voos</h1>
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
                                <th scope="col">Número</th>
                                <th scope="col">Origem</th>
                                <th scope="col">Destino</th>
                                <th scope="col">Data de Partida</th>
                                <th scope="col">Hora da Partida</th>
                                <th scope="col">Data de Chegada</th>
                                <th scope="col">Hora da Chegada</th>
                                <th scope="col">Companhia Aérea</th>
                                <th scope="col">Piloto</th>
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
                                        <td>{objeto.numeroVoo}</td>
                                        <td>{objeto.origem}</td>
                                        <td>{objeto.destino}</td>
                                        <td>{formatDate(objeto.dataPartida)}</td>
                                        <td>{objeto.horaPartida}</td>
                                        <td>{formatDate(objeto.dataChegada)}</td>
                                        <td>{objeto.horaChegada}</td>
                                        <td>{objeto.companhiaAerea_nome}</td>
                                        <td>{objeto.piloto_nome}</td>
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

export default TabelaVoo;