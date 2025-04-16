import User from "../models/User";

function generateUsername(name: string) {
  const username = `${name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")}_${Math.floor(Math.random() * 90000 + 10000)}`;
  return username;
}

export const usernameScript = async (): Promise<any> => {
  try {
    const usersWithoutUsername = await User.find({
      username: { $exists: true },
    });

    for (let user of usersWithoutUsername) {
      const generatedUsername = generateUsername(user.name);
      user.username = generatedUsername;
      await user.save();
    }
    console.log("Username generation script completed.");
  } catch (error) {
    console.error("Error executing username generation script:", error);
  }
};
