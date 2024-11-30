const Security = require('../../Security/Security');

class MethodService {
    constructor(db) {
        this.security = new Security(db);
    }

    async invokeMethod(session, { methodName, objectName, params }) {
        if (!session || !session.userProfile) {
            throw new Error("Debe iniciar sesión para acceder a este recurso.");
        }

        const jsonData = {
            userProfile: session.userProfile,
            methodName,
            objectName,
            params
        };

        try {
            const result = await this.security.invokeMethod(jsonData);
            return { msg: "Método ejecutado con éxito.", result };
        } catch (error) {
            if (error.message === 'Permiso denegado') {
                throw new Error(`No tiene permiso para ejecutar el método '${methodName}' en '${objectName}'.`);
            } else {
                console.error('Error al invocar el método:', error);
                throw new Error(`Error ejecutando el método '${methodName}' en el BO '${objectName}'.`);
            }
        }
    }
}

module.exports = MethodService;
