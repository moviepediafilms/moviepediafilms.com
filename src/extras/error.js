export default (error) => {
    if (!error)
        return "Unknown error occurred!"
    if (error.response) {
        if (error.response.data) {
            if (error.response.data.detail)
                return error.response.data.detail;
            if (error.response.data.non_field_errors)
                return error.response.data.non_field_errors[0];
            if (error.response.data.errors)
                return error.response.data.errors[0];
            if (error.response.data.error)
                return error.response.data.error;
        }
    }
    console.log(error.toJSON())
    var message = error.toJSON().message;
    if (message === "Network Error")
        message = "Unable to reach server!"
    if (message === "Request failed with status code 500")
        message = "We failed to process that request!"
    return message
}