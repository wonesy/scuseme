export const debounce = <F extends (...args: any[]) => any>(
    func: F,
    waitFor: number
) => {
    let timeout: NodeJS.Timeout

    return (...args: Parameters<F>): Promise<ReturnType<F>> => {
        if (timeout) {
            clearTimeout(timeout)
        }
        return new Promise(resolve => {
            timeout = setTimeout(() => resolve(func(...args)), waitFor)
        })
    }
}
