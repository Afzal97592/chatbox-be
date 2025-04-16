import User from "../../models/User";

export const getAllUsers = async (
  req: Request | any,
  res: Response | any
): Promise<any> => {
  try {
    const { search, page, limit } = req.query;

    const loggedInUser = req.user.userId;
    let query: any = { _id: { $ne: loggedInUser } };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalCount = await User.countDocuments(query);

    return res
      .status(200)
      .json({ message: "users fetched successfully", users, totalCount });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
