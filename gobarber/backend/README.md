[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=GoBarber&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fcelso-alexandre%2Fnew_gostack_bootcamp%2Fmaster%2Fgobarber%2Fbackend%2Fassets%2FREADME%2Fapi%2Fgobarber-backend-insomnia.json)

## Password recovery

[ X ] **Functional Requisites**

- [ X ] User must be able to recover a forgotten pasword by providing its e-mail
- [ X ] User must receive an e-mail with instruction on how it can proceed its password recovering
- [ X ] User should be able to recover its password

**Non-Functional Requisites**

- [ X ] Utilize Mailtrap to test mail send while in dev env
- Utilize Amazon SES for sending mails when in production
- Mail send must occur in background

[ X ] **Business Rules**

- [ X ] The link for recovering a forgotten password must expire itself within 2 hours
- [ X ] User must confirm the provided new password twice to confirm the password reset

## Profile updating

[ X ] **Functional Requisites**

- [ X ] User shoud be able to update its name, e-mail and password

[ X ] **Non-Functional Requisites**

- [ X ] User must not be able to update its own e-mail to an already utilized e-mail
- [ X ] When updating its password, user must provide its old one
- [ X ] When updating its password, user must confirm its new password

## Services scheduling

[ X ] **Functional Requisites**

- [ X ] User must be able to list all GoBarber registered providers with at least an schedule available in the next 30 days
- [ X ] After selecting a provider, user must be able to list available schedules, for selection
- [ X ] User must be able to select an available schedule of a provider

**Non-Functional Requisites**

- Providers listing must have a cache

[ X ] **Business Rules**

- [ X ] Each schedule must be spaced in 1 hour
- [ X ] Schedules must be avaible between 8h a.m. and and 6h p.m. (First starting at 8 a.m., and last one starting at 5 p.m.)
- [ X ] User must not be able to schedule in an already taken schedule
- [ X ] User must not be able to schedule in past
- [ X ] A provider must not be able to schedule with itself

## Provider Dashboard

**Functional Requisites**

- Provider must be able to list available schedules in a specific day
- Provider must receive a nottification whenever a user make a schedule with it
- Provide must be able to visualize all non-read notifications

**Non-Functional Requisites**

- Provider appointments must have a cache
- Provider notifications must be stored on MongoDB
- Provider notification must be sent in realtime by using Socket.io

**Business Rules**

- Notifications must have a status (read/unread)
