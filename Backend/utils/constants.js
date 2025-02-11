module.exports = {
    SERVER_LOGS:{
        MONGO_CONNECTED: "🟢 Connected to MongoDB",
        MONGO_ERROR: "🔴 Error connecting to MongoDB",
        INFO_SERVER_RUNNING: "🚀 Server running in port: ",
    },
    ROLES:{
        ADMIN: "Admin",
        USER: "User"
    },
    AUTH_MESSAGES: {
        ERROR_401: "Access denied. There is no token or it has expired",
        ERROR_403: "Access denied",
    },
    USER_MESSAGES: {
        SUCCESS_200: "Successful operation",
        SUCCESS_201: "User created successfully",
        SUCCESS_204: "Successfully deleted user",
        ERROR_400: "Incorrect input data",
        ERROR_401: "Invalid credentials",
        ERROR_404: "User not found",
        ERROR_409: "There is already a user with that email",
        ERROR_500: "Error processing request",
    },
    CATEGORY_MESSAGES:{
        SUCCESS_200: "Successful operation",
        SUCCESS_201: "Category created successfully",
        SUCCESS_204: "Category successfully deleted",
        ERROR_400: "Incorrect input data",
        ERROR_401: "Invalid credentials",
        ERROR_404: "Category not found",
        ERROR_409: "There is already a category with that name",
        ERROR_500: "Error processing request",
    },
    PRODUCT_MESSAGES: {
        SUCCESS_200: "Successful operation",
        SUCCESS_201: "Product created successfully",
        SUCCESS_204: "Product successfully deleted",
        ERROR_400: "Incorrect input data",
        ERROR_401: "Invalid credentials",
        ERROR_404: "Product not found",
        ERROR_409: "There is already a product with that name",
        ERROR_500: "Error processing request",
    },
};