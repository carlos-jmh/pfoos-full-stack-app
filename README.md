# pfoos-full-stack-app

## Index

- [API Documentation](#api-documentation)
  - [Contact Object](#contact-object)
  - [Login Endpoint](#login-endpoint)
  - [Add Contact Endpoint](#add-contact-endpoint)
  - [Delete Contact Endpoint](#delete-contact-endpoint)
  - [Update Contact Endpoint](#update-contact-endpoint)
  - [Search Contacts Endpoint](#search-contacts-endpoint)

## API Documentation

### Contact Object

JSON object used to transfer information about a single contact entry.

- Parameters:

  | Parameter   | Format | Description          |
  | ----------- | ------ | -------------------- |
  | `contactId` | int    | Contact database key |
  | `firstName` | string | First name           |
  | `lastName`  | string | Last name            |
  | `phone`     | string | Phone                |
  | `email`     | string | Email                |
  | `userId`    | int    | User database key    |

- Example:
  ```
  {
    "contactId": 1,
    "firstName": "John",
    "lastName": "Cena",
    "phone": "5624567891",
    "email": "cantseeme@yahoo.com",
    "userId": 1
  }
  ```

### Login Endpoint

Returns a user's info given their username and password.

Endpoint: `POST /LAMPAPI/Login.php`

Request

- Parameters:

  | Parameter  | Format | Description    |
  | ---------- | ------ | -------------- |
  | `login`    | string | Login username |
  | `password` | string | Login password |

- Example:
  ```
  {
    "login": "RickA",
    "password": "Troll"
  }
  ```

Response

- Parameters:

  | Parameter   | Format | Description                                   |
  | ----------- | ------ | --------------------------------------------- |
  | `userId`    | int    | User database key                             |
  | `firstName` | string | First name                                    |
  | `lastName`  | string | Last name                                     |
  | `error`     | string | Error message or the empty string if no error |

- Example:
  ```
  {
    "userId": 1,
    "firstName": "Rick",
    "lastName": "Astley",
    "error": ""
  }
  ```

### Add Contact Endpoint

Inserts a new contact into the database with the given information.

Endpoint: `POST /LAMPAPI/AddContact.php`

Request

- [Contact Object](#contact-object) without the `contactId` parameter.

- Example:
  ```
  {
    "firstName": "Bob",
    "lastName": "Marley",
    "phone": "0736368653",
    "email": "mystic@thewhalers.com",
    "userId": 1
  }
  ```

Response

- Parameters:

  | Parameter | Format | Description                                   |
  | --------- | ------ | --------------------------------------------- |
  | `error`   | string | Error message or the empty string if no error |

- Example:
  ```
  {
    "error": ""
  }
  ```

### Delete Contact Endpoint

Deletes a contact given its database key.

Endpoint: `POST /LAMPAPI/DeleteContact.php`

Request

- Parameters:

  | Parameter   | Format | Description                               |
  | ----------- | ------ | ----------------------------------------- |
  | `contactId` | int    | Contact database key of contact to delete |

- Example:
  ```
  {
    "contactId": 2
  }
  ```

Response

- Parameters:

  | Parameter | Format | Description                                   |
  | --------- | ------ | --------------------------------------------- |
  | `error`   | string | Error message or the empty string if no error |

- Example:
  ```
  {
    "error": ""
  }
  ```

### Update Contact Endpoint

Updates a contact given its database key.

Endpoint: `POST /LAMPAPI/UpdateContact.php`

Request

- [Contact Object](#contact-object) without the `userId` parameter

- Example:
  ```
  {
    "contactId": 1,
    "firstName": "John",
    "lastName": "Cena",
    "phone": "5624567891",
    "email": "stillcantseeme@yahoo.com"
  }
  ```

Response

- Parameters:

  | Parameter | Format | Description                                   |
  | --------- | ------ | --------------------------------------------- |
  | `error`   | string | Error message or the empty string if no error |

- Example:
  ```
  {
    "error": ""
  }
  ```

### Search Contacts Endpoint

Returns a list of contacts matching the given search term and user.

Endpoint: `POST /LAMPAPI/SearchContacts.php`

Request

- Parameters:

  | Parameter | Format | Description                 |
  | --------- | ------ | --------------------------- |
  | `search`  | string | Search term (for any field) |
  | `userId`  | int    | User database key           |

- Example:
  ```
  {
    "search": "mi",
    "userId": 2
  }
  ```

Response

- Parameters:

  | Parameter | Format                                                                     | Description                                   |
  | --------- | -------------------------------------------------------------------------- | --------------------------------------------- |
  | `results` | array of [Contact Objects](#contact-object) without the `userId` parameter | Contacts that match the search                |
  | `error`   | string                                                                     | Error message or the empty string if no error |

- Example:
  ```
  {
    "results": [
      {
        "contactId": 4,
        "firstName": "Emma",
        "lastName": "Watson",
        "phone": "7988749701",
        "email": "Hermione@gmail.com"
      },
      {
        "contactId": 5,
        "firstName": "Michael",
        "lastName": "Jordan",
        "phone": "6217496624",
        "email": "MJ@gmail.com"
      }
    ],
    "error": ""
  }
  ```
