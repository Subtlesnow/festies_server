import { FestieApi } from '.'
import { User } from '../user'

let user, festieApi

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  festieApi = await FestieApi.create({ user, id: 'test', email: 'test', username: 'test', full_name: 'test', password: 'test', event_loc: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = festieApi.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(festieApi.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.id).toBe(festieApi.id)
    expect(view.email).toBe(festieApi.email)
    expect(view.username).toBe(festieApi.username)
    expect(view.full_name).toBe(festieApi.full_name)
    expect(view.password).toBe(festieApi.password)
    expect(view.event_loc).toBe(festieApi.event_loc)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = festieApi.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(festieApi.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.id).toBe(festieApi.id)
    expect(view.email).toBe(festieApi.email)
    expect(view.username).toBe(festieApi.username)
    expect(view.full_name).toBe(festieApi.full_name)
    expect(view.password).toBe(festieApi.password)
    expect(view.event_loc).toBe(festieApi.event_loc)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
