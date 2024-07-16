import { useState, useEffect } from "react";
import VooContext from "./VooContext";
import { getVooPorCodigoAPI, getVoosAPI, cadastraVooAPI, deleteVooAPI } from "../../../servicos/VooServico";
import { getCompanhiasAereasAPI } from "../../../servicos/CompanhiaAereaServico";
import {getPilotosAPI} from "../../../servicos/PilotoServico";
import TabelaVoo from "./TabelaVoo";
import FormVoo from "./FormVoo";
import { format, parse, isValid } from 'date-fns';
import Carregando from "../../comuns/Carregando";

function Voo(){

    const [alerta, setAlerta] = useState({ status : "", message : ""});
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [listaCompanhiasAereas, setListaCompanhiasAereas] = useState([]);
    const [listaPilotos, setListaPilotos] = useState([]);
    const [objeto, setObjeto] = useState({ codigo : "", numeroVoo : "", origem : "", destino : "",
        dataPartida : "", horaPartida : "", dataChegada : "", horaChegada : "", companhiaAerea : "", piloto : ""});
    const [displayDatePartida, setDisplayDatePartida] = useState("");
    const [displayDateChegada, setDisplayDateChegada] = useState("");
    const [carregando, setCarregando] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({status : "", message : ""});
        setObjeto({
            codigo : 0, 
            numeroVoo : "", 
            origem : "", 
            destino : "",
            dataPartida : "", 
            horaPartida : "", 
            dataChegada : "", 
            horaChegada : "", 
            companhiaAerea : "", 
            piloto : ""
        });
        setDisplayDatePartida("");
        setDisplayDateChegada("");
    }

    const editarObjeto = async codigo => {
        const voo = await getVooPorCodigoAPI(codigo);
        setObjeto(voo);
        setDisplayDatePartida(voo.dataPartida ? format(new Date(voo.dataPartida), 'dd/MM/yyyy') : "");
        setDisplayDateChegada(voo.dataChegada ? format(new Date(voo.dataChegada), 'dd/MM/yyyy') : "");
        setEditar(true);
        setAlerta({status : "", message :""});
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraVooAPI(objeto, metodo);
            setAlerta({status : retornoAPI.status, message : retornoAPI.message});
            setObjeto(retornoAPI.objeto);
            setDisplayDatePartida(retornoAPI.objeto.dataPartida ? format(new Date(retornoAPI.objeto.dataPartida), 'dd/MM/yyyy') : "");
            setDisplayDateChegada(retornoAPI.objeto.dataChegada ? format(new Date(retornoAPI.objeto.dataChegada), 'dd/MM/yyyy') : "");
            if (!editar){
                setEditar(true);
            }
        } catch (err) {
            console.log(err);
        }
        recuperaVoos();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'dataPartida') {
            setDisplayDatePartida(value);
            const date = parse(value, 'dd/MM/yyyy', new Date());
            if (isValid(date)) {
                setObjeto({
                    ...objeto,
                    [name]: format(date, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx')
                });
            } else {
                setObjeto({
                    ...objeto,
                    [name]: ""
                });
            }
        } else if (name === 'dataChegada') {
            setDisplayDateChegada(value);
            const date = parse(value, 'dd/MM/yyyy', new Date());
            if (isValid(date)) {
                setObjeto({
                    ...objeto,
                    [name]: format(date, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx')
                });
            } else {
                setObjeto({
                    ...objeto,
                    [name]: ""
                });
            }
        } else {
            setObjeto({
                ...objeto,
                [name]: value
            });
        }
    };

    const recuperaCompanhiasAereas = async () => {
        setListaCompanhiasAereas(await getCompanhiasAereasAPI());
    }

    const recuperaPilotos = async () => {
        setListaPilotos(await getPilotosAPI());
    }

    const recuperaVoos = async () => {
        setCarregando(true);
        setListaObjetos(await getVoosAPI());
        setCarregando(false);
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este voo do sistema?')){
            let retornoAPI = await deleteVooAPI(codigo);
            setAlerta({ status : retornoAPI.status, message : retornoAPI.message});
            recuperaVoos();
        }
    }

    useEffect(()=>{
        recuperaCompanhiasAereas();
        recuperaPilotos();
        recuperaVoos();
    },[]);

    return (
        <VooContext.Provider value={{
            alerta, listaObjetos, remover,
            objeto, displayDatePartida, displayDateChegada, acaoCadastrar, handleChange, novoObjeto, 
            editarObjeto, listaCompanhiasAereas, listaPilotos
        }}>
            <Carregando carregando={carregando}>
                <TabelaVoo/> 
            </Carregando>
            <FormVoo/>
        </VooContext.Provider>
    )
}

export default Voo;
