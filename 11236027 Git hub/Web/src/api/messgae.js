import { useToast } from 'vue-toastification'
const toast = useToast()

export const successMessage = (msg) => {
    toast.success(msg);
}

export const errorMessage = (msg) => {
    toast.error(msg);
}

export const warningMessage = (msg) => {
    toast.warning(msg);
}