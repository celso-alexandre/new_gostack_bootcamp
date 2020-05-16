import AppError from '@shared/errors/AppError'

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointment: CreateAppointmentService
let fakeNotificationsRepository: FakeNotificationsRepository

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeNotificationsRepository = new FakeNotificationsRepository()
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository
    )
  })

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 13).getTime()
    })

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'user',
      provider_id: '123123',
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('123123')
  })

  it('should not be able to create two appointments on a same available schedule', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 0).getTime()
    })

    const appointmentDate = new Date(2020, 4, 10, 11)

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user',
      provider_id: '123123',
    })

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'user',
        provider_id: '123123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: 'user',
        provider_id: 'provider',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment where user and provider are the same', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 12),
        user_id: 'sameuser',
        provider_id: 'sameuser',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment outside of working time (8h to 17h)', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 0).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 7),
        user_id: 'user',
        provider_id: 'provider',
      })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 18),
        user_id: 'user',
        provider_id: 'provider',
      })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 3),
        user_id: 'user',
        provider_id: 'provider',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment in an unavailable time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await createAppointment.execute({
      date: new Date(2020, 4, 10, 15),
      user_id: 'user',
      provider_id: 'provider',
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 15),
        user_id: 'user',
        provider_id: 'provider',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
