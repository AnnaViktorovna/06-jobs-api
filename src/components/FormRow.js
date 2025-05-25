const FormRow = ({ type, name, value, handleChange, children }) => {
    return (
        <div className='form-row'>
            {children || (
                <>
                    <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
                    <input
                        type={type}
                        name={name}
                        id={name}
                        value={value}
                        onChange={handleChange}
                    />
                </>
            )}
        </div>
    );
};

export default FormRow;
