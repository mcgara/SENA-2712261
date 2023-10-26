from typing import NewType, Callable, TypeVar, ParamSpec
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
  is_once_callable = False
  callabled_value = None
  def callabled(*args: P.args, **kwargs: P.kwargs):
    if not is_once_callable: callabled_value = __callable(*args, **kwargs)
    return callabled_value
  return callabled

def use_env(name: str):
  return once_callable(lambda: get_env(name + "_"))
