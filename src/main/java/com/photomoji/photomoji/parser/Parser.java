package com.photomoji.photomoji.parser;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import io.github.cdimascio.dotenv.Dotenv;
import com.google.gson.Gson;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Scanner;

public class Parser {
    public static final Dotenv dotenv = Dotenv.load( );

    private static final String GROQ_API_KEY = dotenv.get("GROQ_API_KEY");
    private static final String GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

    private static final Gson gson = new Gson( );

    public String wordToEmoji(String word) throws Exception {
        System.out.println("Enviando prompt para a IA (Groq) com busca na web...");

        String systemPrompt = """
                Você é uma IA de parser, você ira receber uma mensagem e trocar ela por emoji
                Exemplo: input -> Um gato pulou o muro, output -> Um [emoji gato] pulou o [emoji muro]
                Sempre PASSE as palavras para emoji, se existir uma emoji para a palavra.""";


        JsonObject requestBodyJson = new JsonObject();
        requestBodyJson.addProperty("model", "openai/gpt-oss-120b");

       // messages and body
        JsonArray messages = new JsonArray();
        JsonObject systemMessage = new JsonObject();
        systemMessage.addProperty("role", "system");
        systemMessage.addProperty("content", systemPrompt);
        messages.add(systemMessage);

        JsonObject userMessage = new JsonObject();
        userMessage.addProperty("role", "user");
        userMessage.addProperty("content", word);
        messages.add(userMessage);

        requestBodyJson.add("messages", messages);


        JsonObject compoundCustom = new JsonObject();
        JsonObject tools = new JsonObject();
        JsonArray enabledTools = new JsonArray();
        enabledTools.add("web_search");
        tools.add("enabled_tools", enabledTools);
        compoundCustom.add("tools", tools);
        requestBodyJson.add("compound_custom", compoundCustom);

        requestBodyJson.addProperty("temperature", 0.1);
        requestBodyJson.addProperty("max_tokens", 8192);
        requestBodyJson.addProperty("stream", false);

        String requestBody = gson.toJson(requestBodyJson);

        HttpResponse<String> response;
        try (HttpClient client = HttpClient.newHttpClient()) {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(GROQ_API_URL))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + GROQ_API_KEY)
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            response = client.send(request, HttpResponse.BodyHandlers.ofString());
        }

        if (response.statusCode() != 200) {
            throw new RuntimeException("Falha na requisição à API Groq: " + response.statusCode() + " " + response.body());
        }

        JsonObject respostaJson = JsonParser.parseString(response.body()).getAsJsonObject();

        return respostaJson
                .getAsJsonArray("choices")
                .get(0)
                .getAsJsonObject()
                .get("message")
                .getAsJsonObject()
                .get("content")
                .getAsString();
    }

    // teste de classe unitaria
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String word;
        Parser p = new Parser();

        System.out.print("Digite uma palavra: ");
        word = sc.nextLine();

        try {
            String output = p.wordToEmoji(word);
            System.out.println(output);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
