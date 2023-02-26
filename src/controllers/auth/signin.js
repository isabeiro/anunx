import UsersModel from '../../models/users'
import dbConnect from '../../utils/dbConnect'
import { compare } from '../../utils/password'

const post = async (req, res) => {
  await dbConnect()
  
  const {
    email,
    password,
  } = req.body

  const user = await UsersModel.findOne({ email })

  if (!user) {
    return res.status(401).json({ success: false, message: 'invalid' })
  }

  const passIsCorrect = await compare(password, user.password)

  if (passIsCorrect) {
    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    }),
    console.log(user)
  }

  return res.status(401).json({ success: false, message: 'invalid' })
}

export {
  post,
}