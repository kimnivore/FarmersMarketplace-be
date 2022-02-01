# <p>Backend For African Marketplace 01</P>


## <p>https://backend-african-marketplace.herokuapp.com/</p>

## REGISTER and LOGIN ENDPOINTS

### `[POST] /api/auth/register`

- Request Body:
  - _username required (must be unique)_
  - _password required_

_What You Send_
```json
{
  "username": "john",
  "password": "12345"
}
```
_Server Response_
```json
{
  "message": "Successfully registered john!",
  "user_id": 1
}
```

### `[POST] /api/auth/login`

- Request Body:
  - _username required_
  - _password required_

_What You Send_
```json
{
  "username": "john",
  "password": "12345"
}
```

_Server Response_
```json
{
  "message": "Welcome, john!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpva",
}
```

<p>You will use the token given by the server for authentication.</p>


<p>Credential you can use for login testing:</p>

- ```username: sam, password: 1234```

- ```username: frodo, password: 5678```

### `[GET] /api/auth/users`

- Returns all users in database, currently public facing but will be restricted.

_Server Response_
```json
{
  "user_id": "1",
  "username": "john",
},
{
  "user_id": "2",
  "username": "user2",
}
etc...
```

<hr>

## ITEMS ENDPOINTS


Pending...
