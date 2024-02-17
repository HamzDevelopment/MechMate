import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OpenAIChatResponse } from '../interfaces/openai-response.interface';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  constructor(private http: HttpClient) { }

  getResponse(messages: Array<{ role: string, content: string }>): Observable<OpenAIChatResponse> {
    const apiKey = 'ADD_API_KEY_HERE';
    // The OpenAI API endpoint
    const url = 'https://api.openai.com/v1/chat/completions';
    // The context for the conversation
    const carDiagnosisContext = "You are an AI trained in car diagnostics. Help the user diagnose their car issues based on the symptoms they describe.";
    const conversation = [{ role: 'system', content: carDiagnosisContext }, ...messages];

    return this.http.post<OpenAIChatResponse>(url, {
      model: "gpt-3.5-turbo",
      messages: conversation
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

}