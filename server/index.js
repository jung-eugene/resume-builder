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

// config OpenAI API
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration ({
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

// stores AI-generated result
let database = [];

// func that accepts text prompt as parameter and returns an AI-generated result
// use text-davinci-003 model to generate an appropriate answer to prompt
// other key values helps generate the specific type of response we need
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

// accepts all form inputs from client
// upload.single("headshotImage") func adds the image uploaded via the form
// to the uploads folder
app.post("/resume/create", upload.single("headshotImage"), async (req, res) => {
    const {
        fullName,
        currentPosition,
        currentLength,
        currentTechnologies,
        workHistory, //JSON format
    } = req.body;

    // convert workHistory into its original data structure (an array)
    const workArray = JSON.parse(workHistory);

    // group the values into an object
    const newEntry = {
        id: generateID(),
        fullName,
        image_url: `http://localhost:4000/uploads/${req.file.filename}`,
        currentPosition,
        currentLength,
        currentTechnologies,
        workHistory: workArray,
    };

    // loops through the items in the workArray and converts them to a string
    const remainderText = () => {
        let stringText = "";
        for (let i = 0; i < workArray.length; i++) {
            stringText += ` ${workArray[i].name} as a ${workArray[i].position}.`;
        }
        return stringText;
    };
    // the job description prompt
    const prompt1 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write a 100 words description for the top of the resume(first person writing)?`;
    // the job responsibilities prompt
    const prompt2 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write 10 points for a resume on what I am good at?`;
    // the job achievements prompt
    const prompt3 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n During my years I worked at ${
        workArray.length
    } companies. ${remainderText()} \n Can you write me 50 words for each company seperated in numbers of my succession in the company (in first person)?`;

    // generate a GPT-3 result
    const objective = await GPTFunction(prompt1);
    const keypoints = await GPTFunction(prompt2);
    const jobResponsibilities = await GPTFunction(prompt3);
    // put them into an object
    const chatgptData = { objective, keypoints, jobResponsibilities };
    // log the result
    console.log(chatgptData);

    // return AI-generated result and user info entered
    const data = { ...newEntry, ...chatgptData };
    database.push(data);

    res.json({
        message: "Request successful!",
        data,
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});