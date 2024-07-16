function CampoEntrada({id, label, tipo, placeholder, requerido, nome, value, onchange,
    msgValido, msgInvalido, readonly }){
    return (
        <div className="mb-3">
        <label htmlFor="txtNome" className="form-label">{label}</label>
        <input type={tipo} className="form-control" readOnly={readonly} id={id} 
        placeholder={placeholder} required={requerido} name={nome}
        value={value} onChange={onchange}/>
        <div className="valid-feedback">{msgValido}</div>
        <div className="invalid-feedback">{msgInvalido}
        </div>
    </div>    
    )
}

export default CampoEntrada;