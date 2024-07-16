import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import CompanhiaAereaContext from "./CompanhiaAereaContext";

function FormCompanhiaAerea() {
    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(CompanhiaAereaContext);

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
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Companhia Aérea</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar} className="needs-validation" noValidate>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="txtCodigo" className="form-label">Código</label>
                                <input type="number" className="form-control" id="txtCodigo" readOnly name="codigo" value={objeto?.codigo || ''} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtNome" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="txtNome" maxLength="40" placeholder="Informe o nome" required name="nome" value={objeto?.nome || ''} onChange={handleChange} />
                                <div className="valid-feedback"></div>
                                <div className="invalid-feedback">Informe o nome</div>                            
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtCodIATA" className="form-label">Código IATA</label>
                                <input type="text" className="form-control" id="txtCodIATA" maxLength="2" placeholder="Informe o código IATA" required name="codIATA" value={objeto?.codIATA || ''} onChange={handleChange} />
                                <div className="valid-feedback"></div>
                                <div className="invalid-feedback">Informe o Código IATA</div>
                            </div> 
                            <div className="mb-3">
                                <label htmlFor="txtPais" className="form-label">País</label>
                                <input type="text" className="form-control" id="txtPais" maxLength="40" placeholder="Informe o país" required name="pais" value={objeto?.pais || ''} onChange={handleChange} />
                                <div className="valid-feedback"></div>
                                <div className="invalid-feedback">Informe o país</div>
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

export default FormCompanhiaAerea;