const handleHttpError = (res, message = "algo sucedio", code = 403) =>{
    res.status(code);
    res.send({error: message});
}; 
/**
 * Handle error specify
 * @param {*} res
 * @param {*} message
 * @param {*} code
 */
const handleErrorResponse = (res, message = "Algo ocurrio", code = 401) => {
    console.log("Error", message);
    res.status(code);
    res.send({ error: message });
  };
  

module.exports = {handleHttpError,handleErrorResponse};
