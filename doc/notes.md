## Requests

```
/api/create-user POST
{
    "id": str, // username
    "firstname": str,
    "lastname": str,
    "gofundme": {
        "url": str[URL],
        "picture": str[Base64],
        "title": str
        "description": str,
        "goal": float,
        "amountDonated":float
    },
    "facebook": {
        "url": str,
        "api": str,
    },
    // Doordash / Uber Eats
    "services": [
        {
            "name": "Doordash",
            "url": "doordash.com",
            "id": str,
        },
        ...
    ]
}
```

```
/api/getGoFundMe
{
    "success": bool,
    "url": string,
    "title": string,
    "description": string,
    "goal": float,
    "amountDonated":float
}
```

## Browser Extension
