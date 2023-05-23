import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-J1OpRJ6CdTA7WTiAWZGLzN27",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();