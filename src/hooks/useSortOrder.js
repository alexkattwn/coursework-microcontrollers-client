import { useMemo } from "react"

export const useSortedBySequence = (orders, sequence) => {
    const sortedOrders = useMemo(() => {
        if (sequence) {
            if (sequence === 'Сначала старые') {
                return [...orders].sort((a, b) => a.id_order - b.id_order)
            }
            if (sequence === 'Сначала новые') {
                return [...orders].sort((a, b) => b.id_order - a.id_order)
            }
            return orders
        }
        return orders
    }, [sequence, orders])

    return sortedOrders
}

export const useSortOrder = (orders, title, sequence) => {
    const sortedBySequence = useSortedBySequence(orders, sequence)
    const sorted = useMemo(() => {
        if (title) {
            if (title === 'Все') {
                return sortedBySequence
            }
            return sortedBySequence.filter(order => order.status.title === title)
        }
        return sortedBySequence
    }, [title, sortedBySequence])

    return sorted
}