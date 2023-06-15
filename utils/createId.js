import crypto from 'node:crypto'

const createUuid = slug => {
	return crypto.createHash('sha256', slug).digest('hex')
}

export default createUuid