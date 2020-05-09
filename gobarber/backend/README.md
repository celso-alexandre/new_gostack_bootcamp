# To-do

## Password recovery

**Functional Requisites**

- User must be able to recover a forgotten pasword by providing its e-mail
  - User must receive an e-mail with instruction on how it can proceed its password recovering

**Non-Functional Requisites**

- Utilize Mailtrap to test mail send while in dev env
- Utilize Amazon SES for sending mails when in production
- Mail send must occur in background

**Business Rules**

- The link for recovering a forgotten password must expire itself within 2 hours
- User must confirm the provided new password twice to confirm the password reset

## Profile updating

**Functional Requisites**

- User shoud be able to update its name, e-mail and password

**Non-Functional Requisites**

- User must not be able to update its own e-mail to an already utilized e-mail
- When updating its password, user must provide its old one
- When updating its password, user must confirm its new password

## Services scheduling

**Functional Requisites**

- User must be able to list all GoBarber registered providers with at least an schedule available in the next 30 days
- After selecting a provider, user must be able to list available schedules, for selection
- User must be able to select an available schedule of a provider

**Non-Functional Requisites**

- Providers listing must have a cache

**Business Rules**

- Each schedule must be spaced in 1 hour
- Schedules must be avaible between 8h a.m. and and 6h p.m. (First starting at 8 a.m., and last one starting at 5 p.m.)
- User must not be able to schedule in an already taken schedule
- User must not be able to schedule in past
- A provider must not be able to schedule with itself

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
