import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createDangerZone, deleteDangerZone, fetchDangerZone } from "../http/api"
import { IPagination } from "../types"

export const useDangerZoneFetchQuery = (pagination: IPagination) => {
    return useQuery({
        queryKey: ["fetch-danger-zone"],
        queryFn: () => fetchDangerZone(pagination)
    })
}

export const useDangerZoneAddMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createDangerZone,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch-danger-zone"] })
        }
    })
}


export const useDangerZoneDeleteMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteDangerZone,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetch-emergency-contact"] })
        }
    })
}
