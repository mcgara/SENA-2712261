from typing import Generic, TypeVar, Callable, Iterable

KT = TypeVar("KT")
VT = TypeVar("VT")
T = TypeVar("T")

class Data(Generic[KT, VT]):
  length: int
  _data: dict[KT, VT]

  def __init__(self):
    self._data = {}
    self.length = 0

  
  def add(self, name: KT, value: VT) -> None:
    if name in self._data.keys():
      raise KeyError(f"Name is already in data: {name}")
    self._data[name] = value
    self.length += 1
    
  def get(self, name: KT) -> VT:
    if type(name) is not str: raise KeyError("Index type must be String")
    if name not in self._data: raise KeyError(f"Index is not found in Data: {name}")
    return self._data.get(name)
  
  def for_each(self, func: Callable[[VT], None]) -> None:
    for value in self._data.values(): func(value)

  def map(self, func: Callable[[VT], T]) -> Iterable[T]:
    return [func(value) for value in self._data.values()]
  
  def __getitem__(self, __key: KT) -> VT:
    return self.get(__key)
  
  def __len__(self) -> int:
    return self.length


