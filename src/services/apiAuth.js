import supabase, { supabaseUrl } from "./supabase";

export async function singup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    // this will usually receive email and password but we can also pass in an options object which can have a data object that we pass any other information we want
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

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

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  // updateUser function from supabase knows what user is currently logged in and needs to be updated so all we need to do is to pass the data that needs to be updated in form of an object
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2. Upload the avatar image
  // creating a uniq name for the image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}
