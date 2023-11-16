from typing import TypedDict, Literal

class UserID(TypedDict):
  name: str
  value: str

UserGender = Literal["male", "famale"]

class UserLocationTimezone(TypedDict):
  offset: str
  description: str

class UserLocationCoordinates(TypedDict):
  latitude: str
  longitude: str

class UserLocationStreet(TypedDict):
  number: int
  name: str

class UserLocation(TypedDict):
  street: UserLocationStreet
  state: str
  country: str
  postcode: int
  coordinates: UserLocationCoordinates
  timezone: UserLocationTimezone

class UserName(TypedDict):
  title: str
  first: str
  last: str

class UserLogin(TypedDict):
  uuid: str
  username: str
  password: str
  salt: str
  md5: str
  shal: str
  sha256: str

class UserDob(TypedDict):
  date: str # Datetime
  age: int

class UserRegistered(UserDob):
  pass

class UserPicture(TypedDict):
  large: str # URL
  medium: str
  thumbnail: str

UserNationality = Literal[
  "AU", "BR", "CA", "CH", "DE", "DK", "ES",
  "FI", "FR", "GB", "IE", "IN", "IR", "MX",
  "NL", "NO", "NZ", "RS", "TR", "UA", "US"
]

class User(TypedDict):
  id: UserID
  gender: UserGender
  name: UserName
  location: UserLocation
  email: str
  login: UserLogin
  dob: UserDob
  registered: UserRegistered
  phone: str
  cell: str
  picture: UserPicture
  nat: UserNationality

Users = list[User]
