/** @typedef {import('../api/fakestore').User} IUser */

export const TableHeadUsers = () => `
<thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">First Name</th>
    <th scope="col">Last Name</th>
    <th scope="col">Username</th>
    <th scope="col">Email</th>
    <th scope="col">Phone</th>
    <th scope="col">City</th>
    <th scope="col">Street</th>
  </tr>
</thead>
`;

/** @param {IUser} user */
export const TableRowUser = user => `
<tr>
  <th scope="row">${user.id}</th>
  <td>${user.name.firstname}</td>
  <td>${user.name.lastname}</td>
  <td>${user.username}</td>
  <td>${user.email}</td>
  <td>${user.phone}</td>
  <td>${user.address.city}</td>
  <td>${user.address.street}</td>
<tr>
`;

/** @param {IUser[]} users */
export const TableBodyUsers = users => `
<tbody>
  ${users.map(user => TableRowUser(user)).join('\n')}
</tbody>
`;

/** @param {IUser[]} users */
export const TableUsers = users => `
<table class="table table-striped">

  ${TableHeadUsers()}

  ${TableBodyUsers(users)}

</table>
`;

export default TableUsers;
