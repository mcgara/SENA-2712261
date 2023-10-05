from os import path
import json_stream

def join_path_file(dirname: str, filename: str):
  return path.join(path.dirname(dirname), filename)

def get_file_stream(dirname: str, filename: str):
  return open(join_path_file(dirname, filename), "r", -1, "UTF-8")

def get_json_stream(dirname: str, filename: str):
  return json_stream.load(get_file_stream(dirname, filename))
