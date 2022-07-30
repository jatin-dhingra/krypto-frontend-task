export async function AddToFavourites(id: number, user_id: number) {
  console.log("Adding to favorites");
  fetch("http://localhost:5000/favourites", {
    method: "POST",
    body: JSON.stringify({
      id: user_id,
      item_id: id,
    }),
  })
    .then(() => true)
    .catch(() => false);
}

export async function UserLogin(user: string, pass: string) {
  return fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user,
      password: pass,
    }),
  });
}

export async function RegisterLogin(
  user: string,
  pass: string,
  first: string,
  last: string
) {
  return fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user,
      password: pass,
      firstname: first,
      lastname: last,
    }),
  });
}

export function setLocalStorage(key: string, value: any) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

export function getLocalStorage(key: string, initialValue: any) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    return initialValue;
  }
}
