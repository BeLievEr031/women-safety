import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createIncident, fetchIncident } from "../http/api"
import { IPagination } from "../types"

export const useCreateIncidentMutation = (cb: (data: boolean) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["create-report-incident"],
        mutationFn: createIncident,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch-report-incident"] })
            cb(false)
        }
    })
}

export const useFetchIncidentQuery = (pagination: IPagination) => {
    return useQuery({
        queryKey: ["fetch-report-incident"],
        queryFn: () => fetchIncident(pagination)
    })
}