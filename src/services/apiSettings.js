import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();
  // since there is on;y on row in our setting table, we are using single() method to just return that one object instead of an array

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
  // if we didn't use the single() method while getting our data, we could return that one row with data[0]
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one and that's why we don't need to pass an id and identify which row needs to be updated
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
