from typing import NewType, Callable, TypeVar, ParamSpec
from functools import wraps
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

def once_callable(__callable: Callable[P, T]) -> Callable[P, T]:
  wraps(__callable)
  is_once_call = False
  call_value = None
  
  def wrapper(*args: P.args, **kwargs: P.kwargs):
    if not wrapper.__globals__["__is_once_call"]:
      wrapper.__globals__["__call_value"] = __callable(*args, **kwargs)
      wrapper.__globals__["__is_once_call"] = True
    return wrapper.__globals__["__call_value"]

  wrapper.__globals__.update({
    "__is_once_call": is_once_call,
    "__call_value": call_value
  })
  return wrapper

def use_env(name: str):
  return once_callable(lambda: get_env(name.upper() + "_"))
