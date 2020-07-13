export class MensageError {


    public static getMessagensError(error): MensageError[] {
        let errorOutput = ['Ocorreu um erro inesperado. Tente novamente mais tarde!'];
        if (error && error.error && error.error.Message) {
            errorOutput = [error.error.Message];

        } else if (error && error.error && Array.isArray(error.error) && error.error.some(e => e.hasOwnProperty('Message'))) {
            errorOutput = error.error.map(e => e.Message);

        } else if (error && Array.isArray(error) && error.some(e => e.hasOwnProperty('Message'))) {
            errorOutput = error.map(e => e.Message);
        } else if (error.Message) {
            errorOutput = [error.Message];
        } else {
            errorOutput = ['Ocorreu um erro inesperado. Tente novamente mais tarde!'];
        }

        return errorOutput;
    }
}

