const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

// config OpenAI API
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration ({
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

// func that accepts text prompt as parameter and returns an AI-generated result
const GPTFunction = async (text) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: text,
        temperature: 0.6,
        max_tokens: 250,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
    });
    return response.data.choices[0].text;
};

// accepts all form inputs from React App
// upload.single("headshotImage") func adds the image uploaded via the form
// to the uploads folder
app.post("/resume/create", upload.single("headshotImage"), async (req, res) => {
    const {
        fullName,
        currentPosition,
        currentLength,
        currentTechnologies,
        workHistory,
    } = req.body;

    console.log(req.body);

    res.json({
        message: "Request successful!",
        data: {},
    });
});