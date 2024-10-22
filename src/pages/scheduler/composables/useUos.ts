import {ref} from "vue";
import {getUos} from "../../../data/pages/uo";
import {Uo} from "../types";


export const useUos = () => {
    const isLoading = ref(false)
    const uos = ref<Uo[]>([])

    const fetch = async () => {
        isLoading.value = true
        const { data } = await getUos({

        })
        uos.value = data as Uo[]


        isLoading.value = false
    }

    fetch()

    return {
        isLoading,

        uos,

        fetch,

    }
}


