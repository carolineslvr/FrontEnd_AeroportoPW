import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import VooContext from "./VooContext";
import InputMask from 'react-input-mask';

function FormVoo() {
    const { objeto, displayDatePartida, displayDateChegada, handleChange, acaoCadastrar, alerta, listaCompanhiasAereas, listaPilotos } = useContext(VooContext);

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

    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Voo</h1>
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
                                <label htmlFor="txtNome" className="form-label">Número do Voo</label>
                                <input type="text" className="form-control" id="txtNumeroVoo" maxLength="10" placeholder="Informe o número do voo" required name="numeroVoo" value={objeto?.numeroVoo || ''} onChange={handleChange} />
                                <div className="valid-feedback"></div>
                                <div className="invalid-feedback">Informe o número do voo</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtNome" className="form-label">Origem</label>
                                <input type="text" className="form-control" id="txtOrigem" maxLength="100" placeholder="Informe a origem do voo" required name="origem" value={objeto?.origem || ''} onChange={handleChange} />
                                <div className="valid-feedback"></div>
                                <div className="invalid-feedback">Informe o local de origem</div>
                            </div> 
                            <div className="mb-3">
                                <label htmlFor="txtNome" className="form-label">Destino</label>
                                <input type="text" className="form-control" id="txtDestino" maxLength="100" placeholder="Informe o destino do voo" required name="destino" value={objeto?.destino || ''} onChange={handleChange} />
                                <div className="valid-feedback"></div>
                                <div className="invalid-feedback">Informe o local de destino</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtDataPartida" className="form-label">Data de Partida</label>
                                <InputMask mask="99/99/9999" className="form-control" id="txtDataPartida" placeholder="Informe a data de partida" required name="dataPartida" value={displayDatePartida} onChange={handleChange} />
                                <div className="valid-feedback"></div>
                                <div className="invalid-feedback">Informe a data de partida</div>
                            </div> 
                            <div className="mb-3">
                                <label htmlFor="txtHoraPartida" className="form-label">Hora de Partida</label>
                                <InputMask mask="99:99" className="form-control" id="txtHoraPartida" placeholder="Informe a hora da partida" required name="horaPartida" value={objeto?.horaPartida || ''} onChange={handleChange} />
                                <div className="valid-feedback"></div>
                                <div className="invalid-feedback">Informe a hora de partida</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtDataChegada" className="form-label">Data de Chegada</label>
                                <InputMask mask="99/99/9999" className="form-control" id="txtDataChegada" placeholder="Informe a data de chegada" required name="dataChegada" value={displayDateChegada} onChange={handleChange} />
                                <div className="valid-feedback"></div>
                                <div className="invalid-feedback">Informe a data de chegada</div>
                            </div> 
                            <div className="mb-3">
                                <label htmlFor="txtHoraChegada" className="form-label">Hora de Chegada</label>
                                <InputMask mask="99:99" className="form-control" id="txtHoraChegada" placeholder="Informe a hora da chegada" required name="horaChegada" value={objeto?.horaChegada || ''} onChange={handleChange} />
                                <div className="valid-feedback"></div>
                                <div className="invalid-feedback">Informe a hora de chegada</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="selectCompanhiaAerea" className="form-label">Companhia Aérea</label>
                                <select className="form-select" id="selectCompanhiaAerea" required name="companhiaAerea" value={objeto?.companhiaAerea || ''} onChange={handleChange}>
                                    <option value="">Selecione a companhia aérea</option>
                                    {listaCompanhiasAereas.map((ciaAerea) => (
                                        <option key={ciaAerea.codigo} value={ciaAerea.codigo}>{ciaAerea.nome}</option>
                                    ))}
                                </select>
                                <div className="valid-feedback"></div>
                                <div className="invalid-feedback">Informe a companhia aérea</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="selectPiloto" className="form-label">Piloto</label>
                                <select className="form-select" id="selectPiloto" required name="piloto" value={objeto.piloto} onChange={handleChange}>
                                    <option value="">Selecione o piloto</option>
                                    {listaPilotos.map((piloto) => (
                                        <option key={piloto.codigo} value={piloto.codigo}>{piloto.nome}</option>
                                    ))}
                                </select>
                                <div className="valid-feedback"></div>
                                <div className="invalid-feedback">Informe o piloto</div>
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

export default FormVoo;
