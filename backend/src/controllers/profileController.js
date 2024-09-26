import bcrypt from 'bcrypt';
import profile from '../model/profileSchema.js';

const saltRounds = 10;

export const createProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await profile.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'Profile created successfully', user });
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ message: "Error creating profile" });
  }
};

export const loginProfile = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await profile.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Password does not match" });
    }

    res.json({ message: "Login successful", userId: user._id });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Error logging in user" });
  }
};
