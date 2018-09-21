import { Logger } from '.'

let logger

beforeEach(async () => {
  logger = await Logger.create({ blob: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = logger.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(logger.id)
    expect(view.blob).toBe(logger.blob)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = logger.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(logger.id)
    expect(view.blob).toBe(logger.blob)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
