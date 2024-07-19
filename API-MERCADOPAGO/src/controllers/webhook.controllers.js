
export const receiveWebhook = (req, res) => {
    const payment = req.query

    console.log("hoalaas");
    res.send("webhook");
};