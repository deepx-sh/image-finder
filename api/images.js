export default async function handler(req,res) {
    const { keyword, page } = req.query;
    console.log("Hello");
    
    if (!keyword) {
        return res.status(400).json({error:"Keyword is required!"})
    }

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${page || 1}&query=${keyword}&client_id=${process.env.UNSPLASH_KEY}&per_page=12`);

        if (!response.ok) {
            return res.status(response.status).json({ error: "Failed to fetch images" });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error:"Server Error"})
    }
}
