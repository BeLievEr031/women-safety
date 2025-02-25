import { useMutation, useQuery } from "@tanstack/react-query"
import { createAlert, fetchAlert } from "../http/api"
import { IPagination } from "../types"

export const useCreateAlertMutation = () => {
    return useMutation({
        mutationFn: createAlert
    })
}

export const useFetchAlertQuery = (pagination: IPagination) => {
    return useQuery({
        queryKey: ["fetch-alert"],
        queryFn: () => fetchAlert(pagination)
    })
}