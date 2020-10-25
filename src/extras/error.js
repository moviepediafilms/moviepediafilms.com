export default (error) => {
    if (!error)
        return "Unknown error occured!"
    if (error.response && error.response.data && error.response.data.detail)
        return error.response.data.detail;
    if (error.response && error.response.data && error.response.data.non_field_errors)
        return error.response.data.non_field_errors[0];
    console.log(error.toJSON())
    var message = error.toJSON().message;
    if (message === "Network Error")
        message = "Unable to reach server!"
    if (message === "Request failed with status code 500")
        message = "We failed to process that request!"
    return message
}