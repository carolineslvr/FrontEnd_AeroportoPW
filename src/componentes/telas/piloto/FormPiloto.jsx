import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import PilotoContext from "./PilotoContext";
import InputMask from 'react-input-mask';

function FormPiloto() {
    const { objeto, displayDate, handleChange, acaoCadastrar, alerta } = useContext(PilotoContext);

    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
          form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }

            form.classList.add('was-validated')
          }, false)
        })
    })()

    // Define as opções reais para o campo select
    const tiposLicenca = [
        { value: 'PPLA', label: 'PPLA - Piloto Privado' },
        { value: 'CPLA', label: 'CPLA - Piloto Comercial' },
        { value: 'ATPLA', label: 'ATPLA - Piloto de Linha Aérea' },
        { value: 'PPLH', label: 'PPLH - Piloto Privado de Helicóptero' },
        { value: 'CPLH', label: 'CPLH - Piloto Comercial de Helicóptero' },
        { value: 'ATPLH', label: 'ATPLH - Piloto de Linha Aérea de Helicóptero' },
        { value: 'IFR', label: 'IFR - Voo por Instrumentos' },
    ];

    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Piloto</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar} className="needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="mb-3">
                                <label htmlFor="txtCodigo" className="form-label">Código</label>
                                <input type="number" className="form-control" id="txtCodigo" readOnly name="codigo" value={objeto?.codigo || ''} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtNome" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="txtNome" placeholder="Informe o nome" required name="nome" value={objeto?.nome || ''} onChange={handleChange} />
                                <div className="valid-feedback"></div>
                                <div className="invalid-feedback">Informe o nome</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtNumeroLicenca" className="form-label">Número da Licença</label>
                                <input type="text" className="form-control" id="txtNumeroLicenca" placeholder="Informe o número da licença" required name="numeroLicenca" value={objeto?.numeroLicenca || ''} onChange={handleChange} />
                                <div className="valid-feedback">Nome ok</div>
                                <div className="invalid-feedback">Informe o número da Licença</div>
                            </div>    
                            <div className="mb-3">
                                <label htmlFor="selectTipoLicenca" className="form-label">Tipo da Licença</label>
                                <select className="form-select" id="selectTipoLicenca" required name="tipoLicenca" value={objeto?.tipoLicenca || ''} onChange={handleChange}>
                                    <option value="">Selecione o tipo de licença</option>
                                    {tiposLicenca.map((tipo) => (
                                        <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                                    ))}
                                </select>
                                <div className="valid-feedback"></div>
                                <div className="invalid-feedback">Informe o tipo da Licença</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtDataNascimento" className="form-label">Data de Nascimento</label>
                                <InputMask 
                                    mask="99/99/9999" 
                                    className="form-control" 
                                    id="txtDataNascimento" 
                                    placeholder="Informe a data de nascimento" 
                                    required 
                                    name="dataNascimento" 
                                    value={displayDate} 
                                    onChange={handleChange} 
                                />
                                  <div className="valid-feedback"></div>
                                  <div className="invalid-feedback">Informe a data de nascimento</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtAnosExperiencia" className="form-label">Anos de Experiência</label>
                                <input type="text" className="form-control" id="txtAnosExperiencia" placeholder="Informe os anos de experiência" required name="anosExperiencia" value={objeto?.anosExperiencia || ''} onChange={handleChange} />
                                <div className="valid-feedback"></div>
                                <div className="invalid-feedback">Informe os anos de experiência</div>
                            </div>                           
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-success">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormPiloto;
