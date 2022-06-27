// export const registration = async (data) => {
//   try {
//     fetch("http://localhost:4500/api/user/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((result) => console.log(result));
//   } catch (e) {
//     console.log(e);
//   }
// };
// export const login = (email, password) => {
//   fetch("http://localhost:4500/api/user/login", {
//     email,
//     password,
//   })
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// };
