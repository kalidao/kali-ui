import { uploadFile, uploadJSON } from '@utils/ipfs'

export const updateProjectDetails = async (
  id: number,
  manager: string,
  budget: number,
  deadline: string,
  file: any,
) => {
  try {
    if (file) {
      const hash = await uploadFile(file)
      const details = await uploadJSON({
        id: id,
        manager: manager,
        budget: budget,
        deadline: deadline,
        file: hash,
      })
      return details
    } else {
      const details = await uploadJSON({
        id: id,
        manager: manager,
        budget: budget,
        deadline: deadline,
        file: '',
      })
      return details
    }
  } catch (e) {
    return ''
  }
}
