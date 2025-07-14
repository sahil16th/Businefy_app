const User = require('../MongoDB/model');

const search = async (req, res) => {
    try{
      const user = await User.find({}, "username image");

      const result = user.map(user => ({
        username: user.username,
        image: user.image || ""
      }));

      return res.status(200).json({ result: result });
    } catch(error) {
        return res.status(500).json({ message : "Internal Server Error"});
    }
}


module.exports = search;
