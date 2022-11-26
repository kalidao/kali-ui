export const resolveDocs = (docs: string | undefined) => {
    if (docs === undefined) return {
        message: 'Fetching...'
    }
    
    switch (docs) {
        // TODO
        case '': 
            return {
                isRicardian: true,
                message: 'You have a Ricardian LLC. Updating your docs will not affect its status.'
            }
        case 'none': {
            return {
                message: 'We could not find any documents for this DAO.'
            }
        }
        default: {
            return {
                message: '',
                isLink: true,
            }
        }
    }
}