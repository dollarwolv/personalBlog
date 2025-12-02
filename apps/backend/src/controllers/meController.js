export async function sendMe(req, res) {
  res.json(req.user);
}
