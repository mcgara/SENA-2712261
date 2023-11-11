from .type_users import Users
from random import randint
from utils import get_json_stream

USERS_LENGTH = 5000
users: Users = get_json_stream(__file__, "users.json")

def get_random_user():
  index = randint(0, USERS_LENGTH)
  return users[index]
