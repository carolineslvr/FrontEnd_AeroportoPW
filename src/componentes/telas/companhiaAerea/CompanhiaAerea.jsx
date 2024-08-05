import { useState, useEffect } from "react";
import CompanhiaAereaContext from "./CompanhiaAereaContext";
import { getCompanhiasAereasAPI, getCompanhiaAereaPorCodigoAPI,cadastraCompanhiaAereaAPI,deleteCompanhiaAereaAPI } from "../../../servicos/CompanhiaAereaServico";
import TabelaCompanhiaAerea from "./TabelaCompanhiaAerea";
import FormCompanhiaAerea from "./FormCompanhiaAerea";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";
import Carregando from "../../comuns/Carregando";

function CompanhiaAerea(){

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status : "", message : ""});
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({ codigo : "", nome : "", codIATA : "", pais : ""});
    const [carregando, setCarregando] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({status : "", message : ""});
        setObjeto({
            codigo : 0, 
            nome : "",
            codIATA : "",
            pais : ""
        });
    }

    const editarObjeto = async codigo => {
        try {
            setObjeto(await getCompanhiaAereaPorCodigoAPI(codigo));
            setEditar(true);
            setAlerta({status : "", message :""});
        } catch (err) {
            window.location.reload();
            navigate("login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraCompanhiaAereaAPI(objeto, metodo);
            setAlerta({status : retornoAPI.status, message : retornoAPI.message});
            setObjeto(retornoAPI.objeto);
            if (!editar){
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("login", { replace: true });
        }
        recuperaCompanhiasAereas();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }

    const recuperaCompanhiasAereas = async () => {
        try{
            setCarregando(true);
            setListaObjetos(await getCompanhiasAereasAPI());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("login", { replace: true });
        }
       
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover esta Companhia Aérea do sistema?')){
            try {
                let retornoAPI = await deleteCompanhiaAereaAPI(codigo);
            setAlerta({ status : retornoAPI.status, message : retornoAPI.message});
            recuperaCompanhiasAereas();
            } catch (err) {
                window.location.reload();
                navigate("login", { replace: true });
            }
            
        }
    }

    useEffect(()=>{
        recuperaCompanhiasAereas();
    },[]);

    return (
        <CompanhiaAereaContext.Provider value={{
            alerta, listaObjetos, remover,
            objeto, acaoCadastrar, handleChange, novoObjeto, editarObjeto
        }}>
           <Carregando carregando={carregando}>
                <TabelaCompanhiaAerea/> 
            </Carregando>
            <FormCompanhiaAerea/>
        </CompanhiaAereaContext.Provider>
    )
}

export default WithAuth (CompanhiaAerea);