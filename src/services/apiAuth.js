import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  // we need to check to see if there is an active session. and this will get that data from the localstorage
  const { data: session } = await supabase.auth.getSession();

  // if there is no user
  if (!session.session) return null;

  // if there is a user, we can get the user data from the session, but it's more secure to redownload the data from supabase
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  // we are only interested in user data so we just return that part of data
  return data?.user;
}
