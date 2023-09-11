from typing import overload, TypedDict, Iterator
import re

class SectionMatch(TypedDict):
  prefix: str
  title: str
  sufix: str

class Section(SectionMatch):
  content: str
  
SECTION_DEFAULT_MATCH: SectionMatch = {
  "prefix": r"(^(?:PY|PYTHON)[\t ]+)?",
  "title": r"[A-Z]+[A-Z\t ]+",
  "sufix": r""
}

def get_iter(
  text: str,
  start: SectionMatch | None = None,
  stop: SectionMatch | None = None
) -> Iterator[Section]:
  if not isinstance(start, dict): start = {}
  if not isinstance(stop, dict): stop = {}
  
  start = { **SECTION_DEFAULT_MATCH, **start }
  stop = { **SECTION_DEFAULT_MATCH, **stop }

  groups = "(?P<prefix>({prefix}))(?P<title>({title}))(?P<sufix>({sufix}))"
  group_start = groups.format(**start)
  group_stop = "({prefix})({title})({sufix})".format(**stop)
  section = f"({group_start})\\n(?P<content>(?:\\n*(?!{group_stop}).+\\n*)+)"

  match_iter = iter([])
  try: match_iter = re.compile(section, re.MULTILINE).finditer(text)
  except: pass
  for x in match_iter: yield x.groupdict()
  
@overload
def get(text: str, startTitle: str, stopTitle: str | None = None) -> str | None: ...
@overload
def get(text: str, __key: slice) -> str | None: ...
@overload
def get(text: str, start: SectionMatch, stop: SectionMatch | None = None) -> str | None: ...
def get(text: str, start_arg, stop_arg = None) -> str | None:
  start: SectionMatch = {}
  stop: SectionMatch = {}
  
  if type(start_arg) is str: start["title"] = start_arg
  elif type(start_arg) is slice and type(start_arg.start) is str:
    start["title"] = start_arg.start
    if type(start_arg.stop) is str: stop["title"] = start_arg.stop
  elif type(start_arg) is dict: start.update(start_arg)
  else: return
  
  if type(stop_arg) is str: stop["title"] = stop_arg
  elif type(stop_arg) is dict: stop.update(stop_arg)
  
  iterator = get_iter(text, start, stop)
  try: return next(iterator).get("content")
  except: pass
    
