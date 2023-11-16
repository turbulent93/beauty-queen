export const useFormData = (data: any) => {
    const formData = new FormData()
    const keys = Object.keys(data)

    for (let i = 0; i < keys.length; i++) {
        if(!data[keys[i]]) {
            continue
        }

        if(data[keys[i]]?.constructor?.name == "FileList") {
            Array.from(data[keys[i]]).forEach(element => {
                formData.append(keys[i], element as File)
            })
            continue
        } if(!Array.isArray(data[keys[i]])) {
            formData.append(keys[i], data[keys[i]]?.toString())
            continue
        }
        Array.from(data[keys[i]]).forEach((element: any) => {
            formData.append(keys[i], element.toString())
        });
    }

    return formData
}