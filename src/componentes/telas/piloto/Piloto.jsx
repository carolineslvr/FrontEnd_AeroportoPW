import { useState, useEffect } from "react";
import PilotoContext from "./PilotoContext";
import { getPilotoPorCodigoAPI, getPilotosAPI, cadastraPilotoAPI, deletePilotoAPI } from "../../../servicos/PilotoServico";
import TabelaPiloto from "./TabelaPiloto";
import FormPiloto from "./FormPiloto";
import { format, parse, isValid } from 'date-fns';
import Carregando from "../../comuns/Carregando";

function Piloto(){

    const [alerta, setAlerta] = useState({ status : "", message : ""});
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({ codigo : "", nome : "", numeroLicenca : "", tipoLicenca : "", dataNascimento : "", anosExperiencia : ""});
    const [displayDate, setDisplayDate] = useState("");
    const [carregando, setCarregando] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({status : "", message : ""});
        setObjeto({
            codigo : 0, 
            nome : "",
            numeroLicenca : "",
            tipoLicenca : "",
            dataNascimento : "",
            anosExperiencia : ""
        });
        setDisplayDate("");
    }

    const editarObjeto = async codigo => {
        const piloto = await getPilotoPorCodigoAPI(codigo);
        setObjeto(piloto);
        setDisplayDate(piloto.dataNascimento ? format(new Date(piloto.dataNascimento), 'dd/MM/yyyy') : "");
        setEditar(true);
        setAlerta({status : "", message :""});
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraPilotoAPI(objeto, metodo);
            setAlerta({status : retornoAPI.status, message : retornoAPI.message});
            setObjeto(retornoAPI.objeto);
            setDisplayDate(retornoAPI.objeto.dataNascimento ? format(new Date(retornoAPI.objeto.dataNascimento), 'dd/MM/yyyy') : "");
            if (!editar){
                setEditar(true);
            }
        } catch (err) {
            console.log(err);
        }
        recuperaPilotos();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'dataNascimento') {
            setDisplayDate(value);
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

    const recuperaPilotos = async () => {
        setCarregando(true);
        setListaObjetos(await getPilotosAPI());
        setCarregando(false);
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este piloto do sistema?')){
            let retornoAPI = await deletePilotoAPI(codigo);
            setAlerta({ status : retornoAPI.status, message : retornoAPI.message});
            recuperaPilotos();
        }
    }

    useEffect(()=>{
        recuperaPilotos();
    },[]);

    return (
        <PilotoContext.Provider value={{
            alerta, listaObjetos, remover,
            objeto, displayDate, acaoCadastrar, handleChange, novoObjeto, editarObjeto
        }}>
            <Carregando carregando={carregando}>
                <TabelaPiloto/> 
            </Carregando>
            <FormPiloto/>
        </PilotoContext.Provider>


    )
}

export default Piloto;
