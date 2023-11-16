from typing import NewType, Callable, TypeVar, ParamSpec
from functools import wraps, update_wrapper
from os import path, environ
import json_stream

Environ = NewType("Environ", type(environ))
T = TypeVar("T")
P = ParamSpec("P")

def join_path_file(dirname: str, filename: str):
  return path.join(path.dirname(dirname), filename)

def get_file_stream(dirname: str, filename: str):
  return open(join_path_file(dirname, filename), "r", -1, "UTF-8")

def get_json_stream(dirname: str, filename: str):
  return json_stream.load(get_file_stream(dirname, filename))

def get_env_prefix(prefix: str):
  return { env: environ[env] for env in environ if env.startswith(prefix) }

def remove_env_prefix(prefix: str, environ: Environ):
  return { env.removeprefix(prefix): environ[env] for env in environ }

def get_env(prefix: str):
  env_per_prefix = get_env_prefix(prefix)
  return remove_env_prefix(prefix, env_per_prefix)

class _once_callable(object):
  __callable__: Callable[P, T]
  __callable_is_once__: bool
  __callable_value__: T
  
  def __init__(self, __callable: Callable[P, T]):
    self.__callable__ = __callable
    self.__callable_is_once__ = False
    self.__callable_value__ = None
    update_wrapper(self, __callable)
    
  def __call__(self, *args: P.args, **kwargs: P.kwargs):
    if not self.__callable_is_once__:
      self.__callable_value__ = self.__callable__(*args, **kwargs)
      self.__callable_is_once__ = True
    return self.__callable_value__
  
def once_callable(__callable: Callable[P, T]) -> Callable[P, T]:
  wraps(__callable)
  return _once_callable(__callable)

def use_env(name: str):
  return once_callable(lambda: get_env(name.upper() + "_"))

