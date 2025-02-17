import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Chat {
  from: "user" | "bot",
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private generativeAi: GoogleGenerativeAI;


  messageHistory: BehaviorSubject<Chat | null> = new BehaviorSubject<Chat | null>(null);

  constructor() { 
    this.generativeAi = new GoogleGenerativeAI(environment.gemiAPIKey);
  }

  async generateText(prompt: string){
    const model = this.generativeAi.getGenerativeModel({model: 'gemini-pro'});
    this.messageHistory.next({
      from: 'user',
      message: prompt
    })
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log(text);
    this.messageHistory.next({
      from: 'bot',
      message: text
    })
  }

  getMessageHistory(): Observable<any> {
    return this.messageHistory.asObservable();
  }
}
