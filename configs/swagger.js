import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "API Gestor de opiniones",
            version: "1.0.0",
            description: "API para gestionar opiniones de los usuarios",
            contact:{
                name: "Fredy Hernández",
                email: "fhernandez-2023176@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/gestionDeOpiniones/v1/user/"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/user/*.js"
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export { swaggerDocs, swaggerUi }