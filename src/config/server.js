require("dotenv").config()
const {env} = process

module.exports = {
    PORT: env.MY_SITE_PORT,
    BOT_ID: env.TELEGRAM_BOT_ID
}
/*
{
        "id": 2,
        "question": "The capital of uzbekistan ?",
        "responses": {
            "A": {
                "name": "Tashkent",
                "response": true
            },
            "B": {
                "name": "Andijon",
                "response": false
            },
            "C": {
                "name": "Samarkand",
                "response": false
            },
            "D": {
                "name": "Bukhara",
                "response": false
            }
        }
    },
    {
        "id": 3,
        "question": "Where Registan square is located ?",
        "responses": {
            "A": {
                "name": "Tashkent",
                "response": false
            },
            "B": {
                "name": "Andijon",
                "response": false
            },
            "C": {
                "name": "Samarkand",
                "response": true
            },
            "D": {
                "name": "Bukhara",
                "response": false
            }
        }
    },
    {
        "id": 4,
        "question": "Jentrani qaysi rangi kotta bollaniki ?",
        "responses": {
            "A": {
                "name": "oq",
                "response": false
            },
            "B": {
                "name": "qizil",
                "response": false
            },
            "C": {
                "name": "qora",
                "response": true
            },
            "D": {
                "name": "ko'k",
                "response": false
            }
        }
    },
    {
        "id": 5,
        "question": "The tallest building in uzbekistan ?",
        "responses": {
            "A": {
                "name": "Teleminora",
                "response": true
            },
            "B": {
                "name": "Nest one",
                "response": false
            },
            "C": {
                "name": "Hayyat place",
                "response": false
            },
            "D": {
                "name": "Toshkent mehmonhonasi",
                "response": false
            }
        }
    },
    {
        "id": 6,
        "question": "Which is the best profession ?",
        "responses": {
            "A": {
                "name": "Taxi driver",
                "response": false
            },
            "B": {
                "name": "Stuarder",
                "response": false
            },
            "C": {
                "name": "Developer",
                "response": false
            },
            "D": {
                "name": "Traveler",
                "response": true
            }
        }
    },
*/