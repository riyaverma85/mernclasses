// controllers/sessionController.js
const Home = (req, res) => {
  req.session.myname = "shivani";
  res.send("okk");
};

const Display = (req, res) => {
  const myname = req.session.myname;
  res.send(myname || "No session found!");
};
module.exports={
    Home,
    Display
}
