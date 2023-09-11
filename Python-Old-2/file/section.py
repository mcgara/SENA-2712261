from typing import overload, TypedDict, Iterator, SupportsIndex
import re
from ._file import SelfFile

class SectionMatch(TypedDict):
  prefix: str
  title: str
  sufix: str

class SectionStruct(SectionMatch):
  content: str
  
SECTION_DEFAULT_MATCH: SectionMatch = {
  "prefix": r"(^(?:PY|PYTHON)[\t ]+)?",
  "title": r"[A-Z]+[A-Z\t ]+",
  "sufix": r""
}

class Section:
  _file: SelfFile
  _start: SectionMatch
  _stop: SectionMatch

  def __init__(self, __file: SelfFile):
    self._file = __file
    self._start = SECTION_DEFAULT_MATCH
    self._stop = SECTION_DEFAULT_MATCH
    
  def get_iter(
    self,
    start: SectionMatch | None = None,
    stop: SectionMatch | None = None
  ) -> Iterator[SectionStruct]:
    if type(start) is not dict: start = self._start
    if type(stop) is not dict: stop = self._stop

    start = { **self._start, **start }
    stop = { **self._stop, **stop }
    
    groups = "(?P<prefix>({prefix}))(?P<title>({title}))(?P<sufix>({sufix}))"
    group_start = groups.format(**start)
    group_stop = "({prefix})({title})({sufix})".format(**stop)
    section = f"({group_start})\\n(?P<content>(?:\\n*(?!{group_stop}).+\\n*)+)"

    match_iter = iter([])
    try: match_iter = re.compile(section, re.MULTILINE).finditer(self._file.text)
    except: pass
    for x in match_iter: yield x.groupdict()
    
  @overload
  def get(self, startTitle: str, stopTitle: str | None = None) -> str | None: ...
  @overload
  def get(self, __key: slice) -> str | None: ...
  @overload
  def get(self, start: SectionMatch, stop: SectionMatch | None = None) -> str | None: ...
  def get(self, start_arg, stop_arg = None) -> str | None:
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
    
    iterator = self.get_iter(start, stop)
    try: return next(iterator).get("content")
    except: pass
  
  def __getitem__(self, __key: slice | str) -> str | None:
    return self.get(__key)
  
    
